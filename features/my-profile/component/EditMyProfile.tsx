"use client";

import { UserTypes } from "@/features/users/users.types";
import { Edit, Key } from "lucide-react";
import EditDialog from "./Edit";
import { useState } from "react";
import { ChangePassword } from "@/features/users/components/ChangePassword";

const EditMyProfile = ({ userData }: { userData: UserTypes }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-col  justify-center  mt-12 space-y-4">
        <button
          onClick={() => setEditOpen(true)}
          className="flex w-full justify-center items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
        <button
          onClick={() => setChangePasswordOpen(true)}
          className="flex w-full justify-center items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          <Key className="w-4 h-4 mr-2" />
          Change Password
        </button>
      </div>
      <EditDialog
        key={userData._id}
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        user={userData}
      />
      <ChangePassword
        key={userData._id + "password"}
        userId={userData._id}
        isOpen={changePasswordOpen}
        setIsOpenAction={setChangePasswordOpen}
      />
    </div>
  );
};

export default EditMyProfile;
