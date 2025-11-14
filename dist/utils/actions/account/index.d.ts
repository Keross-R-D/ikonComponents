import { AccountTreeProps } from "./type";
export declare const getAccount: () => Promise<AccountTreeProps>;
export declare const getActiveAccountId: () => Promise<string>;
export declare const getOrSetActiveAccountId: () => Promise<string>;
export declare const setActiveAccountId: (accountId: string) => Promise<void>;
