import { CreateSoftwareProps, EditSoftwareProps, getAccessibleSoftwareForUserProps, getAllSubscribedSoftwaresForClientProps, getAvailableSoftwaresForAccountProps, getMySoftwaresProps, getMySoftwaresV2Props, mapSoftwareNameProps } from "./type";
export declare const mapSoftwareName: ({ softwareName, version, }: mapSoftwareNameProps) => Promise<string>;
export declare const createSoftware: ({ softwareName, softwareDescription, softwareVersion, softwareOwnerAccount, softwareDeveloperAccount, softwareManagerAccount, softwareAccessibility, softwareStatus, }: CreateSoftwareProps) => Promise<string>;
export declare const editSoftware: ({ softwareId, softwareName, softwareDescription, softwareVersion, softwareDeveloperAccount, softwareManagerAccount, softwareAccessibility, softwareStatus, }: EditSoftwareProps) => Promise<string>;
export declare const getAccessibleSoftwareForUser: ({ accountId, userId, }: getAccessibleSoftwareForUserProps) => Promise<any>;
export declare const getAllSubscribedSoftwaresForClient: ({ accountId }: getAllSubscribedSoftwaresForClientProps, isServerApi?: boolean) => Promise<any>;
export declare const inviteAccountForSoftware: ({ accountId, softwareId, expirationTime, }: {
    accountId: string;
    softwareId: string;
    expirationTime?: number | string;
}) => Promise<any>;
export declare const getAllSentSoftwareInviteRequests: ({ accountId, }: {
    accountId: string;
}) => Promise<any>;
export declare const getAllReceivedSoftwareInviteRequests: ({ accountId, }: {
    accountId: string;
}) => Promise<any>;
export declare const getAllSoftwareInvitesV2: ({ accountId, }: {
    accountId: string;
}) => Promise<any>;
export declare const acceptInvitationRequestForSoftware: ({ requestId, shareKey, }: {
    requestId: string;
    shareKey: string;
}) => Promise<any>;
export declare const cancelInvitationRequestForSoftware: ({ requestId, }: {
    requestId: string;
}) => Promise<any>;
export declare const rejectInvitationRequestForSoftware: ({ requestId, }: {
    requestId: string;
}) => Promise<any>;
export declare const activateSoftwareInviteForAccount: ({ invitationId, }: {
    invitationId: string;
}) => Promise<any>;
export declare const deactivateSoftwareInviteForAccount: ({ invitationId, }: {
    invitationId: string;
}) => Promise<any>;
export declare const getAllPendingInvitationRequestsForUser: ({ userId, }: {
    userId: string;
}) => Promise<any>;
export declare const getAllInvitationRequestsSentByAccount: ({ accountId, }: {
    accountId: string;
}) => Promise<any>;
export declare const inviteUserToMyAccount: ({ accountId, userLogin, }: {
    accountId: string;
    userLogin: string;
}) => Promise<any>;
export declare const getMySoftwares: ({ accountId }: getMySoftwaresProps) => Promise<any>;
export declare const getMySoftwaresV2: ({ accountId, onlyActive, }: getMySoftwaresV2Props) => Promise<any>;
export declare const getAvailableSoftwaresForAccount: ({ accountId, }: getAvailableSoftwaresForAccountProps) => Promise<any>;
export declare const getSoftwareById: ({ softwareId, }: {
    softwareId: string;
}) => Promise<any>;
export declare const activateSoftware: ({ softwareId, }: {
    softwareId: string;
}) => Promise<any>;
export declare const deactivateSoftware: ({ softwareId, }: {
    softwareId: string;
}) => Promise<any>;
export declare const requestForFinalSubscription: ({ accountId, userId, softwareId, suggestedDate, }: {
    accountId: string;
    userId: string;
    softwareId: string;
    suggestedDate?: string | null;
}) => Promise<any>;
