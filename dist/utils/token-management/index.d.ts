interface AccessTokenOptionsProps {
    isNotLogOutWhenExpire?: boolean;
    isSetToken?: boolean;
}
export declare function getValidAccessToken(options?: AccessTokenOptionsProps): Promise<string | null>;
export declare function refreshAccessToken(refreshToken: string, isSetToken?: boolean): Promise<string | null>;
export declare function decodeAccessToken(): Promise<import("jwt-decode").JwtPayload | null>;
export declare function logOut(): Promise<void>;
export {};
