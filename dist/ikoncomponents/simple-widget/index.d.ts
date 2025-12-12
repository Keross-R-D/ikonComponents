import { ReactNode } from "react";
interface Props {
    title: string;
    iconName?: string;
    iconSize?: number;
    iconClass?: string;
    primaryText: number | string | ReactNode;
    secondaryText?: string | ReactNode;
    mainClassName?: string;
    loading?: boolean;
    loadingMessage?: string;
}
export declare function SimpleWidget({ title, iconName, iconSize, iconClass, primaryText, secondaryText, mainClassName, loading, loadingMessage }: Props): import("react/jsx-runtime").JSX.Element;
export {};
