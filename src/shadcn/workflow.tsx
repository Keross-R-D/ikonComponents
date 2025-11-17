"use client";

import * as React from "react";
import { Badge } from "./badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ChevronDown } from "lucide-react";

export type StepStatus = "OUTSTANDING" | "IN PROGRESS" | "COMPLETED";

export type WorkflowStep = {
  id: string;
  title: string;
  status: StepStatus;
  dropdownOptions?: { label: string; value: string }[];
  selectedOption?: string;
  onDropdownSelect?: (stepId: string, value: string) => void;
};

type WorkflowProps = {
  title?: string;
  steps: WorkflowStep[];
  onDropdownSelect?: (stepId: string, value: string) => void;
  style?: React.CSSProperties;
};

const statusColors: Record<StepStatus, string> = {
  OUTSTANDING: "bg-[#FFDE721A] text-[#FBB125] border border-[#FBB12533]",
  "IN PROGRESS": "bg-[#6A77D91A] text-[#6A77D9]",
  COMPLETED: "bg-[#519E591A] text-[#519E59] border border-[#FBB12533]",
};

export function Workflow({
  title = "Deal Workflow",
  steps,
  onDropdownSelect,
  style,
}: WorkflowProps) {
  const completedCount = steps.filter((s) => s.status === "COMPLETED").length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div
      style={style}
      className="p-4 space-y-2 rounded-lg border dark:bg-[#171717] text-primary blue-dark:bg-[#1B2336]"
    >
      <h2 className="text-sm font-semibold mb-4 m-3">{title}</h2>

      {steps.map((step) => (
        <div
          key={step.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-neutral-600 rounded-md gap-1 sm:gap-2 m-2"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 w-full sm:w-auto">
            {/* small circle */}
            <div className="w-6 h-6 sm:w-6 sm:h-6 dark:bg-neutral-800 bg-[var(--keross-skeleton-bg)] rounded-sm flex-shrink-0" />

            {/* title */}
            <div className=" text-sm ">
              {step.title}
            </div>

            {/* show dropdown only if status === "IN PROGRESS" */}
           {step.status === "IN PROGRESS" && step.dropdownOptions && (
  <Select
    defaultValue={step.selectedOption}
    onValueChange={(value) => onDropdownSelect?.(step.id, value)}
  >
    <SelectTrigger
      // hide built-in chevron + enable rotation via data-state
      className=" border-transparent bg-transparent p-0 hover:bg-transparent  [&>svg:last-child]:hidden data-[state=open]:[&>svg:first-child]:rotate-180"
    >
      {/* custom chevron that rotates */}
      <ChevronDown className="w-4 h-4  cursor-pointer transition-transform duration-200" />
      <SelectValue placeholder="" />
    </SelectTrigger>

    <SelectContent>
      {step.dropdownOptions.map((opt) => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className="text-xs hover:cursor-pointer dark:hover:bg-neutral-700"
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)}


          </div>

          {/* badge */}
          <div className="mt-1 sm:mt-0 flex-shrink-0">
            <Badge className={statusColors[step.status]}>{step.status}</Badge>
          </div>
        </div>
      ))}

      <div className="text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center pt-1 gap-1 sm:gap-0">
        <span>{steps.length} steps total</span>
        <span>{completedCount} completed</span>
      </div>

      {/* progress bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-1 rounded-full overflow-hidden mt-1">
        <div
          className="bg-blue-500 dark:bg-blue-400 h-1 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
