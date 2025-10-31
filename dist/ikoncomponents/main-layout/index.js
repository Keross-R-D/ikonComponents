import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MainSidebar } from './main-sidebar';
import { SidebarInset, SidebarProvider } from '../../shadcn/sidebar';
import { DialogProvider } from '../alert-dialog/dialog-context';
import { AppSidebar } from './app-sidebar';
import { Header } from './header';
import { Footer } from './footer';
import { SidebarNavProvider } from './SidebarNavContext';
export function MainLayout({ children, baseUrl }) {
    return (_jsxs(_Fragment, { children: [_jsx(MainSidebar, { baseUrl: baseUrl }), _jsx(SidebarProvider, { children: _jsx(DialogProvider, { children: _jsxs(SidebarNavProvider, { children: [_jsx(AppSidebar, {}), _jsxs(SidebarInset, { className: "flex flex-col h-screen", children: [_jsx(Header, {}), _jsx("div", { className: "flex flex-col gap-4 p-4 pt-0 ml-12 grow overflow-auto scrollbar-hidden", children: children }), _jsx(Footer, {})] })] }) }) })] }));
}
