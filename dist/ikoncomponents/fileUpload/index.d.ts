export interface FileUploaderProps {
    label?: string;
    isDrag?: boolean;
    onFileSelect: (fileObj: any) => Promise<any> | void;
}
export declare const convertFileToObject: (file: File) => Promise<{
    message: string;
    fileName: string;
    size: number;
    type: string;
    lastModified: number;
    base64: string;
}>;
export declare function FileUploader({ label, isDrag, onFileSelect, }: FileUploaderProps): import("react/jsx-runtime").JSX.Element;
export declare function getImageFromObject(obj: any): string;
