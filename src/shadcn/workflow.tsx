"use client";

import * as React from "react";
import { Badge } from "./badge";
import { ChevronDown } from "lucide-react";
import { Button } from "./button";

export type StepStatus = "OUTSTANDING" | "IN PROGRESS" | "COMPLETED";

export type WorkflowStep = {
  id: string;
  title: string;
  status: StepStatus;
  dropdownOptions?: React.ReactNode[]; // user sends JSX buttons
  selectedOption?: string;
  owner?: string;
  createdAt?: string;
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

  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">

            {/* small icon box */}
            <div className="w-7 h-7 sm:w-9 sm:h-9 dark:bg-neutral-800 bg-[var(--keross-skeleton-bg)] rounded-sm flex-shrink-0" />

            {/* TITLE + DROPDOWN (NOW INLINE NEXT TO TITLE) */}
            <div className="flex flex-col text-md">
              {/* Title + dropdown icon inline */}
              <div className="flex items-center gap-1">
                <span className="font-semibold">{step.title}</span>

                {step.status === "IN PROGRESS" && step.dropdownOptions && (
                  <div className="relative inline-block">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === step.id ? null : step.id
                        )
                      }
                      className="p-1"
                    >
                      <ChevronDown
                        className={`w-4 h-4 cursor-pointer transition-transform duration-200 ${
                          openDropdown === step.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdown === step.id && (
                      <div className="absolute mt-2 w-40 dark:bg-neutral-800 bg-background shadow-lg dark:border-neutral-700 rounded-md z-20 p-1 space-y-1">
                        {step.dropdownOptions.map((optionNode, index) => (
                          <div
                            key={index}
                            onClick={() => setOpenDropdown(null)}
                            className="w-full"
                          >
                            {optionNode}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Owner */}
              {step.owner && (
                <span className="text-sm text-neutral-400">{step.owner}</span>
              )}

              {/* CreatedAt */}
              {step.createdAt && (
                <span className="text-sm text-neutral-500">
                  Created on {step.createdAt}
                </span>
              )}
            </div>
          </div>

          {/* Right status badge */}
          <div className="mt-1 sm:mt-0 flex-shrink-0">
            <Badge className={statusColors[step.status]}>
              {step.status}
            </Badge>
          </div>
        </div>
      ))}

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
