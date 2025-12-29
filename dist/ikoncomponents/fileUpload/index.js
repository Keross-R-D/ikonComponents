"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { UploadCloud, FileUp } from "lucide-react";
// --- Helper: Convert File to Object with Base64 ---
export const convertFileToObject = async (file) => {
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
export function FileUploader({ label = "Upload File", isDrag = false, onFileSelect, }) {
    const [isDragging, setIsDragging] = useState(false);
    const handleFile = async (file) => {
        if (!file)
            return;
        const fileObj = await convertFileToObject(file); // convert to object
        await onFileSelect(fileObj); // pass object to parent
    };
    // ---- DRAG HANDLERS ----
    const handleDrop = (e) => {
        var _a;
        if (!isDrag)
            return;
        e.preventDefault();
        setIsDragging(false);
        const file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file)
            handleFile(file);
    };
    const handleDragOver = (e) => {
        if (!isDrag)
            return;
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        if (!isDrag)
            return;
        setIsDragging(false);
    };
    const handleInputChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file)
            handleFile(file);
    };
    return (_jsxs("div", { className: "flex flex-col gap-2 w-full", children: [_jsx("label", { className: "text-sm font-medium", children: label }), _jsx("input", { type: "file", id: "fileInput", className: "hidden", onChange: handleInputChange }), isDrag ? (_jsx("div", { className: `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300"}
          `, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: () => { var _a; return (_a = document.getElementById("fileInput")) === null || _a === void 0 ? void 0 : _a.click(); }, children: _jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx(UploadCloud, { className: "w-10 h-10 text-blue-600" }), _jsxs("p", { className: "text-gray-600", children: ["Drag & drop your file here or", " ", _jsx("span", { className: "text-blue-600 underline", children: "browse" })] })] }) })) : (
            // ----- SIMPLE UPLOAD BOX -----
            _jsxs("div", { className: "border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer text-center", onClick: () => { var _a; return (_a = document.getElementById("fileInput")) === null || _a === void 0 ? void 0 : _a.click(); }, children: [_jsx(FileUp, { className: "w-8 h-8 text-blue-600" }), _jsx("span", { className: "text-blue-600 underline", children: "Browse File" })] }))] }));
}
// --- Helper Function: Recreate Image from File Object ---
export function getImageFromObject(obj) {
    const byteCharacters = atob(obj.base64);
    const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: obj.type });
    return URL.createObjectURL(blob); // usable in <img src="..." />
}
