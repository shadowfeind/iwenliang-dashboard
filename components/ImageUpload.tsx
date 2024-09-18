"use client";

import React, { useState } from "react";
import { CloudUpload, Loader, X } from "lucide-react";
import Image from "next/image";
import { ErrorComponent } from "./ErrorComponent";

type imagePropType = {
  size: Number;
  maxFiles: Number;
};

const ImageUpload = ({ size, maxFiles }: imagePropType) => {
  const [files, setFiles] = useState<any[]>([]);
  const [previews, setPreviews] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let selectedFiles;
    if (event.target.files) {
      setUploading(true);
      selectedFiles = Array.from(event.target.files);

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      const validFiles = selectedFiles.filter(
        (file) => allowedTypes.includes(file.type) && file.size <= maxSize
      );

      if (validFiles.length === selectedFiles.length) {
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);

        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
          };
          reader.readAsDataURL(file);
        });
        setError("");
      } else {
        setError("Check file size / type. Validation failed");
      }
    }
  };

  const handleDelete = (index: any) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
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
            <Loader size={48} />
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

      <div className="mt-4 flex gap-4">
        {previews?.map((preview, index) => (
          <div key={index} className="relative">
            <Image
              height={200}
              width={200}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-[200px] h-[200px] object-cover rounded-sm"
            />
            <button
              onClick={() => handleDelete(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
