"use server";

import connectDB from "@/config/db/connect";
import bcrypt from "bcryptjs";
import {
  createUserSchema,
  CreateUserType,
  updateUserSchema,
  UpdateUserType,
} from "@/features/users/user.schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { UserTypes } from "@/features/users/users.types";
import User from "@/features/users/user.model";

import { CUSTOMER_ORDER_ROUTE, USER_ROUTE } from "@/config/constant/routes";
import { auth } from "@/auth";
import { USER_TAG } from "@/config/constant/tags";
import { allowedRoles } from "@/config/constant/allowedRoles";
import { serializeDocument } from "@/lib/utils";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createUser = authActionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.session.user?.role !== "Admin") {
      throw new Error("Unauthorized");
    }
    await connectDB();

    const { userName, fullName, email, password, role } = parsedInput;

    const userEmailExists = await User.findOne({ email }).lean();

    if (userEmailExists) return { error: "email already exists" };

    const userNameExists = await User.findOne({ userName }).lean();

    if (userNameExists) return { error: "UserName already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    revalidateTag(USER_TAG);
    return { success: true };
  });

export const getUserByIdAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    await connectDB();

    const user = await User.findById(id).exec();

    if (!user) {
      return { error: "User not found" };
    }

    return serializeDocument(user) as UserTypes;
  });

export const updateUser = authActionClient
  .schema(updateUserSchema.extend({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    await connectDB();

    const { fullName, role, id } = parsedInput;

    const userData = await User.findById(id);

    if (!userData) {
      return { error: "User not found" };
    }

    if (
      ctx.session.user.role === "Customer" &&
      userData._id.toString() !== ctx.session.user._id
    ) {
      return { error: "Unauthorized" };
    }

    userData.fullName = fullName;
    userData.role = role;

    await userData.save();

    revalidateTag(USER_TAG);
    revalidatePath(CUSTOMER_ORDER_ROUTE);
    return { success: true };
  });

export const changePassword = authActionClient
  .schema(z.object({ password: z.string(), id: z.string() }))
  .action(async ({ parsedInput: { password, id } }) => {
    await connectDB();

    const user = await User.findById(id);

    if (!user) return { error: "User not found" };

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    return { success: true };
  });

export const deleteUser = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx }) => {
    if (ctx.session.user?.role !== "Admin") {
      throw new Error("Unauthorized");
    }
    await connectDB();
    await User.findByIdAndDelete(id);
    revalidateTag(USER_TAG);
    return { success: true };
  });
