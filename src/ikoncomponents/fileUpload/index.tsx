"use client";

import React, { useState, DragEvent, useRef } from "react";
import { UploadCloud, FileUp, Upload, X } from "lucide-react";
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
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
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

    const names = fileObjects.map((f) => f.fileName).join(", ");
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
   Image Preview Component
---------------------------------------------------- */
function ImagePreview({
  previews,
  onRemove,
}: {
  previews: { url: string; name: string }[];
  onRemove?: (index: number) => void;
}) {
  if (!previews.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 justify-center">
      {previews.map((preview, i) => (
        <div key={i} className="relative group">
          <img
            src={preview.url}
            alt={preview.name}
            className="h-16 w-16 object-cover rounded-md border p-1"
          />
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(i);
              }}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-4 h-4 
                         flex items-center justify-center opacity-0 group-hover:opacity-100 
                         transition-opacity shadow-sm"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          )}
          <p className="text-xs text-gray-500 text-center mt-0.5 max-w-[64px] truncate">
            {preview.name}
          </p>
        </div>
      ))}
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
  showPreview?: boolean;
  onFileSelect: (files: any[]) => Promise<any> | void;
}

export default function FileUploader({
  label = "Upload File",
  isDrag = false,
  fileInput = false,
  isMultiple = false,
  tooltipContent,
  fileNamePlaceholder = "Choose files...",
  showPreview = true,
  onFileSelect,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileNames, setFileNames] = useState("");
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);

  const filesCount = fileNames ? fileNames.split(", ").length : 0;

  /* ------------ GENERATE PREVIEWS ------------ */
  const generatePreviews = (files: File[]) => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));

    const newPreviews = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ url: URL.createObjectURL(f), name: f.name }));

    setPreviews(newPreviews);
  };

  /* ------------ REMOVE A SINGLE PREVIEW ------------ */
  const handleRemovePreview = (index: number) => {
    URL.revokeObjectURL(previews[index].url);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ------------ COMMON FILE HANDLER ------------ */
  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const fileList = isMultiple ? fileArray : [fileArray[0]];

    const fileObjects = await Promise.all(
      fileList.map((file) => convertFileToObject(file))
    );

    setFileNames(fileObjects.map((f) => f.fileName).join(", "));

    if (showPreview) generatePreviews(fileList);

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
      className={`flex flex-col ${
  fileInput ? "items-start text-left" : "items-center text-center"
} justify-center gap-2 cursor-pointer px-4 pb-4 rounded-lg transition ${
  fileInput
    ? ""
    : `border-2 border-dashed ${
        isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
      }`
}`}
    >
      {/* {fileInput?<label className="text-md font-bold">{label}</label>:<label className="text-md text-center  font-bold">{label}</label>} */}

           <label className="text-md mt-4 font-bold">{label}</label>


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

          {isDrag && (
            <p className="text-sm text-gray-500">
              {isDragging ? "Drop files here..." : "or drag & drop files here"}
            </p>
          )}

          {filesCount > 1 && (
            <p className="text-sm font-medium">{filesCount} files selected</p>
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
                  {filesCount === 1
                    ? fileNames
                    : `${filesCount} files selected`}
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
                  {filesCount === 1
                    ? fileNames
                    : `${filesCount} files selected`}
                </p>
              )}
            </div>
          )}

          {/* ✅ Preview only in drag/normal mode */}
          {showPreview && (
            <ImagePreview previews={previews} onRemove={handleRemovePreview} />
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