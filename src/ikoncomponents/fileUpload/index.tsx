"use client";

import React, { useState, DragEvent, useRef } from "react";
import { UploadCloud, FileUp, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/shadcn/input";
import { IconButtonWithTooltip } from "../buttons";

/* ----------------------------------------------------
   SAFE Base64 Converter
---------------------------------------------------- */
export const convertFileToObject = (file: File): Promise<any> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];

      resolve({
        resourceId: uuidv4(),
        message: "File processed successfully",
        resourceName: file.name,
        resourceSize: file.size,
        resourceType: file.type,
        base64,
      });
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/* ----------------------------------------------------
   FileInput UI (Text + Button Input)
---------------------------------------------------- */
function FileInputUI({
  tooltipContent,
  fileNames,
  fileNamePlaceholder,
  onFileNamesChange,
  onFileSelect,
  isMultiple,
}: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const fileObjects = await Promise.all(
      Array.from(files).map((f) => convertFileToObject(f))
    );

    const names = fileObjects.map((f) => f.resourceName).join(", ");
    onFileNamesChange?.(names);
    onFileSelect?.(fileObjects);
  };

  const filesCount = fileNames ? fileNames.split(", ").length : 0;

  return (
    <div className="flex w-full">
      <Input
        ref={inputRef}
        type="file"
        multiple={isMultiple}
        className="hidden"
        onChange={handleChange}
      />

      <Input
        className="rounded-e-none"
        placeholder={fileNamePlaceholder}
        value={
          filesCount === 0
            ? ""
            : filesCount === 1
            ? fileNames
            : `${filesCount} files selected`
        }
        readOnly
      />

      <IconButtonWithTooltip
        tooltipContent={tooltipContent || "Browse File"}
        onClick={() => inputRef.current?.click()}
        className="border-s-0 rounded-s-none"
      >
        <Upload />
      </IconButtonWithTooltip>
    </div>
  );
}

/* ----------------------------------------------------
   Main FileUploader Component
---------------------------------------------------- */
interface FileUploaderProps {
  label?: string;
  isDrag?: boolean;
  fileInput?: boolean;
  isMultiple?: boolean;

  tooltipContent?: string;
  fileNamePlaceholder?: string;

  onFileSelect: (files: any[]) => Promise<any> | void;
}

export default function FileUploader({
  label = "Upload File",
  isDrag = false,
  fileInput = false,
  isMultiple = false,
  tooltipContent,
  fileNamePlaceholder = "Choose files...",
  onFileSelect,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileNames, setFileNames] = useState("");

  const filesCount = fileNames ? fileNames.split(", ").length : 0;

  /* ------------ COMMON FILE HANDLER ------------ */
  const handleFiles = async (files: FileList) => {
    // If isMultiple is false, only take the first file
    const fileList = isMultiple ? Array.from(files) : [files[0]];

    const fileObjects = await Promise.all(
      fileList.map((file) => convertFileToObject(file))
    );

    setFileNames(fileObjects.map((f) => f.resourceName).join(", "));
    onFileSelect(fileObjects);
  };

  /* ------------ DRAG HANDLERS ------------ */
  const dragHandlers = isDrag
    ? {
        onDragOver: (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
          }
        },
      }
    : {};

  return (
    <div
      {...dragHandlers}
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer text-center px-4 pb-4 border-2 border-dashed rounded-lg transition ${
        isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
      }`}
    >
      <label className="text-md text-center mt-4 font-bold">{label}</label>

      {/* ---------------- FILE INPUT MODE ---------------- */}
      {fileInput && (
        <>
          <FileInputUI
            fileNames={fileNames}
            fileNamePlaceholder={fileNamePlaceholder}
            tooltipContent={tooltipContent}
            onFileNamesChange={setFileNames}
            onFileSelect={onFileSelect}
            isMultiple={isMultiple}
          />

          {/* Drag hint when isDrag is also enabled */}
          {isDrag && (
            <p className="text-sm text-gray-500">
              {isDragging ? "Drop files here..." : "or drag & drop files here"}
            </p>
          )}

          {/* Show selected file count if multiple files were dropped */}
          {filesCount > 1 && (
            <p className="text-sm font-medium">
              {filesCount} files selected
            </p>
          )}
        </>
      )}

      {/* ---------------- DRAG / NORMAL MODE ---------------- */}
      {!fileInput && (
        <>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            multiple={isMultiple}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />

          {isDrag ? (
            <div
              className="mt-3 p-6 w-full text-center cursor-pointer"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {filesCount === 0 && (
                <div className="flex flex-col items-center gap-3">
                  <UploadCloud className="w-10 h-10 text-blue-600" />
                  <p className="text-gray-600">
                    Drag & drop {isMultiple ? "files" : "a file"} or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </p>
                </div>
              )}

              {filesCount > 0 && (
                <p className="mt-3 text-sm font-medium">
                  {filesCount === 1 ? fileNames : `${filesCount} files selected`}
                </p>
              )}
            </div>
          ) : (
            <div
              className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer text-center"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {filesCount === 0 && (
                <>
                  <FileUp className="w-8 h-8 text-blue-600" />
                  <span className="text-blue-600 underline">
                    {isMultiple ? "Browse Files" : "Browse File"}
                  </span>
                </>
              )}

              {filesCount > 0 && (
                <p className="text-sm font-medium">
                  {filesCount === 1 ? fileNames : `${filesCount} files selected`}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   Convert Base64 back to Blob URL
---------------------------------------------------- */
export function getFileUrlFromObject(obj: any) {
  const byteCharacters = atob(obj.base64);
  const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
  const blob = new Blob([new Uint8Array(byteNumbers)], {
    type: obj.resourceType,
  });
  return URL.createObjectURL(blob);
}