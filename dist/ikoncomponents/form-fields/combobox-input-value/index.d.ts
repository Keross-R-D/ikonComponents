import { Control } from "react-hook-form";
export interface FormComboboxInputProps {
    formControl: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    formDescription?: string;
    items: {
        value: string;
        label: string;
        disabled?: boolean | ((item: any) => boolean);
    }[];
    disabled?: boolean | ((...args: any[]) => boolean);
    onSelect?: (value: any) => void;
    value?: string;
    onChange?: (value: any) => void;
}
export declare function FormComboboxInputWithValue(props: FormComboboxInputProps): import("react/jsx-runtime").JSX.Element;
