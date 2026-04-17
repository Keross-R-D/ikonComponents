import { getValidAccessToken } from "@/utils/token-management";



const IKON_BASE_API_URL = "https://ikoncloud-dev.keross.com/ikon-api";


export const uploadFilePublic = async (file: File) => {
  const accessToken = await getValidAccessToken(IKON_BASE_API_URL || "");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${IKON_BASE_API_URL}/platform/file-resource/upload/public`,
    {
      method: "POST",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  const data = await response.json();
  if (data.files && data.files.length > 0) {
    //just return the 1st resourceId
    return data;
  }
  throw new Error("No files returned from upload");
};

export const fetchImagePreview = async (resourceId: string) => {
  const accessToken = await getValidAccessToken(IKON_BASE_API_URL || "");

  const response = await fetch(
    `${IKON_BASE_API_URL}/platform/file-resource/download/public/${resourceId}`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) throw new Error("Failed to load image");

  // Convert binary response to a temporary URL
  const imageBlob = await response.blob();
  return URL.createObjectURL(imageBlob);
};

export const fileUpload = async (
  fileObjArray: Array<{ fileName: string; type: string; base64: string }>,
) => {
  try {
    const accessToken = await getValidAccessToken(
      process.env.IKON_API_URL || "",
    );
    console.log("Uploading files:", fileObjArray);

    const response = await fetch(
      `${process.env.SALES_CRM_API_URL}/api/upload-base64`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ files: fileObjArray }), // send array
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Server response:", data);

    return data;
  } catch (err) {
    console.error("File upload error:", err);
    throw err;
  }
};

