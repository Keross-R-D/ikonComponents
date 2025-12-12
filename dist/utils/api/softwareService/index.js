import ikonBaseApi from "../ikonBaseApi";
export const mapSoftwareName = async ({ softwareName, version, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "mapSoftwareName",
        arguments_: [softwareName, version],
    });
    return result.data;
};
export const createSoftware = async ({ softwareName, softwareDescription, softwareVersion, softwareOwnerAccount, softwareDeveloperAccount, softwareManagerAccount, softwareAccessibility, softwareStatus, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "createSoftware",
        arguments_: [
            softwareName,
            softwareDescription,
            softwareVersion,
            softwareOwnerAccount,
            softwareDeveloperAccount,
            softwareManagerAccount,
            softwareAccessibility,
            softwareStatus,
        ],
    });
    return result.data;
};
export const editSoftware = async ({ softwareId, softwareName, softwareDescription, softwareVersion, softwareDeveloperAccount, softwareManagerAccount, softwareAccessibility, softwareStatus, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "editSoftware",
        arguments_: [
            softwareId,
            softwareName,
            softwareDescription,
            softwareVersion,
            softwareDeveloperAccount,
            softwareManagerAccount,
            softwareAccessibility,
            softwareStatus,
        ],
    });
    return result.data;
};
export const getAccessibleSoftwareForUser = async ({ accountId, userId, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "getAccessibleSoftwareForUser",
        arguments_: [userId, accountId],
    });
    return result.data;
};
export const getAllSubscribedSoftwaresForClient = async ({ accountId }, isServerApi) => {
    const result = await ikonBaseApi({
        service: "softwareSubscriptionService",
        operation: "getAllSubscribedSoftwaresForClient",
        arguments_: [accountId],
        isServerApi: isServerApi,
    });
    return result.data;
};
export const inviteAccountForSoftware = async ({ accountId, softwareId, expirationTime, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "inviteAccountForSoftware",
        arguments_: [accountId, softwareId, expirationTime],
    });
    return result.data;
};
export const getAllSentSoftwareInviteRequests = async ({ accountId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "getAllSentSoftwareInviteRequests",
        arguments_: [accountId],
    });
    return result.data;
};
export const getAllReceivedSoftwareInviteRequests = async ({ accountId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "getAllReceivedSoftwareInviteRequests",
        arguments_: [accountId],
    });
    return result.data;
};
export const getAllSoftwareInvitesV2 = async ({ accountId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "getAllSoftwareInvitesV2",
        arguments_: [accountId],
    });
    return result.data;
};
export const acceptInvitationRequestForSoftware = async ({ requestId, shareKey, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "acceptInvitationRequestForSoftware",
        arguments_: [requestId, shareKey],
    });
    return result.data;
};
export const cancelInvitationRequestForSoftware = async ({ requestId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "cancelInvitationRequestForSoftware",
        arguments_: [requestId],
    });
    return result.data;
};
export const rejectInvitationRequestForSoftware = async ({ requestId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "rejectInvitationRequestForSoftware",
        arguments_: [requestId],
    });
    return result.data;
};
export const activateSoftwareInviteForAccount = async ({ invitationId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "activateSoftwareInviteForAccount",
        arguments_: [invitationId],
    });
    return result.data;
};
export const deactivateSoftwareInviteForAccount = async ({ invitationId, }) => {
    const result = await ikonBaseApi({
        service: "accountInvitationService",
        operation: "deactivateSoftwareInviteForAccount",
        arguments_: [invitationId],
    });
    return result.data;
};
export const getAllPendingInvitationRequestsForUser = async ({ userId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "getAllPendingInvitationRequestsForUser",
        arguments_: [userId],
    });
    return result.data;
};
export const getAllInvitationRequestsSentByAccount = async ({ accountId, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "getAllInvitationRequestsSentByAccount",
        arguments_: [accountId],
    });
    return result.data;
};
export const inviteUserToMyAccount = async ({ accountId, userLogin, }) => {
    const result = await ikonBaseApi({
        service: "userInvitationService",
        operation: "inviteUserToMyAccount",
        arguments_: [accountId, userLogin],
    });
    return result.data;
};
export const getMySoftwares = async ({ accountId }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "getMySoftwares",
        arguments_: [accountId],
    });
    return result.data;
};
export const getMySoftwaresV2 = async ({ accountId, onlyActive = false, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "getMySoftwaresV2",
        arguments_: [accountId, onlyActive],
    });
    return result.data;
};
export const getAvailableSoftwaresForAccount = async ({ accountId, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "getAvailableSoftwaresForAccount",
        arguments_: [accountId],
    });
    return result.data;
};
export const getSoftwareById = async ({ softwareId, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "getSoftwareById",
        arguments_: [softwareId],
    });
    return result.data;
};
export const activateSoftware = async ({ softwareId, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "activateSoftware",
        arguments_: [softwareId],
    });
    return result.data;
};
export const deactivateSoftware = async ({ softwareId, }) => {
    const result = await ikonBaseApi({
        service: "softwareService",
        operation: "deactivateSoftware",
        arguments_: [softwareId],
    });
    return result.data;
};
export const requestForFinalSubscription = async ({ accountId, userId, softwareId, suggestedDate = null, }) => {
    const result = await ikonBaseApi({
        service: "requestService",
        operation: "requestForFinalSubscription",
        arguments_: [accountId, userId, softwareId, suggestedDate],
    });
    return result.data;
};
