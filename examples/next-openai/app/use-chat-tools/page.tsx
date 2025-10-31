'use client';

import ChatInput from '@/components/chat-input';
import { useChat } from '@ai-sdk/react';
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithToolCalls,
} from 'ai';
import { UseChatToolsMessage } from '../api/use-chat-tools/route';

export default function Chat() {
  const { messages, sendMessage, addToolResult, status } =
    useChat<UseChatToolsMessage>({
      transport: new DefaultChatTransport({ api: '/api/use-chat-tools' }),
      sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

      // run client-side tools that are automatically executed:
      async onToolCall({ toolCall }) {
        // artificial 2 second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (toolCall.toolName === 'getLocation') {
          const cities = [
            'New York',
            'Los Angeles',
            'Chicago',
            'San Francisco',
          ];

          addToolResult({
            tool: 'getLocation',
            toolCallId: toolCall.toolCallId,
            output: cities[Math.floor(Math.random() * cities.length)],
          });
        }
      },
    });

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch min-h-screen bg-[#0a0a0a]">
      {messages?.map(message => (
        <div key={message.id} className="mb-4 p-4 rounded-lg">
          <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user' 
                ? 'bg-[#1e3a8a] text-[#f5f5f0]' 
                : 'bg-[#1a1a1a] text-[#f5f5f0] border border-[#2a2a2a]'
            }`}>
              <div className="text-xs font-semibold mb-1 opacity-70 text-[#f5f5f0]">
                {message.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              <div className="whitespace-pre-wrap text-[#f5f5f0]">
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case 'text':
                      return <div key={index}>{part.text}</div>;

                    case 'step-start':
                      return index > 0 ? (
                        <div key={index} className="text-[#666]">
                          <hr className="my-2 border-[#2a2a2a]" />
                        </div>
                      ) : null;

                    case 'tool-askForConfirmation': {
                      switch (part.state) {
                        case 'input-available':
                          return (
                            <div key={index} className="text-[#888]">
                              {part.input.message}
                              <div className="flex gap-2 mt-2">
                                <button
                                  className="px-4 py-2 font-bold text-[#f5f5f0] bg-[#1e3a8a] rounded hover:bg-[#1e40af] transition-colors"
                                  onClick={async () => {
                                    addToolResult({
                                      tool: 'askForConfirmation',
                                      toolCallId: part.toolCallId,
                                      output: 'Yes, confirmed.',
                                    });
                                  }}
                                >
                                  Yes
                                </button>
                                <button
                                  className="px-4 py-2 font-bold text-[#f5f5f0] bg-[#7f1d1d] rounded hover:bg-[#991b1b] transition-colors"
                                  onClick={async () => {
                                    addToolResult({
                                      tool: 'askForConfirmation',
                                      toolCallId: part.toolCallId,
                                      output: 'No, denied',
                                    });
                                  }}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          );
                        case 'output-available':
                          return (
                            <div key={index} className="text-[#888]">
                              Location access allowed: {part.output}
                            </div>
                          );
                      }
                      break;
                    }

                    case 'tool-getLocation': {
                      switch (part.state) {
                        case 'input-available':
                          return (
                            <div key={index} className="text-[#888]">
                              Getting location...
                            </div>
                          );
                        case 'output-available':
                          return (
                            <div key={index} className="text-[#888]">
                              Location: {part.output}
                            </div>
                          );
                      }
                      break;
                    }

                    case 'tool-getWeatherInformation': {
                      switch (part.state) {
                        case 'input-streaming':
                          return (
                            <pre key={index} className="text-[#888]">
                              {JSON.stringify(part.input, null, 2)}
                            </pre>
                          );
                        case 'input-available':
                          return (
                            <div key={index} className="text-[#888]">
                              Getting weather information for {part.input.city}...
                            </div>
                          );
                        case 'output-available':
                          return (
                            <div key={index} className="text-[#888]">
                              {part.output.state === 'loading'
                                ? 'Fetching weather information...'
                                : `Weather in ${part.input.city}: ${part.output.weather}`}
                            </div>
                          );
                        case 'output-error':
                          return (
                            <div key={index} className="text-red-400">
                              Error: {part.errorText}
                            </div>
                          );
                      }
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      <ChatInput status={status} onSubmit={text => sendMessage({ text })} />
    </div>
  );
}
