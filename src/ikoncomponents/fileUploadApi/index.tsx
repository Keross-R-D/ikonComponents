"use client";

import React, { useState, DragEvent, useRef, useImperativeHandle, forwardRef } from "react";
import { UploadCloud, FileUp, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/shadcn/input";
import { IconButtonWithTooltip } from "../buttons";
import { uploadFilePublic } from "../../utils/api/file-upload copy";

/* ----------------------------------------------------
   SAFE Base64 Converter (kept for local preview use)
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
  inputId,
}: {
  tooltipContent?: string;
  fileNames: string;
  fileNamePlaceholder?: string;
  onFileNamesChange?: (names: string) => void;
  onFileSelect?: (files: File[]) => void;
  isMultiple?: boolean;
  inputId: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const fileList = isMultiple ? Array.from(files) : [files[0]];
    const names = fileList.map((f) => f.name).join(", ");
    onFileNamesChange?.(names);
    onFileSelect?.(fileList);
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
        id={inputId}
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
   Ref handle exposed to parent
---------------------------------------------------- */
export interface FileUploader2Ref {
  /** Triggers the upload for already-selected files. Resolves when done. */
  upload: () => Promise<void>;
}

/* ----------------------------------------------------
   Main FileUploader2 Props
---------------------------------------------------- */
export interface FileUploader2Props {
  // --- Original FileUploader2 props ---
  label?: string;
  isDrag?: boolean;
  onUploadComplete?: (response: any | any[]) => void;
  imageUrl?: string;

  // --- Added from FileUploader ---
  fileInput?: boolean;
  isMultiple?: boolean;
  tooltipContent?: string;
  fileNamePlaceholder?: string;

  /** Called with the raw File objects before upload */
  onFileSelect?: (files: File[]) => void;

  /**
   * Custom upload endpoint. When provided, files are POSTed as multipart/form-data
   * and the full JSON response is passed to onUploadComplete.
   * Falls back to uploadFilePublic() when omitted.
   */
  apiUrl?: string;

  /**
   * When true, the upload does NOT start automatically on file selection.
   * Instead, call ref.upload() to trigger it manually.
   */
  manual?: boolean;
}

/* ----------------------------------------------------
   Main FileUploader2 Component
---------------------------------------------------- */
export const FileUploader2 = forwardRef<FileUploader2Ref, FileUploader2Props>(
  function FileUploader2(
  {
  label = "Upload File",
  isDrag = false,
  onUploadComplete,
  imageUrl,
  fileInput = false,
  isMultiple = false,
  tooltipContent,
  fileNamePlaceholder = "Choose files...",
  onFileSelect,
  apiUrl,
  manual = false,
}: FileUploader2Props, ref) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState("");
  const [loading, setLoading] = useState(false);

  // Holds files pending upload when manual=true
  const pendingFilesRef = useRef<File[]>([]);

  const inputId = `fileInput-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const filesCount = fileNames ? fileNames.split(", ").length : 0;

  /* ------------ UPLOAD EXECUTOR ------------ */
  const executeUpload = async (fileList: File[]) => {
    try {
      setLoading(true);
      const responses = await Promise.all(
        fileList.map((f) => {
          if (apiUrl) {
            const formData = new FormData();
            formData.append("file", f);
            return fetch(apiUrl, { method: "POST", body: formData })
              .then((res) => {
                if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
                return res.json();
              })
              .then((data) => data);
          }
          return uploadFilePublic(f);
        })
      );
      onUploadComplete?.(isMultiple ? responses : responses[0]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ------------ EXPOSE upload() TO PARENT ------------ */
  useImperativeHandle(ref, () => ({
    upload: async () => {
      if (!pendingFilesRef.current.length) {
        console.warn("FileUploader2: no files selected to upload.");
        return;
      }
      await executeUpload(pendingFilesRef.current);
    },
  }));

  /* ------------ CORE FILE HANDLER ------------ */
  const handleFiles = async (files: File[]) => {
    const fileList = isMultiple ? files : [files[0]];

    // Local previews for images
    const newPreviews = fileList.map((f) =>
      f.type.startsWith("image/") ? URL.createObjectURL(f) : ""
    );
    setPreviews(newPreviews.filter(Boolean));
    setFileNames(fileList.map((f) => f.name).join(", "));

    // Notify parent of raw files
    onFileSelect?.(fileList);

    if (manual) {
      // Store files for later — upload() will consume them
      pendingFilesRef.current = fileList;
    } else {
      await executeUpload(fileList);
    }
  };

  /* ------------ INPUT CHANGE ------------ */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) handleFiles(Array.from(files));
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
            handleFiles(Array.from(e.dataTransfer.files));
          }
        },
      }
    : {};

  /* ------------ DISPLAY PREVIEWS ------------ */
  const displayPreviews =
    previews.length > 0 ? previews : imageUrl ? [imageUrl] : [];

  return (
    <div
      {...dragHandlers}
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer text-center px-4 pb-4 border-2 border-dashed rounded-lg transition ${
        isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"
      }`}
    >
      <label className="text-md text-center mt-4 font-bold">{label}</label>

      {/* Hidden native file input (used by drag/normal modes) */}
      <input
        type="file"
        id={inputId}
        className="hidden"
        multiple={isMultiple}
        onChange={handleInputChange}
      />

      {/* ============ FILE INPUT MODE ============ */}
      {fileInput && (
        <>
          <FileInputUI
            fileNames={fileNames}
            fileNamePlaceholder={fileNamePlaceholder}
            tooltipContent={tooltipContent}
            onFileNamesChange={setFileNames}
            onFileSelect={(files) => handleFiles(files)}
            isMultiple={isMultiple}
            inputId={`${inputId}-fileinput`}
          />

          {/* Drag hint when isDrag is also enabled */}
          {isDrag && (
            <p className="text-sm text-gray-500">
              {isDragging ? "Drop files here..." : "or drag & drop files here"}
            </p>
          )}

          {/* Show loading state */}
          {loading && (
            <p className="text-sm text-blue-500 animate-pulse">Uploading...</p>
          )}

          {/* Show selected file count if multiple files were dropped */}
          {filesCount > 1 && !loading && (
            <p className="text-sm font-medium">{filesCount} files selected</p>
          )}
        </>
      )}

      {/* ============ DRAG / NORMAL MODE ============ */}
      {!fileInput && (
        <>
          {isDrag ? (
            <div
              className="mt-3 p-6 w-full text-center cursor-pointer"
              onClick={() => document.getElementById(inputId)?.click()}
            >
              {filesCount === 0 && !loading && (
                <div className="flex flex-col items-center gap-3">
                  <UploadCloud className="w-10 h-10 text-blue-600" />
                  <p className="text-gray-600">
                    Drag & drop {isMultiple ? "files" : "a file"} or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </p>
                </div>
              )}

              {loading && (
                <p className="text-sm text-blue-500 animate-pulse">
                  Uploading...
                </p>
              )}

              {filesCount > 0 && !loading && (
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
              onClick={() => document.getElementById(inputId)?.click()}
            >
              {filesCount === 0 && !loading && (
                <>
                  <FileUp className="w-8 h-8 text-blue-600" />
                  <span className="text-blue-600 underline">
                    {isMultiple ? "Browse Files" : "Browse File"}
                  </span>
                </>
              )}

              {loading && (
                <p className="text-sm text-blue-500 animate-pulse">
                  Uploading...
                </p>
              )}

              {filesCount > 0 && !loading && (
                <p className="text-sm font-medium">
                  {filesCount === 1
                    ? fileNames
                    : `${filesCount} files selected`}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ============ IMAGE PREVIEWS ============ */}
      {displayPreviews.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1 justify-center">
          {displayPreviews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`preview-${i}`}
              className="h-10 object-cover rounded-md border p-1"
            />
          ))}
        </div>
      )}
    </div>
  );
});

/* ----------------------------------------------------
   Convert Base64 back to Blob URL (utility, kept for compat)
---------------------------------------------------- */

export function getFileUrlFromObject(obj: any) {
  const byteCharacters = atob(obj.base64);
  const byteNumbers = Array.from(byteCharacters).map((c) => c.charCodeAt(0));
  const blob = new Blob([new Uint8Array(byteNumbers)], {
    type: obj.resourceType,
  });
  return URL.createObjectURL(blob);
}