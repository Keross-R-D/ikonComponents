interface IkonBaseApiProps {
    service: string;
    operation: string;
    arguments_?: any | null;
    accountId?: string | null;
    softwareId?: string | null;
    isTicketRequried?: boolean;
    isServerApi?: boolean;
}
export declare const axiosInstance: import("axios").AxiosInstance;
declare function ikonBaseApi({ service, operation, arguments_, accountId, softwareId, isTicketRequried, isServerApi }: IkonBaseApiProps): Promise<any>;
export default ikonBaseApi;
