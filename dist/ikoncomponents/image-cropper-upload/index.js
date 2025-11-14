"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { CropperFormWithModal } from './cropper-form-with-modal';
import { uploadedImagesToCropperImgObj } from './utils';
const ImageCropperContext = createContext(undefined);
export function ImageCropperProvider({ children, uploadedImages, onCropperChange, modalOpen, onModalOpenChange }) {
    const [aspectRatioWiseImages, setAspectRatioWiseImages] = useState({
        landscape: null,
        potrait: null,
        icon: null
    });
    const [originalImage, setOriginalImage] = useState({
        image: null,
        name: "",
        description: "",
    });
    useEffect(() => {
        async function updateCropperImages() {
            if (!uploadedImages)
                return; // Prevent unnecessary processing
            try {
                const res = await uploadedImagesToCropperImgObj(uploadedImages);
                if (res) {
                    // Check if state is different before updating
                    setOriginalImage((prev) => JSON.stringify(prev) === JSON.stringify(res.originalImage) ? prev : res.originalImage);
                    setAspectRatioWiseImages((prev) => JSON.stringify(prev) === JSON.stringify(res.aspectRatioWiseImages) ? prev : res.aspectRatioWiseImages);
                }
            }
            catch (error) {
                console.error("Error processing uploaded images:", error);
            }
        }
        updateCropperImages();
    }, [uploadedImages]); // Runs only when `uploadedImages` changes
    return (_jsxs(ImageCropperContext.Provider, { value: {
            originalImage,
            setOriginalImage,
            aspectRatioWiseImages,
            setAspectRatioWiseImages
        }, children: [children, modalOpen && onModalOpenChange && _jsx(CropperFormWithModal, { open: modalOpen, onOpenChange: onModalOpenChange, onCropperChange: onCropperChange })] }));
}
export const useImageCropper = () => {
    const context = useContext(ImageCropperContext);
    if (!context) {
        throw new Error("useImageCropper must be used within a ImageCropperProvider");
    }
    return context;
};
