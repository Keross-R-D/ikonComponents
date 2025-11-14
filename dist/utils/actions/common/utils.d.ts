import { FileinfoProps } from "../../api/file-upload/type";
export declare function getSrcFromBase64String(imgString?: string | null, type?: string): string;
export declare function getResourceUrl(fileInfo: FileinfoProps): Promise<string>;
export declare function downloadResource(fileInfo: FileinfoProps): Promise<void>;
export declare function openFileInNewTab(url: string): Promise<void>;
