export type ActivityLogProps = {
    id: string;
    activity: string;
    updatedBy: string;
    updatedOn: string;
    source: string;
    parentId: string;
};
export declare function ActivitySheet({ activityLogs }: {
    activityLogs?: ActivityLogProps[];
}): import("react/jsx-runtime").JSX.Element;
