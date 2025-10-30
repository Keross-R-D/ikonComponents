import { ReactNode } from "react";
interface Props {
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    tools?: ReactNode;
    children: ReactNode;
}
export declare function PageWrapper({ title, subtitle, tools, children }: Props): import("react/jsx-runtime").JSX.Element;
export {};
