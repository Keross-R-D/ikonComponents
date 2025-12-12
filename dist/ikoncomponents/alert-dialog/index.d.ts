import * as React from "react";
interface CustomAlertDialogProps {
    title: string;
    description?: string;
    fontSize?: string;
    cancelText?: string;
    confirmText?: string;
    thirdOptionText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    onThird?: () => void;
}
export declare const CustomAlertDialog: React.FC<CustomAlertDialogProps>;
export {};
