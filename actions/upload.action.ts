"use server";

import { auth } from "@/config/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

type UploadResult = {
  originalName: string;
  uploadedName: string;
};

type UploadError = {
  originalName: string;
  error: string;
};

type UploadToS3Result = {
  successful: UploadResult[];
  failed: UploadError[];
};

export async function uploadToS3(
  formData: FormData
): Promise<UploadToS3Result> {
  const successful: UploadResult[] = [];
  const failed: UploadError[] = [];

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") {
    failed.push({ originalName: "AuthError", error: "Not Authorized" });
    return { successful, failed };
  }

  const files = formData.getAll("file") as File[];

  if (files.length < 1) {
    failed.push({ originalName: "Validation", error: "No Files" });
    return { successful, failed };
  }

  const uploadPromises = files.map(async (file) => {
    const fileBuffer = await file.arrayBuffer();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const putObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    };

    const putObjectCommand = new PutObjectCommand(putObjectParams);
    await s3Client.send(putObjectCommand);

    // Generate a pre-signed URL for the uploaded object
    const getObjectParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileName,
    };
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand(getObjectParams),
      { expiresIn: 3600 }
    );
    // URL expires in 1 hour

    return {
      originalName: file.name,
      uploadedName: fileName,
    };
  });

  const results = await Promise.allSettled(uploadPromises);

  results.forEach((result) => {
    if (result.status === "fulfilled") {
      successful.push(result.value);
    } else {
      failed.push({
        originalName: files[results.indexOf(result)].name,
        error:
          result.reason instanceof Error
            ? result.reason.message
            : "Unknown error",
      });
    }
  });

  return { successful, failed };
}
