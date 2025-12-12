import React from "react";
import "cropperjs/dist/cropper.css";
export interface CropperImgProps {
    imageSrc: string | undefined;
    onCroppedImage: (imageUrl: string) => void;
    aspectRatio: number;
    rotationAngle: number;
    zoomLevel: number;
    moveDirection: {
        x: number;
        y: number;
    };
    currentState: string;
}
export declare const NewCropperImg: React.FC<CropperImgProps>;
