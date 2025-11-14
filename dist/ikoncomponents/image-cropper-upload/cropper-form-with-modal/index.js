import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../../../shadcn/dialog';
import { CropperForm } from '../cropper-form';
import { TextButton } from '../../buttons';
import { useImageCropper } from '..';
export function CropperFormWithModal({ open, onOpenChange, onCropperChange }) {
    const { originalImage, aspectRatioWiseImages } = useImageCropper();
    return (_jsx(Dialog, { modal: true, open: open, onOpenChange: (isOpen) => {
            onOpenChange(isOpen);
        }, children: _jsxs(DialogContent, { className: "max-w-full lg:max-w-5xl max-h-full overflow-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Image to upload" }) }), _jsx(CropperForm, {}), _jsx(DialogFooter, { children: _jsx(TextButton, { onClick: () => {
                            onCropperChange(originalImage, aspectRatioWiseImages);
                            onOpenChange(false);
                        }, children: "Save Changes" }) })] }) }));
}
