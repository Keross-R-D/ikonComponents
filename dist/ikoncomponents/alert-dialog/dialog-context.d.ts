import { ReactNode } from "react";
interface DialogContextProps {
    openDialog: (options: DialogOptions) => void;
    closeDialog: () => void;
}
interface DialogOptions {
    title: string;
    description: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onThird?: () => void;
    confirmText?: string;
    cancelText?: string;
    thirdOptionText?: string;
    fontSize?: string;
}
export declare const useDialog: () => DialogContextProps;
export declare const DialogProvider: React.FC<{
    children: ReactNode;
}>;
export {};
