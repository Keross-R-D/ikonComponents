"use client";

import React, { useState, DragEvent } from "react";
import { UploadCloud, FileUp } from "lucide-react";

interface FileUploaderProps {
  label?: string;
  isDrag?: boolean; // enable or disable drag & drop
  onFileSelect: (fileObj: any) => Promise<any> | void; // now returns object with base64
}

// --- Helper: Convert File to Object with Base64 ---
export const convertFileToObject = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

  return {
    message: "File processed successfully",
    fileName: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    base64: base64,
  };
};

export default function FileUploader({
  label = "Upload File",
  isDrag = false,
  onFileSelect,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    if (!file) return;
    const fileObj = await convertFileToObject(file); // convert to object
    await onFileSelect(fileObj); // pass object to parent
  };

  // ---- DRAG HANDLERS ----
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (!isDrag) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    if (!isDrag) return;
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium">{label}</label>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* ----- DRAG & DROP VERSION ----- */}
      {isDrag ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <div className="flex flex-col items-center gap-3">
            <UploadCloud className="w-10 h-10 text-blue-600" />
            <p className="text-gray-600">
              Drag & drop your file here or{" "}
              <span className="text-blue-600 underline">browse</span>
            </p>
          </div>
        </div>
      ) : (
        // ----- SIMPLE UPLOAD BOX -----
        <div
          className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer text-center"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FileUp className="w-8 h-8 text-blue-600" />
          <span className="text-blue-600 underline">Browse File</span>
        </div>
      )}
    </div>
  );
}

// --- Helper Function: Recreate Image from File Object ---
export function getImageFromObject(obj: any) {
  const byteCharacters = atob(obj.base64);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(0)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: obj.type });

  return URL.createObjectURL(blob); // usable in <img src="..." />
}
