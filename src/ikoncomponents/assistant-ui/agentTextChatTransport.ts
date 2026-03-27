import { getValidAccessToken } from "../../utils/token-management";
import {
  ChatTransport,
  UIMessage,
  UIMessageChunk,
  ChatRequestOptions,
} from "ai";
import { v4 as uuidv4 } from "uuid";

export interface AgentTextChatTransportOptions {
  provider: string;
  model: string;
  agentId: string;
  agentName?: string;
  temperature?: number;
  maxTokens?: number;
  baseUrl?: string;
  additionalReferenceInfo?: object;
}

export class AgentTextChatTransport<
  UI_MESSAGE extends UIMessage = UIMessage,
> implements ChatTransport<UI_MESSAGE> {
  private agentConfig: AgentTextChatTransportOptions;
  private baseUrl: string;
  private chatIdMap: Map<string, string> = new Map();

  constructor(options: AgentTextChatTransportOptions) {
    this.agentConfig = options;
    this.baseUrl = options.baseUrl || "";
  }

  updateAgentConfig(options: Partial<AgentTextChatTransportOptions>) {
    this.agentConfig = {
      ...this.agentConfig,
      ...options,
    };
  }

  private getChatId(chatId: string): string {
    if (this.chatIdMap.has(chatId)) {
      return this.chatIdMap.get(chatId)!;
    }

    return uuidv4();
  }

  async sendMessages(
    options: {
      trigger: "submit-message" | "regenerate-message";
      chatId: string;
      messageId: string | undefined;
      messages: UI_MESSAGE[];
      abortSignal: AbortSignal | undefined;
    } & ChatRequestOptions,
  ): Promise<ReadableStream<UIMessageChunk>> {
    const { messages, chatId, abortSignal, headers, body } = options;

    console.log(
      "sendMessages called with chatId:",
      chatId,
      "trigger:",
      options.trigger,
    );
    const serverChatId = this.getChatId(chatId);
    console.log("Using server chatId:", serverChatId);

    // Convert UIMessage[] to LangChain AIMessage format
    const convertedMessages = messages.map((msg) => {
      const content = msg.parts
        .filter((part) => part.type === "text")
        .map((part: any) => part.text)
        .join("");

      return {
        role: msg.role,
        content:
          msg.role === "user" &&
          this.agentConfig.additionalReferenceInfo &&
          Object.keys(this.agentConfig.additionalReferenceInfo).length > 0
            ? content + JSON.stringify(this.agentConfig.additionalReferenceInfo)
            : content,
      };
    });

    const requestBody = {
      messages: convertedMessages,
      provider: this.agentConfig.provider,
      model: this.agentConfig.model,
      agentId: this.agentConfig.agentId,
      agentName: this.agentConfig.agentName,
      temperature: this.agentConfig.temperature ?? 0.7,
      maxTokens: this.agentConfig.maxTokens ?? 2048,
      stream: true,
      useVoice: false,
      ...body,
    };

    //adding code to fetch the token and pass it
    const accessToken = await getValidAccessToken(this.baseUrl);

    const mergedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
      ...(headers instanceof Headers
        ? Object.fromEntries(headers.entries())
        : headers || {}),
    };

    try {
      const response = await fetch(
        `${this.baseUrl}/api/chat/completions/${serverChatId}`,
        {
          method: "POST",
          headers: mergedHeaders,
          body: JSON.stringify(requestBody),
          signal: abortSignal,
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      return this.processResponseStream(response.body);
    } catch (error) {
      console.error("Error in sendMessages:", error);
      throw error;
    }
  }

  async reconnectToStream(
    options: {
      chatId: string;
    } & ChatRequestOptions,
  ): Promise<ReadableStream<UIMessageChunk> | null> {
    return null;
  }

  private processResponseStream(
    stream: ReadableStream<Uint8Array>,
  ): ReadableStream<UIMessageChunk> {
    const decoder = new TextDecoder();
    let buffer = "";
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
    let isClosed = false;
    let pendingChunks: UIMessageChunk[] = [];
    let hasStarted = false;
    let messageId = "";
    let textStarted = false;
    let textPartId = "";

    return new ReadableStream<UIMessageChunk>({
      async start(controller) {
        reader = stream.getReader();
      },

      async pull(controller) {
        if (!reader || isClosed) {
          return;
        }

        // First, deliver any pending chunks one at a time
        if (pendingChunks.length > 0) {
          controller.enqueue(pendingChunks.shift()!);
          return;
        }

        try {
          const { done, value } = await reader.read();

          if (done) {
            // Send text-end and finish chunks before closing
            if (hasStarted && messageId) {
              if (textStarted && textPartId) {
                pendingChunks.push({
                  type: "text-end",
                  id: textPartId,
                } as UIMessageChunk);
              }

              pendingChunks.push({
                type: "finish",
                finishReason: "stop",
              } as UIMessageChunk);

              // Enqueue pending chunks before closing
              while (pendingChunks.length > 0) {
                controller.enqueue(pendingChunks.shift()!);
              }
            }

            if (!isClosed) {
              isClosed = true;
              controller.close();
            }
            return;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine) continue;

            if (trimmedLine.startsWith("data:")) {
              const data = trimmedLine.slice(5).trim();

              if (!data) continue;

              try {
                const parsed = JSON.parse(data);

                if (isClosed) {
                  return;
                }

                // Track message ID and send start chunk once
                if (parsed.id && !messageId) {
                  messageId = parsed.id;
                  hasStarted = true;
                  pendingChunks.push({
                    type: "start",
                  } as UIMessageChunk);
                }

                let chunk: UIMessageChunk | null = null;

                if (parsed.type === "ai") {
                  const message = parsed.messages?.[0];
                  if (message?.content) {
                    // Generate text part ID once
                    if (!textPartId) {
                      textPartId = uuidv4();
                    }

                    // Send text-start before first delta
                    if (!textStarted) {
                      textStarted = true;
                      pendingChunks.push({
                        type: "text-start",
                        id: textPartId,
                      } as UIMessageChunk);
                    }

                    chunk = {
                      type: "text-delta",
                      delta: message.content,
                      id: textPartId,
                    } as UIMessageChunk;
                  }
                } else if (parsed.type === "tool") {
                  const toolCall = parsed.toolCall;
                  if (toolCall) {
                    chunk = {
                      type: "tool-input-available",
                      toolCallId: toolCall.callId,
                      toolName: toolCall.name,
                      input: toolCall.result,
                    } as UIMessageChunk;
                  }
                }

                if (chunk) {
                  pendingChunks.push(chunk);
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }

          // Enqueue the first chunk if we have any
          if (pendingChunks.length > 0) {
            controller.enqueue(pendingChunks.shift()!);
          }
        } catch (error) {
          if (!isClosed) {
            isClosed = true;
            controller.error(error);
          }
        }
      },

      cancel() {
        isClosed = true;
        pendingChunks = [];
        if (reader) {
          reader.releaseLock();
          reader = null;
        }
      },
    });
  }
}
