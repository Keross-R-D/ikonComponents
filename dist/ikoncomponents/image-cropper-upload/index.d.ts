import { ReactNode } from 'react';
import { CropperUploadImagesInfoProps } from './utils';
export interface ImageCropperContextProps {
    originalImage: OriginalImageProps;
    setOriginalImage: (originalImage: OriginalImageProps) => void;
    aspectRatioWiseImages: AspectRatioWiseImagesProps;
    setAspectRatioWiseImages: (aspectRatioWiseImages: AspectRatioWiseImagesProps) => void;
}
export interface AspectRatioWiseImagesProps {
    landscape: string | null;
    potrait: string | null;
    icon: string | null;
}
export interface OriginalImageProps {
    image: string | File | null;
    name?: string;
    description?: string;
}
export interface ImageCropperProps {
    children: ReactNode;
    uploadedImages: CropperUploadImagesInfoProps | null;
    onCropperChange: (originalImage: OriginalImageProps, aspectRatioWiseImages: AspectRatioWiseImagesProps) => void;
    modalOpen?: boolean;
    onModalOpenChange?: (open: boolean) => void;
}
export declare function ImageCropperProvider({ children, uploadedImages, onCropperChange, modalOpen, onModalOpenChange }: ImageCropperProps): import("react/jsx-runtime").JSX.Element;
export declare const useImageCropper: () => ImageCropperContextProps;
