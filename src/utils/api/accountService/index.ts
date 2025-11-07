"use server";
import ikonBaseApi from "../ikonBaseApi";
import { GetAccountTreeProps } from "./type";

export const getAccountTree = async (): Promise<GetAccountTreeProps> => {
  const result = await ikonBaseApi({
    service: "accountService",
    operation: "getAccountTree",
  });
  return result.data;
};

export const checkExistingAccount = async ({
  accountName,
}: {
  accountName: string;
}): Promise<boolean> => {
  const result = await ikonBaseApi({
    service: "accountService",
    operation: "checkExistingAccount",
    arguments_: [accountName],
  });
  return result.data;
};

export const getFullAccountTree = async (): Promise<any> => {
  const result = await ikonBaseApi({
    service: "accountService",
    operation: "getFullAccountTree",
  });
  return result.data;
};

export const getAllInvitedAccountsForUser = async (
  userId: string
): Promise<any> => {
  const result = await ikonBaseApi({
    service: "userInvitationService",
    operation: "getAllInvitedAccountsForUser",
    arguments_: [userId],
  });
  return result.data;
};

export const acceptAccountInvitationRequest = async ({
  userId,
  requestId,
}: {
  userId: string;
  requestId: string;
}): Promise<any> => {
  const result = await ikonBaseApi({
    service: "userInvitationService",
    operation: "acceptAccountInvitationRequest",
    arguments_: [userId, requestId],
  });
  return result.data;
};

export const rejectAccountInvitationRequest = async ({
  userId,
  requestId,
}: {
  userId: string;
  requestId: string;
}): Promise<any> => {
  const result = await ikonBaseApi({
    service: "userInvitationService",
    operation: "rejectAccountInvitationRequest",
    arguments_: [userId, requestId],
  });
  return result.data;
};

export const cancelAccountInvitationRequest = async ({
  userId,
  requestId,
}: {
  userId: string;
  requestId: string;
}): Promise<any> => {
  const result = await ikonBaseApi({
    service: "userInvitationService",
    operation: "cancelAccountInvitationRequest",
    arguments_: [userId, requestId],
  });
  return result.data;
};

export const deactivateInvitedUserFromAccount = async ({
  userId,
  invitationId,
}: {
  userId: string;
  invitationId: string;
}): Promise<any> => {
  const result = await ikonBaseApi({
    service: "userInvitationService",
    operation: "deactivateInvitedUserFromAccount",
    arguments_: [userId, invitationId],
  });
  return result.data;
};
