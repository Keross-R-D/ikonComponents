"use server";
import { axiosInstance } from "../ikonBaseApi";
import { v4 } from "uuid";
import { getTicket } from "../../actions/auth";
export async function singleFileUpload(file, resourceId) {
    const formData = new FormData();
    formData.append("file", file);
    const fileInfo = {};
    fileInfo["resourceId"] = resourceId || v4();
    fileInfo["resourceName"] = file.name;
    fileInfo["resourceSize"] = file.size;
    fileInfo["resourceType"] = file.type;
    const globalTicket = (await getTicket()) || "";
    const queryParams = new URLSearchParams({
        ticket: globalTicket,
        resourceId: fileInfo["resourceId"],
    });
    try {
        const result = await axiosInstance({
            method: "POST",
            url: `https://ikoncloud-dev.keross.com/ikon-api/upload?${queryParams.toString()}`,
            data: formData,
            responseType: "json",
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("File upload result:", result);
    }
    catch (error) {
        throw error;
    }
    return fileInfo;
}
export async function multipleFileUpload(files, resourceId) {
    const fileInfos = [];
    for (const file of files) {
        const fileInfo = await singleFileUpload(file, resourceId);
        fileInfos.push(fileInfo);
    }
    return fileInfos;
}
export async function base64FileUpload(base64File, resourceName, resourceType, resourceId) {
    const base64 = base64File.split(",")[1];
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: resourceType });
    const file = new File([blob], resourceName, { type: resourceType });
    return await singleFileUpload(file, resourceId);
}
export async function singleUAResourceUpload(file, folder) {
    const formData = new FormData();
    formData.append("file", file);
    const fileInfo = {};
    fileInfo["folder"] = folder || "ikon";
    fileInfo["resourceName"] = file.name;
    fileInfo["resourceSize"] = file.size;
    fileInfo["resourceType"] = file.type;
    const globalTicket = (await getTicket()) || "";
    const queryParams = new URLSearchParams({
        ticket: globalTicket,
        folder: fileInfo["folder"],
    });
    try {
        const result = await axiosInstance({
            method: "POST",
            url: `https://ikoncloud-dev.keross.com/ikon-api//uaresourceupload?${queryParams.toString()}`,
            data: formData,
            responseType: "json",
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("File upload result:", result);
    }
    catch (error) {
        throw error;
    }
    return fileInfo;
}
