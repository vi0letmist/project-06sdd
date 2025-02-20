import React, { useState, useRef } from "react";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface InputImageProps {
  onUpload: (file: File | null) => void;
}

const InputImage: React.FC<InputImageProps> = ({ onUpload }) => {
  const [image, setImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setFileInfo({ name: file.name, size: file.size });
      };
      reader.readAsDataURL(file);
      onUpload(file);
    } else {
      setImage(null);
      setFileInfo(null);
      onUpload(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-3xl p-6 cursor-pointer hover:border-rose-500 transition-all"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      {!image ? (
        <>
          <PhotoIcon className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">Select or drag an image</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-auto">
            <img
              src={image}
              alt="Uploaded preview"
              className="rounded-lg w-full h-full object-cover"
            />
            <button
              className="absolute top-1 right-1 bg-white p-1 rounded-full text-gray-600 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleFileChange(null);
              }}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </div>
          {fileInfo && (
            <p className="text-sm text-gray-600 mt-2">
              {fileInfo.name} - {(fileInfo.size / 1024).toFixed(2)} KB
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default InputImage;
