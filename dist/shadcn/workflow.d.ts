export type StepStatus = "OUTSTANDING" | "IN PROGRESS" | "COMPLETED";
export type WorkflowStep = {
    id: string;
    title: string;
    status: StepStatus;
    dropdownOptions?: {
        label: string;
        value: string;
    }[];
    selectedOption?: string;
};
type WorkflowProps = {
    title?: string;
    steps: WorkflowStep[];
};
export declare function Workflow({ title, steps }: WorkflowProps): import("react/jsx-runtime").JSX.Element;
export {};
