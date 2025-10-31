'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { CustomAlertDialog } from "../alert-dialog";
const DialogContext = createContext(undefined);
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider");
    }
    return context;
};
export const DialogProvider = ({ children }) => {
    const [dialogOptions, setDialogOptions] = useState(null);
    const openDialog = (options) => setDialogOptions(options);
    const closeDialog = () => setDialogOptions(null);
    return (_jsxs(DialogContext.Provider, { value: { openDialog, closeDialog }, children: [children, dialogOptions && (_jsx(CustomAlertDialog, { title: dialogOptions.title, description: dialogOptions.description, fontSize: dialogOptions.fontSize || "text-base", cancelText: dialogOptions.cancelText || "", confirmText: dialogOptions.confirmText || "", thirdOptionText: dialogOptions.thirdOptionText || "", onConfirm: () => {
                    if (dialogOptions.onConfirm)
                        dialogOptions.onConfirm();
                    closeDialog();
                }, onCancel: () => {
                    if (dialogOptions.onCancel)
                        dialogOptions.onCancel();
                    closeDialog();
                }, onThird: () => {
                    if (dialogOptions.onThird)
                        dialogOptions.onThird();
                    closeDialog();
                } }))] }));
};
