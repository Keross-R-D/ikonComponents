interface MultiComboboxProps {
    placeholder: string;
    items: {
        value: string;
        label?: string;
        disabled?: boolean | ((item: any) => boolean);
    }[];
    onValueChange: (selectedItems: string[]) => void;
    defaultValue?: string[];
    defaultOptions?: number;
}
export declare function MultiCombobox({ placeholder, items, onValueChange, defaultValue, defaultOptions }: MultiComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
