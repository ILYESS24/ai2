'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import Link from 'next/link';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { error, status, sendMessage, messages, regenerate, stop } = useChat();

  const examples = [
    { title: 'Basic Chat', link: '/use-chat-tools', category: 'Core', icon: '💬' },
    { title: 'Completion', link: '/completion', category: 'Core', icon: '✨' },
    { title: 'Completion RSC', link: '/completion-rsc', category: 'Core', icon: '⚡' },
    { title: 'Stream Object', link: '/stream-object', category: 'Core', icon: '🌊' },
    { title: 'Stream UI', link: '/stream-ui', category: 'Core', icon: '🎨' },
    { title: 'Generate Image', link: '/generate-image', category: 'Core', icon: '🎭' },
    
    { title: 'Chat with Tools', link: '/use-chat-tools', category: 'Features', icon: '🛠️' },
    { title: 'Chat with Attachments', link: '/use-chat-attachments', category: 'Features', icon: '📎' },
    { title: 'Chat with Sources', link: '/use-chat-sources', category: 'Features', icon: '📚' },
    { title: 'Chat with Custom Sources', link: '/use-chat-custom-sources', category: 'Features', icon: '🎯' },
    { title: 'Chat with Data UI Parts', link: '/use-chat-data-ui-parts', category: 'Features', icon: '📊' },
    { title: 'Chat with Image Output', link: '/use-chat-image-output', category: 'Features', icon: '🖼️' },
    { title: 'Chat with Persistence', link: '/use-chat-persistence', category: 'Features', icon: '💾' },
    { title: 'Chat with Resume', link: '/use-chat-resume', category: 'Features', icon: '▶️' },
    { title: 'Chat with Shared Context', link: '/use-chat-shared-context', category: 'Features', icon: '🔗' },
    { title: 'Chat with Throttle', link: '/use-chat-throttle', category: 'Features', icon: '⏱️' },
    { title: 'Chat Human in the Loop', link: '/use-chat-human-in-the-loop', category: 'Features', icon: '👤' },
    { title: 'Chat with Reasoning', link: '/use-chat-reasoning', category: 'Features', icon: '🧠' },
    
    { title: 'OpenAI Test', link: '/test-openai-responses', category: 'Providers', icon: '🤖' },
    { title: 'OpenAI Web Search', link: '/chat-openai-web-search', category: 'Providers', icon: '🔍' },
    { title: 'OpenAI Code Interpreter', link: '/test-openai-code-interpreter', category: 'Providers', icon: '💻' },
    { title: 'OpenAI File Search', link: '/test-openai-file-search', category: 'Providers', icon: '📁' },
    { title: 'OpenAI Image Generation', link: '/test-openai-image-generation', category: 'Providers', icon: '🎨' },
    { title: 'OpenAI Local Shell', link: '/test-openai-local-shell', category: 'Providers', icon: '💻' },
    
    { title: 'Anthropic Code Execution', link: '/chat-anthropic-code-execution', category: 'Providers', icon: '⚙️' },
    { title: 'Anthropic Web Search', link: '/chat-anthropic-web-search', category: 'Providers', icon: '🌐' },
    { title: 'Anthropic Web Fetch', link: '/chat-anthropic-web-fetch', category: 'Providers', icon: '📡' },
    { title: 'Anthropic MCP', link: '/chat-anthropic-mcp', category: 'Providers', icon: '🔌' },
    
    { title: 'Google Test', link: '/test-google', category: 'Providers', icon: '🔵' },
    { title: 'Cohere Test', link: '/test-cohere', category: 'Providers', icon: '🟣' },
    { title: 'Groq Test', link: '/test-groq', category: 'Providers', icon: '🟢' },
    { title: 'Mistral Test', link: '/test-mistral', category: 'Providers', icon: '🔴' },
    { title: 'Perplexity Test', link: '/test-perplexity', category: 'Providers', icon: '🟠' },
    { title: 'XAI Test', link: '/test-xai', category: 'Providers', icon: '⚫' },
    { title: 'Amazon Bedrock', link: '/bedrock', category: 'Providers', icon: '☁️' },
    
    { title: 'MCP Chat', link: '/mcp', category: 'Advanced', icon: '🔗' },
    { title: 'MCP with Auth', link: '/mcp-with-auth', category: 'Advanced', icon: '🔐' },
    { title: 'MCP Zapier', link: '/mcp-zapier', category: 'Advanced', icon: '⚡' },
    { title: 'Dynamic Tools', link: '/dynamic-tools', category: 'Advanced', icon: '🔄' },
    { title: 'Tool Approval', link: '/test-tool-approval', category: 'Advanced', icon: '✅' },
    { title: 'Tool Approval Dynamic', link: '/test-tool-approval-dynamic', category: 'Advanced', icon: '🔄' },
    { title: 'Weather Valibot Tool', link: '/test-weather-valibot', category: 'Advanced', icon: '🌤️' },
    
    { title: 'Use Object', link: '/use-object', category: 'Objects', icon: '📦' },
    { title: 'Use Object Expense Tracker', link: '/use-object-expense-tracker', category: 'Objects', icon: '💰' },
    { title: 'Use Object Valibot', link: '/use-object-valibot', category: 'Objects', icon: '✔️' },
  ];

  const categories = Array.from(new Set(examples.map(e => e.category)));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExamples = examples.filter(example => {
    const matchesCategory = selectedCategory === null || example.category === selectedCategory;
    const matchesSearch = example.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] text-[#f5f5f0] overflow-hidden">
      {/* Modern Sidebar */}
      <div className={`w-72 bg-gradient-to-b from-[#0f0f0f]/95 to-[#080808]/95 backdrop-blur-xl border-r border-[#1a1a1a]/50 flex flex-col transition-all duration-300 ease-out ${
        sidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100'
      } md:relative absolute z-20 h-full shadow-2xl`}>
        {/* Elegant Header */}
        <div className="p-6 border-b border-[#1a1a1a]/50 bg-gradient-to-r from-[#0f0f0f] to-transparent">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold gradient-text mb-1 text-shadow">AI SDK</h1>
              <p className="text-xs text-[#888] font-medium tracking-wide">Examples Gallery</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 hover:bg-[#1a1a1a]/50 rounded-xl transition-all duration-200 hover:scale-110"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5 text-[#666] hover:text-[#f5f5f0] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modern Search */}
        <div className="p-4 border-b border-[#1a1a1a]/30">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 rounded-xl text-[#f5f5f0] placeholder:text-[#666] focus:outline-none focus:border-[#60a5fa]/50 focus:ring-2 focus:ring-[#60a5fa]/20 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Enhanced Categories */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-2 ${
                selectedCategory === null
                  ? 'bg-gradient-to-r from-[#1e3a8a]/80 to-[#1e40af]/80 text-[#f5f5f0] shadow-lg shadow-blue-500/20'
                  : 'text-[#888] hover:bg-[#1a1a1a]/30 hover:text-[#f5f5f0]'
              }`}
            >
              ✨ All Examples
            </button>
            {categories.map(category => (
              <div key={category} className="mb-3">
                <button
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`w-full text-left px-4 py-2 text-xs font-bold text-[#aaa] uppercase tracking-widest transition-all duration-200 hover:text-[#60a5fa] ${
                    selectedCategory === category ? 'text-[#60a5fa]' : ''
                  }`}
                >
                  {category}
                </button>
                {(selectedCategory === null || selectedCategory === category) && (
                  <div className="mt-1 space-y-0.5">
                    {examples
                      .filter(e => e.category === category && (searchQuery === '' || e.title.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map(example => (
                        <Link
                          key={example.link}
                          href={example.link}
                          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-[#ccc] hover:bg-gradient-to-r hover:from-[#1a1a1a]/50 hover:to-transparent hover:text-[#f5f5f0] transition-all duration-200 group"
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform">{example.icon}</span>
                          <span className="flex-1">{example.title}</span>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modern Footer */}
        <div className="p-4 border-t border-[#1a1a1a]/30 bg-gradient-to-t from-[#0f0f0f] to-transparent">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666] font-medium">{examples.length} examples</span>
            <span className="text-[#666]">✨ AI SDK</span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Modern Top Bar */}
        <div className="h-20 glass border-b border-[#1a1a1a]/30 flex items-center justify-between px-6 relative z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-[#1a1a1a]/50 rounded-xl transition-all duration-200 hover:scale-110 hover:rotate-90 group"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-[#888] group-hover:text-[#60a5fa] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#f5f5f0] gradient-text">AI SDK</h2>
              <p className="text-xs text-[#666] font-medium">Powered by Vercel AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#1a1a1a]/50 rounded-full border border-[#2a2a2a]/50">
              <span className="text-xs text-[#60a5fa] font-medium">✨ Modern UI</span>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center mt-32 animate-float">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#1e3a8a]/20 to-[#1e40af]/20 border border-[#1e3a8a]/30 flex items-center justify-center backdrop-blur-sm glow-blue">
                  <svg className="w-12 h-12 text-[#60a5fa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-[#f5f5f0] mb-3 gradient-text text-shadow">How can I help you today?</h3>
                <p className="text-[#888] text-lg font-medium">Start a conversation or ask me anything...</p>
                
                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {['Explain AI', 'Write code', 'Generate idea', 'Help me learn'].map((action, i) => (
                    <button
                      key={i}
                      className="px-5 py-2.5 bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] border border-[#2a2a2a]/50 rounded-xl text-sm text-[#ccc] hover:text-[#f5f5f0] hover:border-[#60a5fa]/50 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div
                  key={m.id}
                  className={`flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {m.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20 hover:scale-110 transition-transform duration-200">
                      <span className="text-sm font-bold">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-3xl px-5 py-4 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-[#f5f5f0] shadow-lg shadow-blue-500/30'
                        : 'bg-[#1a1a1a]/70 border border-[#2a2a2a]/50 text-[#f5f5f0] glass'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                      {m.parts.map(part => {
                        if (part.type === 'text') {
                          return part.text;
                        }
                      })}
                    </div>
                  </div>
                  {m.role === 'user' && (
                    <div className="w-10 h-10 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-200">
                      <span className="text-sm font-bold">You</span>
                    </div>
                  )}
                </div>
              ))
            )}

            {/* Modern Loading Indicator */}
            {(status === 'submitted' || status === 'streaming') && (
              <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                  <span className="text-sm font-bold">AI</span>
                </div>
                <div className="glass border border-[#2a2a2a]/50 rounded-3xl px-5 py-4">
                  <div className="flex gap-2">
                    <span className="w-2.5 h-2.5 bg-[#60a5fa] rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="w-2.5 h-2.5 bg-[#a78bfa] rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="w-2.5 h-2.5 bg-[#f472b6] rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Error Message */}
            {error && (
              <div className="flex gap-4 justify-start animate-in fade-in slide-in-from-bottom-4">
                <div className="w-10 h-10 rounded-2xl bg-red-900/50 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">!</span>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-3xl px-5 py-4 glass">
                  <div className="text-red-400 mb-2 font-medium">An error occurred</div>
                  <button
                    onClick={() => regenerate()}
                    className="text-sm text-red-400 hover:text-red-300 underline font-medium transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modern Input Area */}
        <div className="border-t border-[#1a1a1a]/30 glass p-6 relative z-10">
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

