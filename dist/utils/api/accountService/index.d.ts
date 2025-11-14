import { GetAccountTreeProps } from "./type";
export declare const getAccountTree: () => Promise<GetAccountTreeProps>;
export declare const checkExistingAccount: ({ accountName, }: {
    accountName: string;
}) => Promise<boolean>;
export declare const getFullAccountTree: () => Promise<any>;
export declare const getAllInvitedAccountsForUser: (userId: string) => Promise<any>;
export declare const acceptAccountInvitationRequest: ({ userId, requestId, }: {
    userId: string;
    requestId: string;
}) => Promise<any>;
export declare const rejectAccountInvitationRequest: ({ userId, requestId, }: {
    userId: string;
    requestId: string;
}) => Promise<any>;
export declare const cancelAccountInvitationRequest: ({ userId, requestId, }: {
    userId: string;
    requestId: string;
}) => Promise<any>;
export declare const deactivateInvitedUserFromAccount: ({ userId, invitationId, }: {
    userId: string;
    invitationId: string;
}) => Promise<any>;
