'use client';

import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';

export default function Chat() {
  const { error, status, sendMessage, messages, regenerate, stop } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch min-h-screen bg-[#0a0a0a]">
      {messages.map(m => (
        <div key={m.id} className="mb-4 p-4 rounded-lg">
          <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${
              m.role === 'user' 
                ? 'bg-[#1e3a8a] text-[#f5f5f0]' 
                : 'bg-[#1a1a1a] text-[#f5f5f0] border border-[#2a2a2a]'
            }`}>
              <div className="text-xs font-semibold mb-1 opacity-70">
                {m.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>
              <div className="whitespace-pre-wrap">
                {m.parts.map(part => {
                  if (part.type === 'text') {
                    return part.text;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ))}

      {(status === 'submitted' || status === 'streaming') && (
        <div className="mt-4 text-[#888]">
          {status === 'submitted' && <div>Loading...</div>}
          <button
            type="button"
            className="px-4 py-2 mt-4 text-[#f5f5f0] bg-[#1a1a1a] border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] transition-colors"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-[#1a1a1a] border border-red-500/50 rounded-lg">
          <div className="text-red-400">An error occurred.</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-[#f5f5f0] bg-[#1a1a1a] border border-[#2a2a2a] rounded-md hover:bg-[#2a2a2a] transition-colors"
            onClick={() => regenerate()}
          >
            Retry
          </button>
        </div>
      )}

      <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />
    </div>
  );
}

