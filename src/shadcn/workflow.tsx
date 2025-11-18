"use client";

import * as React from "react";
import { Badge } from "ikoncomponents";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "ikoncomponents";

export type StepStatus = "OUTSTANDING" | "IN PROGRESS" | "COMPLETED";

export type WorkflowStep = {
  id?: string;
  title: string;
  status: StepStatus;
  dropdownOptions?: React.ReactNode[]; // These must be DropdownMenuItem components
  selectedOption?: string;
  owner?: string;
  createdAt?: string;
};

type WorkflowProps = {
 name:string;
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

export function Workflow({ name, steps, style }: WorkflowProps) {
  const completedCount = steps.filter((s) => s.status === "COMPLETED").length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div
      style={style}
      className="p-4 space-y-2 rounded-lg border dark:bg-[#171717] text-primary blue-dark:bg-[#1B2336]"
    >
      <h2 className="text-sm font-semibold mb-4 m-3">{name}</h2>

      {steps.map((step) => {
        const stepId = step.id ?? "";

        return (
          <div
            key={stepId}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 border border-neutral-600 rounded-md gap-1 sm:gap-2 m-2"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              {/* Icon */}
              <div className="w-7 h-7 sm:w-9 sm:h-9 dark:bg-neutral-800 bg-[var(--keross-skeleton-bg)] rounded-sm flex-shrink-0" />

              {/* Title + Dropdown */}
              <div className="flex flex-col text-md">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{step.title}</span>

                  {/* Only show dropdown if step is IN PROGRESS */}
                  {step.status === "IN PROGRESS" && step.dropdownOptions && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1">
                          <ChevronDown className="w-4 h-4 cursor-pointer" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-50 ml-40">
                        {step.dropdownOptions.map((node, index) => (
                          <React.Fragment key={index}>
                            {node}
                          </React.Fragment>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                {step.owner && (
                  <span className="text-sm text-neutral-400">{step.owner}</span>
                )}

                {step.createdAt && (
                  <span className="text-sm text-neutral-500">
                    Created on {step.createdAt}
                  </span>
                )}
              </div>
            </div>

            {/* Badge */}
            <div className="mt-1 sm:mt-0 flex-shrink-0">
              <Badge className={statusColors[step.status]}>
                {step.status}
              </Badge>
            </div>
          </div>
        );
      })}

      {/* Summary */}
      <div className="text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center pt-1">
        <span>{steps.length} steps total</span>
        <span>{completedCount} completed</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-300 dark:bg-gray-700 h-1 rounded-full overflow-hidden mt-1">
        <div
          className="h-1 bg-blue-500 dark:bg-blue-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
