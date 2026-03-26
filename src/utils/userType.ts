export interface UserData {
    userId: string;
    userName: string;
    userLogin: string;
    password: string;
    userPhone?: string;
    userEmail: string;
    userThumbnail?: string | null;
    userType?: string;
    active?: boolean;
    accountId?: string;
    userDeleted?: boolean;
}
