import { getTicket } from "../auth";
export function getSrcFromBase64String(imgString, type) {
    return imgString ? `data:${type || "image/webp"};base64,${imgString}` : "";
}
export async function getResourceUrl(fileInfo) {
    const globalTicket = await getTicket();
    return "https://ikoncloud-dev.keross.com/ikon-api/download" + "?ticket=" + globalTicket + "&resourceId=" + fileInfo.resourceId + "&resourceName=" + fileInfo.resourceName + "&resourceType=" + fileInfo.resourceType;
}
export async function downloadResource(fileInfo) {
    const resourceUrl = await getResourceUrl(fileInfo);
    window.open(encodeURI(resourceUrl));
}
export async function openFileInNewTab(url) {
    const encodedLink = encodeURI(url);
    try {
        const response = await fetch(encodedLink);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
    }
    catch (err) {
        console.error('Failed to open file in new tab:', err);
    }
}
;
