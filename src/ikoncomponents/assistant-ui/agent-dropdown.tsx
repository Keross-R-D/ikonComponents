"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../shadcn/dropdown-menu";
import { Button } from "../../shadcn/button";
import { cn } from "../../utils/cn";

export interface Agent {
  agentDescription?: string;
  agentID: string;
  agentName: string;
  agentRoles?: string[];
  agentTasks?: object[];
  appId: string;
  createdAt: string;
  createdBy: string;
  mcpServerIds?: string[];
  systemPrompt: string;
  updatedAt: string;
  updatedBy: string;
  userName?: null | string;
  [key: string]: any;
}

export interface AgentDropdownProps {
  agents: Agent[];
  selectedAgent?: Agent;
  onSelectAgent: (agent: Agent) => void;
  className?: string;
  triggerClassName?: string;
}

export const AgentDropdown = ({
  agents,
  selectedAgent,
  onSelectAgent,
  className,
  triggerClassName,
}: AgentDropdownProps) => {
  const [open, setOpen] = useState(false);

  // const displayAgent = selectedAgent || (agents.length > 0 ? agents[0] : null);
const displayAgent = selectedAgent || null;
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "gap-2 px-3 py-2 text-sm font-medium rounded-2xl",
            triggerClassName
          )}
        >
          <span className="truncate">
            {displayAgent?.agentName || "Select Agent"}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn("min-w-[200px]", className)}>
        {agents.length > 0 ? (
          <>
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              Agents
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {agents.map((agent) => (
                <DropdownMenuItem
                  key={agent.agentID}
                  onClick={() => {
                    onSelectAgent(agent);
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer flex flex-col gap-1",
                    displayAgent?.agentID === agent.agentID && "bg-accent"
                  )}
                >
                  <div className="font-medium text-sm">{agent.agentName}</div>
                  {agent.agentDescription && (
                    <div className="text-xs text-muted-foreground truncate">
                      {agent.agentDescription}
                    </div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        ) : (
          <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
            No agents available
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};