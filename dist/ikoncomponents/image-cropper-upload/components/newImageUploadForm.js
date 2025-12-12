import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, memo } from "react";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ImageIcon, FileImage, Square, Upload, } from "lucide-react";
import { Label } from "../../../shadcn/label";
import { Input } from "../../../shadcn/input";
import { Button } from "../../../shadcn/button";
import { NewCropperImg } from "./newCropper";
import Image from "next/image";
const NewImageFormComponent = ({ open, setOpen, onImageSubmit, }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [prevImages, setPrevImages] = useState({
        first: null,
        second: null,
        third: null,
    });
    const [aspectRatio, setAspectRatio] = useState(4 / 3);
    const [activeState, setActiveState] = useState("first");
    const [rotationAngle, setRotationAngle] = useState(0);
    const [scale, setScale] = useState(1);
    const [moveDirection, setMoveDirection] = useState({
        x: 0,
        y: 0,
    });
    const [fileName, setFileName] = useState("");
    const handleImageSubmit = () => {
        console.log("Image Submit Button is pressed");
        console.log(prevImages);
        onImageSubmit(prevImages.third);
        setOpen(false);
    };
    const rotateImage = (angle) => {
        setRotationAngle((prevAngle) => prevAngle + angle);
    };
    const handleMoveUp = () => {
        setMoveDirection({ x: 0, y: -5 });
    };
    const handleMoveDown = () => {
        setMoveDirection({ x: 0, y: 5 });
    };
    const handleMoveLeft = () => {
        setMoveDirection({ x: -5, y: 0 });
    };
    const handleMoveRight = () => {
        setMoveDirection({ x: 5, y: 0 });
    };
    // Handle zoom in
    const zoomIn = () => {
        setScale((prevScale) => {
            const newScale = prevScale + 0.2;
            if (newScale <= 2) {
                // Ensure scale does not exceed the max value
                return newScale;
            }
            return prevScale;
        });
    };
    // Handle zoom out
    const zoomOut = () => {
        setScale((prevScale) => {
            const newScale = prevScale - 0.2;
            if (newScale >= 0.2) {
                // Ensure scale does not go below the min value
                return newScale;
            }
            return prevScale;
        });
    };
    const handleAspectRatioChange = (ratio, stateName) => {
        setAspectRatio(ratio);
        setActiveState(stateName);
    };
    const handleFileChange = (file) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setFileName((prev) => prev || file.name);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("Please drop a valid image file.");
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        handleFileChange(event.dataTransfer.files[0]);
    };
    const getImagePreview = (state) => {
        const imgSource = croppedImage && activeState === state ? croppedImage : prevImages[state];
        // const imgSource = prevImages[state];
        return imgSource ? (_jsx("div", { className: `
            ${state === "first"
                ? "relative w-3/5 h-[200px] bg-slate-400"
                : state === "second"
                    ? "relative w-1/2 h-[220px] bg-slate-400"
                    : "relative w-1/3 h-[120px] bg-slate-400"}`, children: _jsx(Image, { src: imgSource || "", alt: `Preview ${state}`, layout: "fill", objectFit: "70vh" }) })) : (_jsx("div", { className: `
            ${state === "first"
                ? "relative w-3/5 h-[200px] bg-slate-400"
                : state === "second"
                    ? "relative w-1/2 h-[220px] bg-slate-400"
                    : "relative w-1/3 h-[120px] bg-slate-400"}` }));
    };
    useEffect(() => {
        if (croppedImage) {
            if (prevImages.first === null ||
                prevImages.second === null ||
                prevImages.third === null) {
                setPrevImages({
                    first: croppedImage,
                    second: croppedImage,
                    third: croppedImage,
                });
            }
            else {
                setPrevImages((prev) => (Object.assign(Object.assign({}, prev), { [activeState]: croppedImage })));
            }
        }
    }, [croppedImage]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-row gap-2", children: [_jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "imageName", children: "Image Name" }), _jsx(Input, { id: "imageName", placeholder: "Enter image name", value: fileName, onChange: (e) => setFileName(e.target.value) })] }), _jsxs("div", { className: "self-end", children: [_jsx(Button, { variant: "outline", onClick: () => { var _a; return (_a = document.getElementById("inputImage1")) === null || _a === void 0 ? void 0 : _a.click(); }, children: _jsx(Upload, {}) }), _jsx(Input, { id: "inputImage1", type: "file", accept: "image/png, image/jpeg", className: "hidden", onChange: (e) => {
                                    var _a;
                                    const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                    if (file && file.type.startsWith("image/")) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImageSrc(reader.result);
                                            setFileName((prevFileName) => prevFileName || file.name);
                                        };
                                        reader.readAsDataURL(file);
                                        setPrevImages({
                                            first: null,
                                            second: null,
                                            third: null,
                                        });
                                    }
                                } })] }), _jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "imageDesc", children: "Image Description" }), _jsx(Input, { id: "imageDesc", placeholder: "Describe your image" })] })] }), _jsxs("div", { className: "flex flex-row gap-2", children: [_jsx("div", { className: "w-3/5 flex justify-center items-center border-2 border-dashed border-gray-400 bg-gray-100", style: { height: "70vh" }, onDrop: handleDrop, onDragOver: (e) => e.preventDefault(), children: imageSrc ? (_jsx(NewCropperImg, { imageSrc: imageSrc, onCroppedImage: setCroppedImage, aspectRatio: aspectRatio, rotationAngle: rotationAngle, zoomLevel: scale, moveDirection: moveDirection, currentState: activeState })) : (_jsxs("div", { className: "text-center", children: [_jsx(Label, { htmlFor: "inputImage", children: "Drag and drop an image here" }), _jsxs("div", { className: "mt-4", children: [_jsx(Button, { variant: "outline", onClick: () => { var _a; return (_a = document.getElementById("inputImage")) === null || _a === void 0 ? void 0 : _a.click(); }, children: "Upload Image" }), _jsx(Input, { id: "inputImage", type: "file", accept: "image/png, image/jpeg", className: "hidden", onChange: (e) => {
                                                var _a;
                                                const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                                if (file) {
                                                    handleFileChange(file);
                                                }
                                            } })] })] })) }), _jsxs("div", { className: "w-2/5 flex flex-col gap-2", children: [_jsx("h3", { children: "Landscape" }), getImagePreview("first"), _jsx("h3", { children: "Potrait" }), getImagePreview("second"), _jsx("h3", { children: "Icon" }), getImagePreview("third")] })] }), _jsxs("div", { className: "flex flex-row gap-1", children: [_jsxs("div", { className: "w-3/5 flex flex-row justify-between", children: [_jsxs("div", { children: [_jsx(Button, { variant: "outline", onClick: () => handleAspectRatioChange(4 / 3, "first"), children: _jsx(ImageIcon, {}) }), _jsx(Button, { variant: "outline", onClick: () => handleAspectRatioChange(3 / 4, "second"), children: _jsx(FileImage, {}) }), _jsx(Button, { variant: "outline", onClick: () => handleAspectRatioChange(1 / 1, "third"), children: _jsx(Square, {}) })] }), _jsxs("div", { children: [_jsx(Button, { onClick: () => rotateImage(90), variant: "outline", children: _jsx(RotateCw, {}) }), _jsx(Button, { onClick: () => rotateImage(-90), variant: "outline", children: _jsx(RotateCcw, {}) })] }), _jsxs("div", { children: [_jsx(Button, { onClick: () => zoomIn(), variant: "outline", children: _jsx(ZoomIn, {}) }), _jsx(Button, { onClick: () => zoomOut(), variant: "outline", children: _jsx(ZoomOut, {}) })] }), _jsxs("div", { children: [_jsx(Button, { onClick: handleMoveUp, variant: "outline", children: _jsx(ArrowUp, {}) }), _jsx(Button, { onClick: handleMoveDown, variant: "outline", children: _jsx(ArrowDown, {}) }), _jsx(Button, { onClick: handleMoveLeft, variant: "outline", children: _jsx(ArrowLeft, {}) }), _jsx(Button, { onClick: handleMoveRight, variant: "outline", children: _jsx(ArrowRight, {}) })] })] }), _jsx("div", { className: "w-2/5 flex flex-row-reverse", children: _jsx(Button, { onClick: handleImageSubmit, children: "Save" }) })] })] }));
};
export const NewImageForm = memo(NewImageFormComponent);
