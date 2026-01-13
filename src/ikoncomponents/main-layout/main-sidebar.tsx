"use client";

import * as React from "react";
import {
  Check,
  CircleUserRound,
  Clock,
  FolderCode,
  Heart,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "../../shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu";

import { getValidAccessToken } from "../../utils/token-management";
import { clearAllCookieSession, setCookieSession } from "../../utils/session/cookieSession";
import axios from "axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { Icon } from "../icon";
import { useRefresh } from "./RefreshContext";

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

export interface User {
  userId: string;
  userName: string;
  userLogin: string;
  userPhone: string;
  userEmail: string;
  userType: string;
  active: boolean;
  dateOfBirth: string;
  userProfileImage: string;
  userDescription: string;
  userDesignation: string;
  userDeleted: boolean;
}

export interface DecodedAccessToken {
  iss: string;
  jti: string;
  aud: string;
  sub: string;
  typ: string;
  sid: string;
  platformAccess: {
    roles: string[];
  };
  primaryAccountId: string;
  activeAccountId: string;
  userType: string;
  scope: string;
  iat: number;
  exp: number;
}

export const MainSidebar = ({
  baseUrl,
  platformUrl,
}: {
  baseUrl: string;
  platformUrl: string;
}) => {
  const [user, setUser] = React.useState<User>();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<
    Account | undefined
  >();
  const [softwares, setSoftwares] = React.useState<Software[]>([]);
  const { refreshCounter } = useRefresh();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  function toPascalCase(icon: string) {
    return icon
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  // Fetch all data
  React.useEffect(() => {
    const fetchAllData = async () => {
      try {
        const accessToken = await getValidAccessToken(baseUrl, {
          platformUrl,
          isSetToken: true,
        });

        const decoded = jwtDecode<DecodedAccessToken>(accessToken ?? "");

        // Fetch all data in parallel
        const [userResponse, accountsResponse, softwaresResponse] =
          await Promise.all([
            axios.get(`${baseUrl}/platform/user/${decoded.sub}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get(`${baseUrl}/platform/user/account-membership`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get(`${baseUrl}/platform/software/accessible/user`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            }),
          ]);

        setUser(userResponse.data);
        setAccounts(accountsResponse.data);

        // const primaryAccount = accountsResponse.data.find(
        //   (account) => account.primaryAccount === true
        // );

        // if (primaryAccount) {
        //   setSelectedAccount(primaryAccount);
        // }

        const activeAccount = accountsResponse.data.find(
          (account) => account.accountId === decoded.activeAccountId
        );

        setSelectedAccount(activeAccount);

        const visibleSoftwares = softwaresResponse.data.filter(
          (item: { visible: boolean }) => item.visible
        );
        setSoftwares(visibleSoftwares);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAllData();
  }, [baseUrl, platformUrl, refreshCounter]);

  const switchAccount = async (accountId: string, baseUrl: string) => {
    try {
      const accessToken = await getValidAccessToken(baseUrl, {
        platformUrl: platformUrl,
        isSetToken: true,
      });
      const response = await axios.post(
        `${baseUrl}/platform/auth/switch-account`,
        {
          targetAccountId: accountId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      await setCookieSession("accessToken", response.data.accessToken);
      await setCookieSession("refreshToken", response.data.refreshToken);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-20 h-screen w-12 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 ">
        {/* Account */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="mb-4 h-8 w-8 rounded-lg p-0"
              disabled={!selectedAccount}
            >
              <span className="text-base font-medium text-accent-foreground">
                {selectedAccount
                  ? getInitials(selectedAccount.accountName)
                  : "..."}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-55"
            side="right"
            sideOffset={8}
            align="start"
          >
            <div className="px-2 py-1.5 text-xs font-semibold text-foreground">
              Accounts
            </div>
            {accounts.map((account) => (
              <DropdownMenuItem
                key={account.accountId}
                className="flex items-center justify-between cursor-pointer"
                onClick={async () => {
                  try {
                    setSelectedAccount(account);
                    console.log(account.accountId);

                    await switchAccount(account.accountId, baseUrl);

                    window.location.reload();
                  } catch (error) {
                    console.error("Switch account failed", error);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {getInitials(account.accountName)}
                    </span>
                  </div>
                  <span className="text-sm">{account.accountName}</span>
                </div>

                {selectedAccount?.accountId === account.accountId && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Softwares */}
        <nav className="flex flex-col gap-1">
          <Tooltip key={"home"}>
            <TooltipTrigger asChild className="h-8 w-8">
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <Link href={`${platformUrl}/home`}>
                  <Home className="h-8 w-8" />
                  <span className="sr-only">Home</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Home
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="flex flex-col gap-1 flex-1">
          {softwares.map((software) => {
            const hasIcon = Boolean(
              software.icon && software.icon.trim() !== ""
            );

            return (
              <Tooltip key={software.softwareName}>
                <TooltipTrigger asChild className="h-8 w-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    asChild
                  >
                    <Link href={software.url ?? "#"}>
                      {hasIcon ? (
                        <Icon
                          name={toPascalCase(software.icon ?? "")}
                          className="h-8 w-8"
                        />
                      ) : (
                        <FolderCode className="h-8 w-8" />
                      )}

                      <span className="sr-only">{software.softwareName}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="right" sideOffset={5}>
                  {software.softwareName}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Settings */}
        <Tooltip key="settings">
          <TooltipTrigger asChild className="h-8 w-8">
            <Button variant="ghost" className="h-10 w-10" asChild>
              <Link href={`${platformUrl}/settings`}>
                <Settings className="h-8 w-8" />
                <span className="sr-only">Settings</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <CircleUserRound className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-55 p-0"
            side={"right"}
            sideOffset={8}
          >
            <div className="flex items-start gap-3 p-4 bg-card">
              <CircleUserRound className="h-8 w-8" />
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground blue-dark:text-muted-foreground truncate">
                  {user?.userName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.userEmail}
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                  {selectedAccount?.accountName}
                </p>
              </div>
            </div>

            <DropdownMenuSeparator className="my-0" />

            <DropdownMenuItem
              onClick={async () => {
                await clearAllCookieSession();
                redirect(`${platformUrl}/login.html`);
              }}
              className="flex items-center gap-2 px-4 py-3 cursor-pointer focus:bg-destructive dark:focus:bg-destructive blue-dark:focus:bg-destructive"
            >
              <LogOut className="h-4 w-4 text-foreground" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
    </TooltipProvider>
  );
};
