import * as React from "react";
export type StepStatus = "OUTSTANDING" | "IN PROGRESS" | "COMPLETED";
export type WorkflowStep = {
    id?: string;
    title: string;
    status: StepStatus;
    dropdownOptions?: React.ReactNode[];
    selectedOption?: string;
    owner?: string;
    createdAt?: string;
};
type WorkflowProps = {
    name: string;
    title?: string;
    steps: WorkflowStep[];
    onDropdownSelect?: (stepId: string, value: string) => void;
    style?: React.CSSProperties;
};
export declare function Workflow({ name, steps, style }: WorkflowProps): import("react/jsx-runtime").JSX.Element;
export {};
