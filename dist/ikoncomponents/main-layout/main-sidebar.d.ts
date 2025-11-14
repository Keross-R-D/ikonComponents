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
export declare const MainSidebar: ({ baseUrl }: {
    baseUrl: string;
}) => import("react/jsx-runtime").JSX.Element;
