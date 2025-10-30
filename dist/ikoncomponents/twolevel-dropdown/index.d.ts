export interface FrameworkEntry {
    id: string;
    index: string;
    title: string;
    description: string;
    parentId: string | null;
    treatAsParent: boolean;
}
export interface TreeNode extends FrameworkEntry {
    level: number;
}
export interface ParentEntry extends FrameworkEntry {
    childrenArray: string[];
}
export interface ProcessedFrameworkData {
    flatTree: TreeNode[];
    itemMap: Record<string, {
        parentId: string | null;
        childrenIds: string[];
    }>;
}
interface FrameworkItemDropdownProps {
    processedData: ProcessedFrameworkData;
    value: string[];
    onChange: (newSelection: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
}
export declare function FrameworkItemDropdown({ processedData, value, onChange, placeholder, searchPlaceholder, className, }: FrameworkItemDropdownProps): import("react/jsx-runtime").JSX.Element;
export {};
