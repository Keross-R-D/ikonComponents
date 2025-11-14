"use client"

import * as React from 'react';
import { Check, Clock, FolderCode, Heart, Home, LogOut, Settings } from 'lucide-react';
import { Button } from '../../shadcn/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shadcn/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../shadcn/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { getValidAccessToken } from '../../utils/token-management';
import { clearAllCookieSession } from '../../utils/session/cookieSession'
import axios from 'axios';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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



export const MainSidebar = ({ baseUrl }: { baseUrl: string }) => {

    const user = {
        name: "Username",
        email: "User email",
        role: "Role",
        avatar: ""
    }

    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = React.useState<Account | undefined>();
    const [softwares, setSoftwares] = React.useState<Software[]>([])


    const getInitials = (name: string) => {
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
                const accessToken = await getValidAccessToken()
                const response = await axios.get(`${baseUrl}/platform/account/all`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setAccounts(response.data)
                setSelectedAccount(response.data[0])
            } catch (error) {
                console.error(error)
            }
        };

        const fetchSubscribedSoftwares = async () => {

            try {
                const accessToken = await getValidAccessToken()
                const response = await axios.get(`${baseUrl}/platform/software/accessible/user`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setSoftwares(response.data)
            } catch (error) {
                console.error(error)
            }


        }

        fetchAccounts();
        fetchSubscribedSoftwares();
    }, []);



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
                                {selectedAccount ? getInitials(selectedAccount.accountName) : '...'}
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
                                onClick={() => {
                                    setSelectedAccount(account)
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
                <nav className="flex flex-col gap-2">

                    <Tooltip key={"home"}>
                        <TooltipTrigger asChild className='h-5 w-5'>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10"
                                asChild
                            >
                                <Link href="/">
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Home
                        </TooltipContent>
                    </Tooltip>

                </nav>
                <nav className="flex flex-col gap-2 flex-1">
                    {softwares.map((software) => {
                        const Icon = FolderCode;
                        return (
                            <Tooltip key={software.softwareName}>
                                <TooltipTrigger asChild className='h-5 w-5'>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10"
                                        asChild
                                    >
                                        <Link href={software.url}>
                                            <Icon className="h-5 w-5" />
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

                {/* Last Visited */}
                <Tooltip key="last-visited">
                    <TooltipTrigger asChild className='h-5 w-5' >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10"
                            asChild
                        >
                            <Link href="/last-visited">
                                <Clock className="h-5 w-5" />
                                <span className="sr-only">Last Visited</span>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Last Visited
                    </TooltipContent>
                </Tooltip>

                {/* Favourites */}
                <Tooltip key="favourites">
                    <TooltipTrigger asChild className='h-5 w-5' >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10"
                            asChild
                        >
                            <Link href="/favourites">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Favourites</span>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Favourites
                    </TooltipContent>
                </Tooltip>

                {/* Settings */}
                <Tooltip key="settings">
                    <TooltipTrigger asChild className='h-5 w-5' >
                        <Button
                            variant="ghost"
                            className="h-10 w-10"
                            asChild
                        >
                            <Link href="/settings">
                                <Settings className="h-5 w-5" />
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="text-sm font-semibold">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-55 p-0"
                        side={'right'}
                        sideOffset={8}
                    >
                        <div className="flex items-start gap-3 p-4 bg-card">
                            <Avatar className="h-10 w-10 mt-1">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                <p className="text-sm font-bold text-foreground blue-dark:text-muted-foreground truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {user.email}
                                </p>
                                <p className="text-sm text-muted-foreground font-semibold">
                                    {user.role}
                                </p>
                            </div>
                        </div>

                        <DropdownMenuSeparator className="my-0" />

                        <DropdownMenuItem
                            onClick={async () => {
                                await clearAllCookieSession()
                                redirect("/login.html")
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