import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "../../shadcn/alert-dialog";
export const CustomAlertDialog = ({ title, description, fontSize = "text-base", cancelText = "", // Default cancel button text
confirmText = "", // Default confirm button text
thirdOptionText = "", // Default third button text
onCancel, // Optional callback for cancel action
onConfirm, // Optional callback for confirm action
onThird, // Optional callback for third action
 }) => {
    return (_jsx(AlertDialog, { open: true, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { className: fontSize, children: title }), _jsx(AlertDialogDescription, { className: fontSize, children: description })] }), _jsxs(AlertDialogFooter, { children: [cancelText != "" && (_jsx(AlertDialogCancel, { onClick: () => {
                                if (onCancel)
                                    onCancel(); // Execute cancel callback if provided
                            }, children: cancelText })), thirdOptionText != "" && (_jsx(AlertDialogAction, { className: "bg-blue-500", color: "black", onClick: () => {
                                if (onThird)
                                    onThird(); // Execute confirm callback if provided
                            }, children: thirdOptionText })), confirmText != "" && (_jsx(AlertDialogAction, { onClick: () => {
                                if (onConfirm)
                                    onConfirm(); // Execute confirm callback if provided
                            }, children: confirmText }))] })] }) }));
};
