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
    softwareVersion: string;
    softwareDescription: string;
    accountId: string;
    purchaseDate: string;
    softwareOwnerId: string;
    expiresOn: string | null;
    active: boolean;
    requestStatus: string | null;
    softwareVisibility: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
}
export declare const MainSidebar: ({ baseUrl }: {
    baseUrl: string;
}) => import("react/jsx-runtime").JSX.Element;
