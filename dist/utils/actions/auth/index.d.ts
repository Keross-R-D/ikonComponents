import { GetLoggedInUserProfileDetailsReturnProps, GetLoggedInUserProfileReturnProps } from "../../api/loginService/type";
export declare const setTicket: (ticket: string) => Promise<void>;
export declare const getTicket: () => Promise<string | undefined>;
export declare const getProfileData: () => Promise<GetLoggedInUserProfileReturnProps & GetLoggedInUserProfileDetailsReturnProps>;
export declare function signOut(): Promise<void>;
export declare const getCurrentUserId: () => Promise<string>;
export declare const setCurrentUserId: (userId: string) => Promise<void>;
