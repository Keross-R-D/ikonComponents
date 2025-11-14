import React from "react";
import "cropperjs/dist/cropper.css";
export interface CropperImgProps {
    src: string | undefined;
    onCroppedImage: (imageUrl: string) => void;
    aspectRatio: number;
    rotationAngle: number;
    zoomLevel: number;
    moveDirection: {
        x: number;
        y: number;
    };
}
export declare const ImageCropper: React.NamedExoticComponent<CropperImgProps>;
