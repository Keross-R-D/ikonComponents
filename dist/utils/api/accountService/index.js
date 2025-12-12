"use server";
import ikonBaseApi from "../ikonBaseApi";
export const getAccountTree = async () => {
    const result = await ikonBaseApi({
        service: "accountService",
        operation: "getAccountTree",
    });
    return result.data;
};
export const checkExistingAccount = async ({ accountName, }) => {
    const result = await ikonBaseApi({
        service: "accountService",
        operation: "checkExistingAccount",
        arguments_: [accountName],
    });
    return result.data;
};
export const getFullAccountTree = async () => {
    const result = await ikonBaseApi({
        service: "accountService",
        operation: "getFullAccountTree",
    });
    return result.data;
};
export const getAllInvitedAccountsForUser = async (userId) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "getAllInvitedAccountsForUser",
        arguments_: [userId],
    });
    return result.data;
};
export const acceptAccountInvitationRequest = async ({ userId, requestId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "acceptAccountInvitationRequest",
        arguments_: [userId, requestId],
    });
    return result.data;
};
export const rejectAccountInvitationRequest = async ({ userId, requestId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "rejectAccountInvitationRequest",
        arguments_: [userId, requestId],
    });
    return result.data;
};
export const cancelAccountInvitationRequest = async ({ userId, requestId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "cancelAccountInvitationRequest",
        arguments_: [userId, requestId],
    });
    return result.data;
};
export const deactivateInvitedUserFromAccount = async ({ userId, invitationId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "deactivateInvitedUserFromAccount",
        arguments_: [userId, invitationId],
    });
    return result.data;
};
