export interface Account {
    accountId: string;
    accountName: string;
    accountConfiguration: any | null;
    accountDeleted: boolean;
    active: boolean;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}
export interface Software {
    softwareId: string;
    softwareName: string;
    url: string;
    icon: string;
    visible: boolean;
    defaultSoftware: boolean;
    order: number;
}
export interface User {
    userId: string;
    userName: string;
    userLogin: string;
    userPhone: string;
    userEmail: string;
    userType: string;
    active: boolean;
    dateOfBirth: string;
    userProfileImage: string;
    userDescription: string;
    userDesignation: string;
    userDeleted: boolean;
}
export interface DecodedAccessToken {
    iss: string;
    jti: string;
    aud: string;
    sub: string;
    typ: string;
    sid: string;
    platformAccess: {
        roles: string[];
    };
    primaryAccountId: string;
    activeAccountId: string;
    userType: string;
    scope: string;
    iat: number;
    exp: number;
}
export declare const MainSidebar: ({ baseUrl }: {
    baseUrl: string;
}) => import("react/jsx-runtime").JSX.Element;
