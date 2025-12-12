import { FormComboboxInputProps as BaseFormComboboxInputProps } from "../../form-fields/types";
interface FormComboboxInputProps extends BaseFormComboboxInputProps {
    defaultOptions?: number;
}
export declare function FormMultiComboboxInput({ formControl, name, label, placeholder, formDescription, items, disabled, onSelect, defaultValue, defaultOptions, }: FormComboboxInputProps): import("react/jsx-runtime").JSX.Element;
export {};
