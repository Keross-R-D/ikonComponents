"use client";

import React from "react";
import { ThemeProvider } from "../../utils/theme-provider";
import { FontProvider } from "../../utils/font-provider";
import { RadiusProvider } from "../../utils/border-radius-provider";
import { BreadcrumbProvider } from "../app-breadcrumb/BreadcrumbProvider";
import { MainLayout } from "../main-layout";
import { RefreshProvider } from "../main-layout/RefreshContext";

export function ProviderWrapper({ 
    children, 
    baseUrl, 
    platformUrl 
}: { 
    children: React.ReactNode; 
    baseUrl: string;
    platformUrl: string;
}) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FontProvider>
                <RadiusProvider>
                    <BreadcrumbProvider>
                    <RefreshProvider>
                        <MainLayout baseUrl={baseUrl} platformUrl={platformUrl}>
                            {children}
                        </MainLayout>
                    </RefreshProvider>
                    </BreadcrumbProvider>
                </RadiusProvider>
            </FontProvider>
        </ThemeProvider>
    );
}