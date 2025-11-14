"use server";
import { cache } from "react";
import { getAccountTree } from "../../api/accountService";
import { getCookieSession, setCookieSession } from "../../session/cookieSession";
export const getAccount = cache(async () => {
    return await getAccountTree();
});
export const getActiveAccountId = async () => {
    const activeAccountId = await getCookieSession("activeAccountId");
    return activeAccountId || "";
};
export const getOrSetActiveAccountId = async () => {
    let activeAccountId = await getCookieSession("activeAccountId");
    if (!activeAccountId) {
        try {
            const account = await getAccount();
            activeAccountId = account.ACCOUNT_ID;
            await setActiveAccountId(activeAccountId);
        }
        catch (error) {
            console.error(error);
        }
    }
    return activeAccountId || "";
};
export const setActiveAccountId = async (accountId) => {
    await setCookieSession("activeAccountId", accountId);
};
