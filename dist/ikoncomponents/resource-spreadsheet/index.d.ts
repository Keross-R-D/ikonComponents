import * as React from "react";
interface ResourceTableProps {
    resourceDataWithAllocation: any[];
    userMaps: UserMaps;
    monthsRange: string[];
}
interface UserMaps {
    userDetailsMap: {
        [key: string]: {
            name: string;
        };
    };
    rolesMap: {
        [key: string]: {
            roleId: string;
            roleName: string;
        };
    };
}
export declare const ResourceTable: React.FC<ResourceTableProps>;
export {};
