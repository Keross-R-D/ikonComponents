import * as React from "react";
export type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type CustomComboboxInputProps = {
    formControl: any;
    name: string;
    label?: string | React.ReactNode;
    options: Option[];
    placeholder?: string;
    emptyMessage?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    addNewPlaceholder?: string;
    formDescription?: string;
    disabled?: boolean;
};
export declare function CustomComboboxInput({ formControl, name, label, options, placeholder, emptyMessage, onValueChange, className, addNewPlaceholder, formDescription, disabled, }: CustomComboboxInputProps): import("react/jsx-runtime").JSX.Element;
export {};
