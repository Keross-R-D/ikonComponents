import { ForgotPasswordProps, GetLoggedInUserProfileDetailsReturnProps, GetLoggedInUserProfileReturnProps, LoginProps, UpdateUserProfileProps, ValidateOTPProps } from "./type";
export declare const login: ({ userName, password }: LoginProps) => Promise<any>;
export declare const resetPassword: ({ userName }: ForgotPasswordProps) => Promise<any>;
export declare const generateOTP: ({ temporaryTicket, otpMedium, }: {
    temporaryTicket: string;
    otpMedium?: string;
}) => Promise<any>;
export declare const validateOTP: ({ temporaryTicket, otp, }: ValidateOTPProps) => Promise<any>;
export declare const logout: () => Promise<any>;
export declare const getLoggedInUserProfile: (isServerApi?: boolean) => Promise<GetLoggedInUserProfileReturnProps>;
export declare const getLoggedInUserProfileDetails: (isServerApi?: boolean) => Promise<GetLoggedInUserProfileDetailsReturnProps>;
export declare const updateUserProfile: ({ userName, userPassword, userPhone, userEmail, userThumbnail, }: UpdateUserProfileProps) => Promise<any>;
