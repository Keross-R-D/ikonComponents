"use client";

import { Thread } from "./thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AgentTextChatTransport } from "./agentTextChatTransport";

interface UserData {
  userId: string;
  userName: string;
  userLogin: string;
  password: string;
  userPhone?: string;
  userEmail: string;
  userThumbnail?: string | null;
  userType?: string;
  active?: boolean;
  accountId?: string;
  userDeleted?: boolean;
}

interface AssistantComponentProps {
  provider?: string;
  model?: string;
  agentId?: string;
  agentName?: string;
  temperature?: number;
  maxTokens?: number;
  className?: string;
  baseUrl?: string;
  additionalReferenceInfo?: object;
  currentUserDetails: UserData;
}

export const AssistantComponent = ({
  provider = "openai",
  model = "gpt-4o-mini",
  agentId = "default-agent",
  agentName = "Default Agent",
  temperature = 0.7,
  maxTokens = 2048,
  className,
  baseUrl = "http://localhost:3000",
  additionalReferenceInfo = {},
  currentUserDetails,
}: AssistantComponentProps) => {
  const runtime = useChatRuntime({
    transport: new AgentTextChatTransport({
      provider,
      model,
      agentId,
      agentName,
      temperature,
      maxTokens,
      baseUrl,
      additionalReferenceInfo
    }),
  });

  
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className={className}>
        <div
          className={`flex flex-col h-full border rounded-lg overflow-hidden ${className}`}
        >
          <Thread currentUserDetails={currentUserDetails} />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
