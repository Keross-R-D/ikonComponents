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

export const downloadFileByResourceId = async (resourceId: string) => {
  const accessToken = await getValidAccessToken(IKON_BASE_API_URL || "");

  const response = await fetch(
    `${IKON_BASE_API_URL}/platform/file-resource/download/public/${resourceId}`,
    {
      method: "GET",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  
  const blob = await response.blob();


  const contentDisposition = response.headers.get("Content-Disposition");

  let fileName = "downloaded-file";
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match) fileName = match[1];
  }

 
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName; 
  document.body.appendChild(a);
  a.click();

  // cleanup
  a.remove();
  window.URL.revokeObjectURL(url);
};

export const fetchFileAsBase64 = async (resourceId: string) => {
  const accessToken = await getValidAccessToken(IKON_BASE_API_URL || "");

  const response = await fetch(
    `${IKON_BASE_API_URL}/platform/file-resource/download/public/${resourceId}`,
    {
      method: "GET",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch file");
  }

  const blob = await response.blob();

  // ✅ Convert blob → base64
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      const base64String = result.split(",")[1]; // remove data:*/*;base64,
      resolve(base64String);
    };

    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  // ✅ Extract filename (if available)
  const contentDisposition = response.headers.get("Content-Disposition");

  let fileName = "unknown";
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="(.+)"/);
    if (match) fileName = match[1];
  }

  return {
    base64,
    fileSize: blob.size,
    fileType: blob.type,
  };
};