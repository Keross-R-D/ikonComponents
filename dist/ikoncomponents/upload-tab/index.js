"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { UploadIcon, X, Send } from "lucide-react";
import { Button } from "../../shadcn/button";
import { Input } from "../../shadcn/input";
import { Label } from "../../shadcn/label";
import { Progress } from "../../shadcn/progress";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, FormField, FormItem, FormControl, FormMessage, } from "../../shadcn/form";
import { NoDataComponent } from "../no-data";
export function UploadTab() {
    const form = useForm({
        defaultValues: {
            text: "",
            fileNames: [],
        },
    });
    const [inputValue, setInputValue] = useState("");
    const [texts, setTexts] = useState([]);
    const [fileNames, setFileNames] = useState([]); // Updated type
    const [formattedDate, setFormattedDate] = useState("");
    const [noFilesUploaded, setNoFilesUploaded] = useState(true);
    const isUploading = fileNames.some((file) => file.progress < 100);
    const simulateFileUpload = async (idx, file) => {
        const formData = new FormData();
        formData.append("file", file.file); // Use the actual file object
        try {
            const response = await axios.post("UPLOAD_ENDPOINT_URL", formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setFileNames((prev) => prev.map((f, i) => (i === idx ? Object.assign(Object.assign({}, f), { progress }) : f)));
                },
            });
            setFileNames((prev) => prev.map((f, i) => i === idx ? Object.assign(Object.assign({}, f), { url: response.data.url, progress: 100 }) : f));
        }
        catch (error) {
            console.error("Upload failed:", error);
        }
    };
    useEffect(() => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = currentDate.getFullYear();
        setFormattedDate(`${day}-${month}-${year}`);
    }, []);
    useEffect(() => {
        fileNames.forEach((file, idx) => {
            if (file.progress === 0) {
                simulateFileUpload(idx, file);
            }
        });
    }, [fileNames]);
    const handleAddText = () => {
        if (inputValue.trim() || fileNames.length > 0) {
            const newEntry = {
                text: inputValue.trim(),
                fileNames: fileNames.map((file) => file.name),
            };
            setTexts([newEntry, ...texts]);
            setInputValue("");
            setFileNames([]);
            setNoFilesUploaded(false);
        }
    };
    const handleFileUpload = (e) => {
        if (e.target.files) {
            const uploadedFiles = Array.from(e.target.files).map((file) => ({
                name: file.name,
                url: "",
                progress: 0,
                file,
            }));
            setFileNames((prev) => [...prev, ...uploadedFiles]); // Type now matches correctly
            setNoFilesUploaded(false);
        }
    };
    const removeFile = (index) => {
        const updatedFiles = fileNames.filter((_, idx) => idx !== index);
        setFileNames(updatedFiles);
        if (updatedFiles.length === 0 && texts.length === 0) {
            setNoFilesUploaded(true);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-col h-full w-full gap-3", children: [_jsxs("div", { className: "flex-grow overflow-auto flex flex-col-reverse gap-2", children: [noFilesUploaded && _jsx(NoDataComponent, { text: "No files uploaded" }), fileNames.length > 0 && (_jsxs("div", { className: "p-2 my-1 rounded-md border", children: [_jsx("p", { className: "font-bold", children: "Selected Files:" }), fileNames.map((file, idx) => (_jsxs("div", { className: "flex flex-col mb-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("a", { href: file.url, download: file.name, className: "text-sm text-blue-600 underline cursor-pointer", children: file.name }), _jsx("button", { onClick: () => removeFile(idx), className: "text-red-500 hover:text-red-800", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx(Progress, { value: file.progress }), _jsxs("p", { className: "text-xs text-gray-500", children: [file.progress, "% uploaded"] })] }, idx)))] })), texts.map((entry, index) => (_jsxs("div", { className: "border-b text-sm pb-2", children: [entry.fileNames.map((fileName, idx) => {
                                    var _a;
                                    return (_jsx("p", { children: _jsx("a", { href: ((_a = fileNames.find((file) => file.name === fileName)) === null || _a === void 0 ? void 0 : _a.url) ||
                                                "#", download: fileName, className: "text-sm text-blue-500 underline cursor-pointer", children: fileName }) }, idx));
                                }), _jsx("p", { children: entry.text || "(No Text)" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("p", { children: "John Doe" }), _jsx("p", { children: formattedDate })] })] }, index)))] }), _jsx(Form, Object.assign({}, form, { children: _jsx("form", { onSubmit: form.handleSubmit(() => handleAddText()), children: _jsx("div", { className: "flex flex-col", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "flex-1", children: _jsx(FormField, { name: "text", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormControl, { children: _jsx(Input, { id: "text-input", type: "text", value: inputValue, onChange: (e) => setInputValue(e.target.value), placeholder: "Type something..." }) }), _jsx(FormMessage, {})] })) }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Label, { htmlFor: "file-upload", className: "sr-only", children: "Upload Files" }), _jsx(Button, { variant: "outline", asChild: true, children: _jsx("label", { htmlFor: "file-upload", className: "cursor-pointer", children: _jsx(UploadIcon, { className: "w-5 h-5" }) }) }), _jsx(Input, { id: "file-upload", type: "file", multiple: true, onChange: handleFileUpload, className: "hidden" })] }), _jsx(Button, { variant: "outline", type: "submit", disabled: isUploading, children: _jsx(Send, {}) })] }) }) }) }))] }) }));
}
