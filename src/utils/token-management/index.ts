"use server";
import { redirect } from "next/navigation";
import {
  clearAllCookieSession,
  getCookieSession,
  setCookieSession,
} from "../session/cookieSession";
import { TokenResponse } from "./types";
import { jwtDecode } from "jwt-decode";

interface AccessTokenOptionsProps {
  isNotLogOutWhenExpire?: boolean;
  isSetToken?: boolean;
}

// Prevent multiple refresh calls at once
let refreshPromise: Promise<string | null> | null = null;

export async function getValidAccessToken(
   baseUrl: string,
  options?: AccessTokenOptionsProps
): Promise<string | null> {
  const accessToken = await getCookieSession("accessToken");

  console.log("Access Token....:");
  const refreshToken = await getCookieSession("refreshToken");

  console.log("Refresh Token...");

  console.log(
    "Before Return Access Token:..............................................."
  );
  if (accessToken) return accessToken;

  console.log(
    "After Return Access Token:..............................................."
  );

  if (refreshToken) {
    console.log("Refreshing access token using refresh token...", refreshToken);
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken(refreshToken, baseUrl,true);
      refreshPromise.finally(() => (refreshPromise = null));
    }
    return await refreshPromise;
  }

  if (!options?.isNotLogOutWhenExpire) {
    await logOut();
  }

  return null;
}

export async function refreshAccessToken(
  refreshToken: string,
  baseUrl:string,
  isSetToken?: boolean
): Promise<string | null> {
  try {
    console.log("Refreshing access token...");

    const response = await fetch(
      `${baseUrl}/platform/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    console.log("Refresh Token API Response:", response.status);

    if (!response.ok) return null;

    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn,
      refreshExpiresIn,
    }: TokenResponse = await response.json();

    //  Always set new access token
    await setCookieSession("accessToken", accessToken, {
      maxAge: expiresIn,
    });

    //  IMPORTANT: Save the rotated refresh token
    if (newRefreshToken) {
      await setCookieSession("refreshToken", newRefreshToken, {
        maxAge: refreshExpiresIn,
      });
      console.log("Refresh token rotated & updated.");
    }

    console.log(" Access token refreshed successfully.");
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
}

export async function decodeAccessToken( baseUrl: string,) {
  const accessToken = await getValidAccessToken(baseUrl);
  return accessToken ? jwtDecode(accessToken) : null;
}

export async function logOut() {
  await clearAllCookieSession();
  console.log("Logging out...");
  redirect("/login.html");
}
