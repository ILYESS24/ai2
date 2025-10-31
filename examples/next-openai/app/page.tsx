'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import Link from 'next/link';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { error, status, sendMessage, messages, regenerate, stop } = useChat();

  const examples = [
    { title: 'Basic Chat', link: '/use-chat-tools', category: 'Core' },
    { title: 'Completion', link: '/completion', category: 'Core' },
    { title: 'Completion RSC', link: '/completion-rsc', category: 'Core' },
    { title: 'Stream Object', link: '/stream-object', category: 'Core' },
    { title: 'Stream UI', link: '/stream-ui', category: 'Core' },
    { title: 'Generate Image', link: '/generate-image', category: 'Core' },
    
    { title: 'Chat with Tools', link: '/use-chat-tools', category: 'Features' },
    { title: 'Chat with Attachments', link: '/use-chat-attachments', category: 'Features' },
    { title: 'Chat with Sources', link: '/use-chat-sources', category: 'Features' },
    { title: 'Chat with Custom Sources', link: '/use-chat-custom-sources', category: 'Features' },
    { title: 'Chat with Data UI Parts', link: '/use-chat-data-ui-parts', category: 'Features' },
    { title: 'Chat with Image Output', link: '/use-chat-image-output', category: 'Features' },
    { title: 'Chat with Persistence', link: '/use-chat-persistence', category: 'Features' },
    { title: 'Chat with Resume', link: '/use-chat-resume', category: 'Features' },
    { title: 'Chat with Shared Context', link: '/use-chat-shared-context', category: 'Features' },
    { title: 'Chat with Throttle', link: '/use-chat-throttle', category: 'Features' },
    { title: 'Chat Human in the Loop', link: '/use-chat-human-in-the-loop', category: 'Features' },
    { title: 'Chat with Reasoning', link: '/use-chat-reasoning', category: 'Features' },
    
    { title: 'OpenAI Test', link: '/test-openai-responses', category: 'Providers' },
    { title: 'OpenAI Web Search', link: '/chat-openai-web-search', category: 'Providers' },
    { title: 'OpenAI Code Interpreter', link: '/test-openai-code-interpreter', category: 'Providers' },
    { title: 'OpenAI File Search', link: '/test-openai-file-search', category: 'Providers' },
    { title: 'OpenAI Image Generation', link: '/test-openai-image-generation', category: 'Providers' },
    { title: 'OpenAI Local Shell', link: '/test-openai-local-shell', category: 'Providers' },
    
    { title: 'Anthropic Code Execution', link: '/chat-anthropic-code-execution', category: 'Providers' },
    { title: 'Anthropic Web Search', link: '/chat-anthropic-web-search', category: 'Providers' },
    { title: 'Anthropic Web Fetch', link: '/chat-anthropic-web-fetch', category: 'Providers' },
    { title: 'Anthropic MCP', link: '/chat-anthropic-mcp', category: 'Providers' },
    
    { title: 'Google Test', link: '/test-google', category: 'Providers' },
    { title: 'Cohere Test', link: '/test-cohere', category: 'Providers' },
    { title: 'Groq Test', link: '/test-groq', category: 'Providers' },
    { title: 'Mistral Test', link: '/test-mistral', category: 'Providers' },
    { title: 'Perplexity Test', link: '/test-perplexity', category: 'Providers' },
    { title: 'XAI Test', link: '/test-xai', category: 'Providers' },
    { title: 'Amazon Bedrock', link: '/bedrock', category: 'Providers' },
    
    { title: 'MCP Chat', link: '/mcp', category: 'Advanced' },
    { title: 'MCP with Auth', link: '/mcp-with-auth', category: 'Advanced' },
    { title: 'MCP Zapier', link: '/mcp-zapier', category: 'Advanced' },
    { title: 'Dynamic Tools', link: '/dynamic-tools', category: 'Advanced' },
    { title: 'Tool Approval', link: '/test-tool-approval', category: 'Advanced' },
    { title: 'Tool Approval Dynamic', link: '/test-tool-approval-dynamic', category: 'Advanced' },
    { title: 'Weather Valibot Tool', link: '/test-weather-valibot', category: 'Advanced' },
    
    { title: 'Use Object', link: '/use-object', category: 'Objects' },
    { title: 'Use Object Expense Tracker', link: '/use-object-expense-tracker', category: 'Objects' },
    { title: 'Use Object Valibot', link: '/use-object-valibot', category: 'Objects' },
  ];

  const categories = Array.from(new Set(examples.map(e => e.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className={`w-64 bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative absolute z-10 h-full`}>
          {/* Header */}
          <div className="p-4 border-b border-[#1a1a1a]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-[#f5f5f0] mb-1">AI SDK</h1>
                <p className="text-xs text-[#888]">Examples Gallery</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-1 hover:bg-[#1a1a1a] rounded"
                aria-label="Close sidebar"
                title="Close sidebar"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Search/Filter */}
          <div className="p-4 border-b border-[#1a1a1a]">
            <input
              type="text"
              placeholder="Search examples..."
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-[#f5f5f0] placeholder:text-[#666] focus:outline-none focus:border-[#4a9eff] text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                  selectedCategory === null
                    ? 'bg-[#1a1a1a] text-[#f5f5f0]'
                    : 'text-[#888] hover:bg-[#151515]'
                }`}
              >
                All Examples
              </button>
            </div>
            {categories.map(category => (
              <div key={category} className="mb-2">
                <button
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold text-[#aaa] uppercase tracking-wider ${
                    selectedCategory === category ? 'text-[#6bb0ff]' : ''
                  }`}
                >
                  {category}
                </button>
                {(selectedCategory === null || selectedCategory === category) && (
                  <div className="px-2">
                    {examples
                      .filter(e => e.category === category)
                      .map(example => (
                        <Link
                          key={example.link}
                          href={example.link}
                          className="block px-3 py-1.5 rounded text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#f5f5f0] transition-colors"
                        >
                          {example.title}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1a1a1a] text-xs text-[#666]">
            <p>{examples.length} examples</p>
          </div>
        </div>
      )}

      {/* Main Content - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-[#f5f5f0]">AI SDK</h2>
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
                <h3 className="text-xl font-semibold text-[#f5f5f0] mb-2">How can I help you today?</h3>
                <p className="text-[#888]">Start a conversation or ask me anything...</p>
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
