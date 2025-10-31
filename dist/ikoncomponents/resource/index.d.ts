import React from 'react';
export interface ResourceTableProps {
    resourceDataWithAllocation: any[];
    userMaps: {
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
    };
    monthsRange: string[];
}
export declare const ResourceTable: React.FC<ResourceTableProps>;
