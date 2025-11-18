"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Check, Clock, FolderCode, Heart, Home, LogOut, Settings } from 'lucide-react';
import { Button } from '../../shadcn/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../shadcn/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { getValidAccessToken } from '../../utils/token-management';
import { clearAllCookieSession } from '../../utils/session/cookieSession';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Link from 'next/link';
export const MainSidebar = ({ baseUrl }) => {
    const user = {
        name: "Username",
        email: "User email",
        role: "Role",
        avatar: ""
    };
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
    React.useEffect(() => {
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
    }, []);
    return (_jsx(TooltipProvider, { delayDuration: 0, children: _jsxs("aside", { className: "fixed left-0 top-0 z-20 h-screen w-12 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 ", children: [_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "default", className: "mb-4 h-8 w-8 rounded-lg p-0", disabled: !selectedAccount, children: _jsx("span", { className: "text-base font-medium text-accent-foreground", children: selectedAccount ? getInitials(selectedAccount.accountName) : '...' }) }) }), _jsxs(DropdownMenuContent, { className: "w-55", side: "right", sideOffset: 8, align: "start", children: [_jsx("div", { className: "px-2 py-1.5 text-xs font-semibold text-foreground", children: "Accounts" }), accounts.map((account) => (_jsxs(DropdownMenuItem, { className: "flex items-center justify-between cursor-pointer", onClick: () => {
                                        setSelectedAccount(account);
                                    }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded bg-primary/10 flex items-center justify-center", children: _jsx("span", { className: "text-xs font-medium text-primary", children: getInitials(account.accountName) }) }), _jsx("span", { className: "text-sm", children: account.accountName })] }), (selectedAccount === null || selectedAccount === void 0 ? void 0 : selectedAccount.accountId) === account.accountId && (_jsx(Check, { className: "h-4 w-4 text-primary" }))] }, account.accountId)))] })] }), _jsx("nav", { className: "flex flex-col gap-2", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-5 w-5', children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/", children: [_jsx(Home, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Home" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Home" })] }, "home") }), _jsx("nav", { className: "flex flex-col gap-2 flex-1", children: softwares.map((software) => {
                        const Icon = FolderCode;
                        return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-5 w-5', children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: software.url, children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: software.softwareName })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: software.softwareName })] }, software.softwareName));
                    }) }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-5 w-5', children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/last-visited", children: [_jsx(Clock, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Last Visited" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Last Visited" })] }, "last-visited"), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-5 w-5', children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/favourites", children: [_jsx(Heart, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Favourites" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Favourites" })] }, "favourites"), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: 'h-5 w-5', children: _jsx(Button, { variant: "ghost", className: "h-10 w-10", asChild: true, children: _jsxs(Link, { href: "/settings", children: [_jsx(Settings, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Settings" })] }) }) }), _jsx(TooltipContent, { side: "right", sideOffset: 5, children: "Settings" })] }, "settings"), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-10 w-10 rounded-full", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name }), _jsx(AvatarFallback, { className: "text-sm font-semibold", children: user.name.split(' ').map(n => n[0]).join('') })] }) }) }), _jsxs(DropdownMenuContent, { className: "w-55 p-0", side: 'right', sideOffset: 8, children: [_jsxs("div", { className: "flex items-start gap-3 p-4 bg-card", children: [_jsxs(Avatar, { className: "h-10 w-10 mt-1", children: [_jsx(AvatarImage, { src: user.avatar, alt: user.name }), _jsx(AvatarFallback, { className: "", children: user.name.split(' ').map(n => n[0]).join('') })] }), _jsxs("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-bold text-foreground blue-dark:text-muted-foreground truncate", children: user.name }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email }), _jsx("p", { className: "text-sm text-muted-foreground font-semibold", children: user.role })] })] }), _jsx(DropdownMenuSeparator, { className: "my-0" }), _jsxs(DropdownMenuItem, { onClick: async () => {
                                        await clearAllCookieSession();
                                        redirect("/login.html");
                                    }, className: "flex items-center gap-2 px-4 py-3 cursor-pointer focus:bg-destructive dark:focus:bg-destructive blue-dark:focus:bg-destructive", children: [_jsx(LogOut, { className: "h-4 w-4 text-foreground" }), _jsx("span", { children: "Log out" })] })] })] })] }) }));
};
