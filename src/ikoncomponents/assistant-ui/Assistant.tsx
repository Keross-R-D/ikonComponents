"use client";

import { Thread } from "./thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AgentTextChatTransport } from "./agentTextChatTransport";
import { useEffect, useState } from "react";
import { getValidAccessToken } from "@/utils/token-management";
import { Agent } from "./agent-dropdown";

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
  appId: string;
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
  appId = "",
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
      additionalReferenceInfo,
    }),
  });

  const [agentList, setAgentList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent>()

  const getAgentsByAppId = async () => {
    try {
      const accessToken = await getValidAccessToken(
        "https://ikoncloud-dev.keross.com/ikon-api",
      );
      const response = await fetch(`${baseUrl}/api/agent/${appId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 1. Check if the response is actually okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 2. Parse the body as JSON
      const data = await response.json();

      // 3. Now you can use it!
      console.log("Agent Data:", data);
      setAgentList(data);

      // setAgentList(response)
    } catch (error) {
      console.error(
        "Error while fetching agents with the specific appId",
        error,
      );
    }
  };

  useEffect(() => {
    getAgentsByAppId();
  }, [appId, baseUrl]);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className={className}>
        <div
          className={`flex flex-col h-full border rounded-lg overflow-hidden ${className}`}
        >
          <Thread
            currentUserDetails={currentUserDetails}
            agents={agentList}
            initialAgentId={agentId}
            initialAgentName={agentName}
            onAgentChange={(agent) => {
              // Handle agent change here
              console.log("Agent changed:", agent);
              setSelectedAgent(agent);
            }}
          />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
