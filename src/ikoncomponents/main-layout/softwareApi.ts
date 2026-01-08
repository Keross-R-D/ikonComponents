"use server";
import { getValidAccessToken } from "../../utils/token-management";
export async function getAccessibleSoftwareForUser(
  baseUrl: string,
  platformUrl: string
) {
  const accessToken = await getValidAccessToken(baseUrl, {
    platformUrl,
    isSetToken: true,
  });

  const response = await fetch(`${baseUrl}/platform/software/accessible/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["accessibleSoftwareForUser"] },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
