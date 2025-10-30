import React from 'react';
interface Props {
    parentDivProps?: any;
    option?: Record<string | number, any>;
    style?: Record<string, string>;
    settings?: Record<string, any>;
    loading?: boolean;
    theme?: string | object | null;
    isConfigurable?: boolean;
    resizeKey?: null | boolean | number | string;
    onClick?: (...args: any) => void;
    onConfigure?: (...args: any) => void;
}
export declare const EChart: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export {};
