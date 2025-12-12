"use server";
import { cookies } from "next/headers";
const cookiePrefix = "ikoncloud_next_";
export async function setCookieSession(sessionName, data, options) {
    const cookieStore = await cookies();
    cookieStore.set(cookiePrefix + sessionName, data, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
        expires: options === null || options === void 0 ? void 0 : options.expires,
        maxAge: options === null || options === void 0 ? void 0 : options.maxAge,
    });
}
export async function getCookieSession(sessionName) {
    var _a;
    const cookieStore = await cookies();
    const cookie = (_a = cookieStore.get(cookiePrefix + sessionName)) === null || _a === void 0 ? void 0 : _a.value;
    return cookie;
}
export async function clearCookieSession(sessionName) {
    const cookieStore = await cookies();
    cookieStore.delete(cookiePrefix + sessionName);
}
export async function clearAllCookieSession() {
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((cookie) => {
        if (cookie.name.startsWith(cookiePrefix)) {
            cookieStore.delete(cookie.name);
        }
    });
}
