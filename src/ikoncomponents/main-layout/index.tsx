"use client"

import { ReactNode } from 'react'
import { MainSidebar } from './main-sidebar'
import { SidebarInset, SidebarProvider } from '../../shadcn/sidebar'
import { DialogProvider } from '../alert-dialog/dialog-context'
import { AppSidebar } from './app-sidebar'
import { Header } from './header'
import { Footer } from './footer'
import { SidebarNavProvider } from './SidebarNavContext'
import { SidebarExpandedProvider, useSidebarExpanded } from './sidebar-expanded-context'
import { cn } from '../../utils/cn'

export function MainLayout({
    children,
    baseUrl,
    platformUrl
}: {
    children: ReactNode;
    baseUrl: string;
    platformUrl: string;
}) {
    return (
        <SidebarExpandedProvider>
            <SidebarProvider>
                {/* MainSidebar lives inside SidebarProvider so it can read/control the
                    sub menu (app sidebar) open state and keep the two rails inverse. */}
                <MainSidebar baseUrl={baseUrl} platformUrl={platformUrl} />
                <DialogProvider>
                    <SidebarNavProvider>
                        <AppSidebar />
                        <SidebarInset className="flex flex-col h-screen">
                            <Header platformUrl={platformUrl} />
                            <MainContent>{children}</MainContent>
                            <Footer />
                        </SidebarInset>
                    </SidebarNavProvider>
                </DialogProvider>
            </SidebarProvider>
        </SidebarExpandedProvider>
    )
}

/** Page content, shifted right to clear the main sidebar rail (wider when expanded). */
function MainContent({ children }: { children: ReactNode }) {
    const expanded = useSidebarExpanded();
    return (
        <div
            className={cn(
                "flex flex-col gap-4 p-4 pt-0 grow overflow-auto scrollbar-hidden transition-[margin] duration-200 ease-in-out",
                expanded ? "ml-56" : "ml-12"
            )}
        >
            {children}
        </div>
    )
}
