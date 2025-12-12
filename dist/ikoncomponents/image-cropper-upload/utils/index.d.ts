import { AspectRatioWiseImagesProps, OriginalImageProps } from "..";
import { FileinfoProps } from "../../../utils/api/file-upload/type";
export interface CropperUploadImagesInfoProps {
    originalImageInfo?: FileinfoProps | null;
    imageName?: string;
    imageDescription?: string;
    landscapeImageInfo?: FileinfoProps | null;
    portaitImageInfo?: FileinfoProps | null;
    iconImageInfo?: FileinfoProps | null;
}
export interface UploadedImagesToCropperImgObjProps {
    originalImage: OriginalImageProps;
    aspectRatioWiseImages: AspectRatioWiseImagesProps;
}
export declare function imageCropperFilesUpload(originalImage: OriginalImageProps, aspectRatioWiseImages?: AspectRatioWiseImagesProps, resourceId?: string): Promise<CropperUploadImagesInfoProps | null>;
export declare function uploadedImagesToCropperImgObj(uploadedImages: CropperUploadImagesInfoProps | null): Promise<UploadedImagesToCropperImgObjProps | null>;
