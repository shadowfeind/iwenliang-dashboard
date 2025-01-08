"use client";

import React, { useState } from "react";
import { CloudUpload, Loader, X } from "lucide-react";
import Image from "next/image";
import { ErrorComponent } from "./ErrorComponent";
import { mode } from "@/config/types/mode.types";
import { uploadToS3 } from "@/actions/upload.action";
import { AWS_IMAGE_LINK } from "@/config/constant/aws";

type imagePropType = {
  size: number;
  maxFiles: number;
  mode: mode;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const ImageUpload = ({
  size,
  maxFiles,
  mode,
  images,
  setImages,
}: imagePropType) => {
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files) {
      setUploading(true);
      setError("");
      const selectedFiles = Array.from(event.target.files);

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      const validFiles = selectedFiles.filter(
        (file) => allowedTypes.includes(file.type) && file.size <= maxSize
      );
      if (validFiles.length !== selectedFiles.length) {
        setError("All files must follow upload rules");
        setUploading(false);
        return;
      }
      if (validFiles.length > maxFiles) {
        setError(`only ${maxFiles} files are allowed`);
        setUploading(false);
        return;
      }

      if (validFiles.length + images.length > maxFiles) {
        setError("Delete files first to upload");
        return;
      }

      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append("file", file);
      });

      const { successful, failed } = await uploadToS3(formData);
      console.log(successful, failed);

      if (failed.length > 0) {
        let errorString = "";
        failed.forEach((err) => errorString + `${err.originalName}, `);
        setError(`${errorString} could not be uploaded. try again`);
      }

      if (successful.length > 0) {
        let imgUrl: string[] = [];
        successful.forEach((img) =>
          imgUrl.push(`${AWS_IMAGE_LINK}${img.uploadedName}`)
        );
        setImages((prev) => [...prev, ...imgUrl]);
      }
      setUploading(false);
    }
  };

  const handleDelete = (index: any) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {mode !== "view" && (
        <label className="w-full h-40 bg-slate-300 flex items-center justify-center flex-col rounded-sm cursor-pointer">
          <input
            disabled={uploading}
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <>
              <Loader className="animate-spin" size={48} />
              <div>Uploadding Images...</div>
            </>
          ) : (
            <>
              {" "}
              <CloudUpload size={48} />
              <div>Upload Images</div>
            </>
          )}
          <div className="text-sm font-light">
            Allowed types:<strong> png, jpeg and jpg</strong> only
          </div>
          <div className="text-sm font-light">
            max file size: <strong>{size.toString()}MB</strong>, max images:{" "}
            <strong>{maxFiles.toString()}</strong>
          </div>
          <ErrorComponent message={error} />
        </label>
      )}

      <div className="mt-4 flex gap-4">
        {images?.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              height={200}
              width={200}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[200px] h-[200px] object-cover rounded-sm"
            />
            {mode !== "view" && (
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
