'use client';

import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import { useState } from 'react';

export default function Chat() {
  const { error, status, sendMessage, messages, regenerate, stop } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden">
      {/* Sidebar - Conversation History */}
      <div className={`w-64 bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } md:relative absolute z-10 h-full`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-[#1a1a1a]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#f5f5f0]">Conversations</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 hover:bg-[#1a1a1a] rounded"
              aria-label="Close sidebar"
              title="Close sidebar"
            >
              ✕
            </button>
          </div>
          <button className="w-full px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-[#f5f5f0] rounded-lg text-sm font-medium transition-colors">
            + New Chat
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 space-y-1">
            {[1, 2, 3].map((i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#1a1a1a] text-sm text-[#ccc] transition-colors"
              >
                Conversation {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-[#1a1a1a] rounded-lg"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-[#f5f5f0]">Chat</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors" aria-label="More options" title="More options">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center mt-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#f5f5f0] mb-2">Start a conversation</h3>
                <p className="text-[#888]">Ask me anything...</p>
              </div>
            ) : (
              messages.map(m => (
                <div
                  key={m.id}
                  className={`flex gap-4 ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      m.role === 'user'
                        ? 'bg-[#1e3a8a] text-[#f5f5f0]'
                        : 'bg-[#1a1a1a] text-[#f5f5f0] border border-[#2a2a2a]'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {m.parts.map(part => {
                        if (part.type === 'text') {
                          return part.text;
                        }
                      })}
                    </div>
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">You</span>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {(status === 'submitted' || status === 'streaming') && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">AI</span>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#666] rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-[#666] rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-[#666] rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">!</span>
                </div>
                <div className="bg-red-900/20 border border-red-900/50 rounded-2xl px-4 py-3">
                  <div className="text-red-400 mb-2">An error occurred</div>
                  <button
                    onClick={() => regenerate()}
                    className="text-sm text-red-400 hover:text-red-300 underline"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-[#1a1a1a] bg-[#0f0f0f] p-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />
          </div>
        </div>
      </div>
    </div>
  );
}
