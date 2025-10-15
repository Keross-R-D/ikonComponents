
import AppBreadcrumb from "./app-breadcrumb";

import { ThemeSwitcher } from "./theme-switcher";
import TopMenuUser from "./header-nav-user";
import { Separator } from "../shadcn/ui/separator";
import { SidebarTrigger } from "../shadcn/ui/sidebar";

function Header() {
  return (
    <header className="flex h-12 border-b shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <AppBreadcrumb />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {/* <TopMenuUser /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
