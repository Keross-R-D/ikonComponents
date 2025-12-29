"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Check, CircleUserRound, FolderCode, Home, LogOut, Settings } from 'lucide-react';
import { Button } from '../../shadcn/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../shadcn/dropdown-menu';
import { getValidAccessToken } from '../../utils/token-management';
import { clearAllCookieSession } from '../../utils/session/cookieSession';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from "jwt-decode";
import { Icon } from '../icon';
export const MainSidebar = ({ baseUrl }) => {
    const [user, setUser] = React.useState();
    const [accounts, setAccounts] = React.useState([]);
    const [selectedAccount, setSelectedAccount] = React.useState();
    const [softwares, setSoftwares] = React.useState([]);
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    function toPascalCase(icon) {
        return icon
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
    }
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = await getValidAccessToken();
                const decoded = jwtDecode(accessToken !== null && accessToken !== void 0 ? accessToken : '');
                const response = await axios.get(`${baseUrl}/platform/user/${decoded.sub}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUser(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        const fetchAccounts = async () => {
            try {
                const accessToken = await getValidAccessToken();
                const response = await axios.get(`${baseUrl}/platform/account/all`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setAccounts(response.data);
                setSelectedAccount(response.data[0]);
            }
            catch (error) {
                console.error(error);
            }
        };
        const fetchSubscribedSoftwares = async () => {
            try {
                const accessToken = await getValidAccessToken();
                const response = await axios.get(`${baseUrl}/platform/software/accessible/user`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSoftwares(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchAccounts();
        fetchSubscribedSoftwares();
        fetchUser();
    }, []);
    return (_jsx(TooltipProvider, { delayDuration: 0, children: _jsxs("aside", { className: "fixed left-0 top-0 z-20 h-screen w-12 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 ", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "default", className: "mb-4 h-8 w-8 rounded-lg p-0", disabled: !selectedAccount, children: _jsx("span", { className: "text-base font-medium text-accent-foreground", children: selectedAccount ? getInitials(selectedAccount.accountName) : '...' }) }) }), _jsxs(DropdownMenuContent, { className: "w-55", side: "right", sideOffset: 8, align: "start", children: [_jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-foreground", children: "Accounts" }), accounts.map((account) => (_jsxs(DropdownMenuItem, { className: "flex items-center justify-between cursor-pointer", onClick: () => {
                                        setSelectedAccount(account);
                                    }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded bg-primary/10 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-primary", children: getInitials(account.accountName) }) }), _jsx("span", { className: "text-sm", children: account.accountName })] }), (selectedAccount === null || selectedAccount === void 0 ? void 0 : selectedAccount.accountId) === account.accountId && (_jsx(Check, { className: "h-4 w-4 text-primary" }))] }, account.accountId)))] })] }), _jsx("nav", { className: "flex flex-col gap-1", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-8 w-8', children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/home", children: [_jsx(Home, { className: "h-8 w-8" }), _jsx("span", { className: "sr-only", children: "Home" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Home" })] }, "home") }), _jsx("nav", { className: "flex flex-col gap-1 flex-1", children: softwares.map((software) => {
                        var _a, _b;
                        const hasIcon = Boolean(software.icon && software.icon.trim() !== "");
                        return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: "h-8 w-8", children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: (_a = software.url) !== null && _a !== void 0 ? _a : "#", children: [hasIcon ? (_jsx(Icon, { name: toPascalCase((_b = software.icon) !== null && _b !== void 0 ? _b : ''), className: "h-8 w-8" })) : (_jsx(FolderCode, { className: "h-8 w-8" })), _jsx("span", { className: "sr-only", children: software.softwareName })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: software.softwareName })] }, software.softwareName));
                    }) }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-8 w-8', children: _jsx(Button, { variant: "ghost", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/settings", children: [_jsx(Settings, { className: "h-8 w-8" }), _jsx("span", { className: "sr-only", children: "Settings" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Settings" })] }, "settings"), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", children: _jsx(CircleUserRound, { className: "h-8 w-8" }) }) }), _jsxs(DropdownMenuContent, { className: "w-55 p-0", side: 'right', sideOffset: 8, children: [_jsxs("div", { className: "flex items-start gap-3 p-4 bg-card", children: [_jsx(CircleUserRound, { className: "h-8 w-8" }), _jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-bold text-foreground blue-dark:text-muted-foreground truncate", children: user === null || user === void 0 ? void 0 : user.userName }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: user === null || user === void 0 ? void 0 : user.userEmail }), _jsx("p", { className: "text-sm text-muted-foreground font-semibold", children: selectedAccount === null || selectedAccount === void 0 ? void 0 : selectedAccount.accountName })] })] }), _jsx(DropdownMenuSeparator, { className: "my-0" }), _jsxs(DropdownMenuItem, { onClick: async () => {
                                        await clearAllCookieSession();
                                        redirect("/login.html");
                                    }, className: "flex items-center gap-2 px-4 py-3 cursor-pointer focus:bg-destructive dark:focus:bg-destructive blue-dark:focus:bg-destructive", children: [_jsx(LogOut, { className: "h-4 w-4 text-foreground" }), _jsx("span", { children: "Log out" })] })] })] })] }) }));
};
