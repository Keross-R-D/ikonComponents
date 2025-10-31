export interface CookieSessionOptionsProps {
    maxAge?: number;
    expires?: Date;
}
export declare function setCookieSession(sessionName: string, data: string, options?: CookieSessionOptionsProps): Promise<void>;
export declare function getCookieSession(sessionName: string): Promise<string | undefined>;
export declare function clearCookieSession(sessionName: string): Promise<void>;
export declare function clearAllCookieSession(): Promise<void>;
