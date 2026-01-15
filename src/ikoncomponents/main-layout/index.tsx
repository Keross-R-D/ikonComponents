import React, { ReactNode } from 'react'
import { MainSidebar } from './main-sidebar'
import { SidebarInset, SidebarProvider } from '../../shadcn/sidebar'
import { DialogProvider } from '../alert-dialog/dialog-context'
import { AppSidebar } from './app-sidebar'
import { Header } from './header'
import { Footer } from './footer'
import { SidebarNavProvider } from './SidebarNavContext'

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
        <>
        
            <MainSidebar baseUrl={baseUrl} platformUrl={platformUrl} />
            <SidebarProvider>
                <DialogProvider>
                    <SidebarNavProvider>
                        <AppSidebar />
                        <SidebarInset className="flex flex-col h-screen">
                            <Header platformUrl={platformUrl} />
                            <div className="flex flex-col gap-4 p-4 pt-0 ml-12 grow overflow-auto scrollbar-hidden">
                                {children}
                            </div>
                            <Footer />
                        </SidebarInset>
                    </SidebarNavProvider>
                </DialogProvider>
            </SidebarProvider>
        </>
    )
}