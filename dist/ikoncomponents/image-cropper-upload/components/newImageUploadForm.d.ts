import React from "react";
export interface ImageFormProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onImageSubmit: (data: string | null) => void;
}
export declare const NewImageForm: React.NamedExoticComponent<ImageFormProps>;
