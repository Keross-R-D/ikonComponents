"use server";
import sha512 from "crypto-js/sha512";
import ikonBaseApi from "../../api/ikonBaseApi";
import { revalidateTag } from "next/cache";
export const login = async ({ userName, password }) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "login",
        arguments_: [userName, sha512(password).toString()],
        isTicketRequried: false,
    });
    return result.data;
};
export const resetPassword = async ({ userName }) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "resetPassword",
        arguments_: [userName],
        isTicketRequried: false,
    });
    return result.data;
};
export const generateOTP = async ({ temporaryTicket, otpMedium = "EMAIL", }) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "generateOTP",
        arguments_: [temporaryTicket, otpMedium],
        isTicketRequried: false,
    });
    return result.data;
};
export const validateOTP = async ({ temporaryTicket, otp, }) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "validateOTP",
        arguments_: [temporaryTicket, otp],
        isTicketRequried: false,
    });
    return result.data;
};
export const logout = async () => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "logout",
    });
    return result.data;
};
export const getLoggedInUserProfile = async (isServerApi) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "getLoggedInUserProfile",
        isServerApi,
    });
    return result.data;
};
export const getLoggedInUserProfileDetails = async (isServerApi) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "getLoggedInUserProfileDetails",
        isServerApi,
    });
    return result.data;
};
export const updateUserProfile = async ({ userName, userPassword, userPhone, userEmail, userThumbnail, }) => {
    const result = await ikonBaseApi({
        service: "loginService",
        operation: "updateUserProfile",
        arguments_: [userName, userPassword, userPhone, userEmail, userThumbnail],
    });
    revalidateTag("profile");
    return result.data;
};
