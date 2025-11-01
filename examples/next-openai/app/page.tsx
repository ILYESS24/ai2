'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import Link from 'next/link';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExamples = examples.filter(example => {
    const matchesCategory = selectedCategory === null || example.category === selectedCategory;
    const matchesSearch = searchQuery === '' || example.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden font-['Poppins']">
      {/* Modern Sidebar */}
      <div className={`w-80 bg-[#0f0f0f] border-r subtle-border flex flex-col transition-all duration-300 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } md:relative absolute z-20 h-full`}>
        {/* Elegant Header */}
        <div className="px-6 py-8 border-b subtle-border">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-[#f5f5f0] tracking-tight">AI SDK</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 hover:bg-[#1a1a1a] rounded-lg smooth-transition"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-[#888] font-light tracking-wide">Examples Gallery</p>
        </div>

        {/* Minimalist Search */}
        <div className="px-6 py-4 border-b subtle-border">
          <div className="relative">
            <input
              type="text"
              placeholder="Search examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border subtle-border rounded-lg text-[#f5f5f0] placeholder:text-[#666] focus:outline-none focus:border-[#f5f5f0]/20 focus:bg-[#1a1a1a] transition-all duration-200 text-sm font-light"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Clean Categories */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 mb-2 ${
                selectedCategory === null
                  ? 'bg-[#1a1a1a] text-[#f5f5f0]'
                  : 'text-[#888] hover:bg-[#151515] hover:text-[#f5f5f0]'
              }`}
            >
              All Examples
            </button>
            {categories.map(category => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold text-[#888] uppercase tracking-widest transition-colors duration-200 ${
                    selectedCategory === category ? 'text-[#f5f5f0]' : 'hover:text-[#f5f5f0]'
                  }`}
                >
                  {category}
                </button>
                {(selectedCategory === null || selectedCategory === category) && (
                  <div className="mt-2 space-y-0.5">
                    {examples
                      .filter(e => e.category === category && filteredExamples.includes(e))
                      .map(example => (
                        <Link
                          key={example.link}
                          href={example.link}
                          className="block px-4 py-2.5 rounded-lg text-sm text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#f5f5f0] transition-all duration-200 font-light"
                        >
                          {example.title}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Footer */}
        <div className="px-6 py-4 border-t subtle-border">
          <div className="flex items-center justify-between text-xs text-[#666] font-light">
            <span>{examples.length} examples</span>
            <span>AI SDK</span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Modern Top Bar */}
        <div className="h-20 bg-[#0f0f0f] border-b subtle-border flex items-center justify-between px-8 relative z-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-[#1a1a1a] rounded-lg smooth-transition"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-[#888] hover:text-[#f5f5f0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-semibold text-[#f5f5f0] tracking-tight">AI SDK</h2>
              <p className="text-xs text-[#666] font-light">Powered by Vercel AI</p>
            </div>
          </div>
        </div>

        {/* Clean Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.length === 0 ? (
              <div className="text-center mt-32">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#1a1a1a] border subtle-border flex items-center justify-center modern-shadow">
                  <svg className="w-10 h-10 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#f5f5f0] mb-3 tracking-tight">How can I help you today?</h3>
                <p className="text-[#888] text-lg font-light">Start a conversation or ask me anything...</p>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div
                  key={m.id}
                  className={`flex gap-4 group ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border subtle-border flex items-center justify-center flex-shrink-0 modern-shadow">
                      <span className="text-xs font-semibold text-[#f5f5f0]">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-6 py-4 smooth-transition ${
                      m.role === 'user'
                        ? 'bg-[#1a1a1a] border subtle-border text-[#f5f5f0] modern-shadow'
                        : 'bg-[#0f0f0f] border subtle-border text-[#f5f5f0] modern-shadow'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words leading-relaxed text-[#f5f5f0] font-light">
                      {m.parts.map(part => {
                        if (part.type === 'text') {
                          return part.text;
                        }
                      })}
                    </div>
                  </div>
                  {m.role === 'user' && (
                    <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border subtle-border flex items-center justify-center flex-shrink-0 modern-shadow">
                      <span className="text-xs font-semibold text-[#f5f5f0]">You</span>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Minimalist Loading Indicator */}
            {(status === 'submitted' || status === 'streaming') && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border subtle-border flex items-center justify-center flex-shrink-0 modern-shadow">
                  <span className="text-xs font-semibold text-[#f5f5f0]">AI</span>
                </div>
                <div className="bg-[#0f0f0f] border subtle-border rounded-2xl px-6 py-4 modern-shadow">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Clean Error Message */}
            {error && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border subtle-border flex items-center justify-center flex-shrink-0 modern-shadow">
                  <span className="text-xs font-semibold text-[#f5f5f0]">!</span>
                </div>
                <div className="bg-[#0f0f0f] border subtle-border rounded-2xl px-6 py-4 modern-shadow">
                  <div className="text-[#888] mb-2 font-light">An error occurred</div>
                  <button
                    onClick={() => regenerate()}
                    className="text-sm text-[#f5f5f0] hover:text-[#888] underline font-light transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modern Input Area */}
        <div className="border-t subtle-border bg-[#0f0f0f] p-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
