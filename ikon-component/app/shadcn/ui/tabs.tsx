"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root;
type TabsListVariant = "line" | "solid";
const TabsListVariantContext = React.createContext<TabsListVariant>("line");

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  variant?: TabsListVariant;
}

const variantStyles: Record<TabsListVariant, string> = {
  line: cn(
    "flex items-center border-b border-border space-x-2"
  ),
  solid: cn(
    "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
  ),
};

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "line", children, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(variantStyles[variant], className)}
    {...props}
  >
    <TabsListVariantContext.Provider value={variant}>
      {children}
    </TabsListVariantContext.Provider>
  </TabsPrimitive.List>
));

TabsList.displayName = "TabsList";

const getVariantStyles = (tabVariant: TabsListVariant) => {
  switch (tabVariant) {
    case "line":
      return cn(
        "inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors",
        "hover:text-foreground hover:border-border",
        "data-[state=active]:border-primary data-[state=active]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      );
    case "solid":
      return cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-foreground",
        "data-[state=active]:bg-background data-[state=active]:text-foreground shadow-sm",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      );
  }
};

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const tabVariant = React.useContext(TabsListVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(getVariantStyles(tabVariant), className)}
      {...props}
    />
  );
});

TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
