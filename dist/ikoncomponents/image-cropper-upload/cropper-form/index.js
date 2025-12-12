import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '../../../shadcn/input';
import { Label } from '../../../shadcn/label';
import { ToggleGroup, ToggleGroupItem } from '../../../shadcn/toggle-group';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, FileImage, ImageIcon, RotateCcw, RotateCw, Square, ZoomIn, ZoomOut } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { ImageCropper } from '../image-cropper';
import Image from 'next/image';
import { AspectRatio } from '../../../shadcn/aspect-ratio';
import { TextButton } from '../../buttons';
import { toast } from 'sonner';
import { FileInput } from '../../file-input';
import { useImageCropper } from '..';
const stateWiseAspectRatio = {
    landscape: 4 / 3,
    potrait: 3 / 4,
    icon: 1 / 1
};
function CropperFormComponent({ onNewFileUpload }) {
    const { originalImage, setOriginalImage, aspectRatioWiseImages, setAspectRatioWiseImages } = useImageCropper();
    const [croppedImage, setCroppedImage] = useState(null);
    const [activeState, setActiveState] = useState();
    const [rotationAngle, setRotationAngle] = useState(0);
    const [scale, setScale] = useState(1);
    const [moveDirection, setMoveDirection] = useState({
        x: 0,
        y: 0,
    });
    const [imageSrc, setImageSrc] = useState(null);
    const handleDrop = (event) => {
        event.preventDefault();
        handleFileChange(event.dataTransfer.files[0]);
    };
    const handleFileChange = (file) => {
        var _a;
        if (typeof file === "string") {
            setImageSrc(file);
        }
        else {
            if ((_a = file === null || file === void 0 ? void 0 : file.type) === null || _a === void 0 ? void 0 : _a.startsWith("image/")) {
                onNewFileUpload === null || onNewFileUpload === void 0 ? void 0 : onNewFileUpload();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImageSrc(reader.result);
                    setActiveState(undefined);
                };
                reader.readAsDataURL(file);
                setOriginalImage(Object.assign(Object.assign({}, originalImage), { image: file, name: file.name }));
            }
            else {
                toast.error("Please select a valid image file.");
            }
        }
    };
    useEffect(() => {
        if (originalImage.image) {
            handleFileChange(originalImage.image);
        }
    }, [originalImage.image]);
    const getImagePreview = (state) => {
        const imgSource = croppedImage && activeState === state ? croppedImage : aspectRatioWiseImages[state];
        return (_jsxs(_Fragment, { children: [_jsx("h3", { className: 'mb-3', children: state }), _jsx(AspectRatio, { ratio: stateWiseAspectRatio[state], className: 'bg-muted', children: imgSource &&
                        _jsx(Image, { src: imgSource || "", alt: `Preview ${state}`, fill: true }) })] }));
    };
    useEffect(() => {
        if (croppedImage) {
            if (activeState) {
                setAspectRatioWiseImages(Object.assign(Object.assign({}, aspectRatioWiseImages), { [activeState]: croppedImage }));
            }
            else {
                setAspectRatioWiseImages({
                    landscape: croppedImage,
                    potrait: croppedImage,
                    icon: croppedImage
                });
            }
        }
    }, [croppedImage]);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'flex flex-col gap-3 h-full overflow-auto', children: [_jsxs("div", { className: 'flex flex-col lg:flex-row gap-3 justify-between', children: [_jsxs("div", { className: 'w-full flex flex-col gap-4', children: [_jsx(Label, { htmlFor: "imageName", children: "Image Name" }), _jsx(FileInput, { id: "inputImage", accept: "image/*", fileNamePlaceholder: "Enter image name", fileName: (originalImage === null || originalImage === void 0 ? void 0 : originalImage.name) || "", onChange: (e) => {
                                        var _a;
                                        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                        if (file) {
                                            handleFileChange(file);
                                        }
                                    }, onFileNameChange: (e) => {
                                        setOriginalImage(Object.assign(Object.assign({}, originalImage), { name: e.target.value }));
                                    } })] }), _jsxs("div", { className: 'w-full flex flex-col gap-4', children: [_jsx(Label, { htmlFor: "imageDescription", children: "Image Description" }), _jsx(Input, { id: "imageDescription", placeholder: "Enter image Description", value: (originalImage === null || originalImage === void 0 ? void 0 : originalImage.description) || "", onChange: (e) => setOriginalImage(Object.assign(Object.assign({}, originalImage), { description: e.target.value })) })] })] }), _jsxs("div", { className: 'flex flex-col lg:flex-row gap-3', children: [_jsxs("div", { className: 'flex-grow flex flex-col gap-3', children: [_jsxs("div", { children: [_jsx("h3", { className: 'mb-3', children: "Original Image" }), _jsx(AspectRatio, { ratio: 4 / 3, className: 'flex justify-center items-center bg-muted text-muted-foreground', onDrop: handleDrop, onDragOver: (e) => e.preventDefault(), children: imageSrc ?
                                                _jsx(ImageCropper, { src: imageSrc, onCroppedImage: setCroppedImage, aspectRatio: stateWiseAspectRatio[activeState || "icon"], rotationAngle: rotationAngle, zoomLevel: scale, moveDirection: moveDirection })
                                                :
                                                    _jsxs("div", { className: "text-center", children: [_jsx(Label, { htmlFor: "inputImage", children: "Drag and drop an image here" }), _jsx("div", { className: "mt-3", children: _jsx(TextButton, { variant: "outline", onClick: () => { var _a; return (_a = document.getElementById("inputImage")) === null || _a === void 0 ? void 0 : _a.click(); }, children: "Browse Image" }) })] }) })] }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-3 justify-between", children: [_jsx("div", { children: _jsxs(ToggleGroup, { type: "single", variant: 'outline', value: activeState, onValueChange: (value) => setActiveState(value), children: [_jsx(ToggleGroupItem, { className: "rounded-e-none", value: "landscape", children: _jsx(ImageIcon, {}) }), _jsx(ToggleGroupItem, { className: "rounded-none border-x-0", value: "potrait", children: _jsx(FileImage, {}) }), _jsx(ToggleGroupItem, { className: 'rounded-s-none', value: "icon", children: _jsx(Square, {}) })] }) }), _jsxs("div", { className: 'flex flex-col lg:flex-row gap-3 justify-between', children: [_jsxs(ToggleGroup, { type: "single", variant: 'outline', value: "", onValueChange: (value) => setRotationAngle(parseInt(value)), children: [_jsx(ToggleGroupItem, { className: "rounded-e-none", value: "90", children: _jsx(RotateCw, {}) }), _jsx(ToggleGroupItem, { className: 'rounded-s-none border-s-0', value: "-90", children: _jsx(RotateCcw, {}) })] }), _jsxs(ToggleGroup, { type: "single", variant: 'outline', value: '', children: [_jsx(ToggleGroupItem, { className: "rounded-e-none", value: "up", onClick: () => setMoveDirection({ x: 0, y: -5 }), children: _jsx(ArrowUp, {}) }), _jsx(ToggleGroupItem, { className: "rounded-none border-x-0", value: "down", onClick: () => setMoveDirection({ x: 0, y: 5 }), children: _jsx(ArrowDown, {}) }), _jsx(ToggleGroupItem, { className: 'rounded-none border-e-0', value: "left", onClick: () => setMoveDirection({ x: -5, y: 0 }), children: _jsx(ArrowLeft, {}) }), _jsx(ToggleGroupItem, { className: 'rounded-s-none', value: "right", onClick: () => setMoveDirection({ x: 5, y: 0 }), children: _jsx(ArrowRight, {}) })] }), _jsxs(ToggleGroup, { type: "single", variant: 'outline', value: "", onValueChange: (value) => setScale(pre => pre + parseFloat(value)), children: [_jsx(ToggleGroupItem, { className: "rounded-e-none", value: "0.1", children: _jsx(ZoomIn, {}) }), _jsx(ToggleGroupItem, { className: 'rounded-s-none border-s-0', value: "-0.1", children: _jsx(ZoomOut, {}) })] })] })] })] }), _jsxs("div", { className: "flex flex-row lg:flex-col gap-3 w-full lg:w-48", children: [_jsx("div", { className: 'w-5/5', children: getImagePreview("landscape") }), _jsx("div", { className: 'w-4/5', children: getImagePreview("potrait") }), _jsx("div", { className: 'w-3/5', children: getImagePreview("icon") })] })] })] }) }));
}
export const CropperForm = memo(CropperFormComponent);
