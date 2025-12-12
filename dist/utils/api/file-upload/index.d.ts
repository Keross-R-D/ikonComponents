import { FileinfoProps } from "./type";
export declare function singleFileUpload(file: File, resourceId?: string): Promise<FileinfoProps>;
export declare function multipleFileUpload(files: File[], resourceId?: string): Promise<FileinfoProps[]>;
export declare function base64FileUpload(base64File: string, resourceName: string, resourceType: string, resourceId?: string): Promise<FileinfoProps>;
export declare function singleUAResourceUpload(file: File, folder: string): Promise<any>;
