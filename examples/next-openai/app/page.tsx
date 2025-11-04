'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import Link from 'next/link';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'examples' | 'history' | 'projects' | 'bookmarks' | null>(null);
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
  const [conversations, setConversations] = useState<string[]>(['Conversation 1', 'Conversation 2', 'Conversation 3']);
  const [projects, setProjects] = useState<string[]>(['Project Alpha', 'Project Beta']);
  const [bookmarks, setBookmarks] = useState<string[]>(['Bookmark 1', 'Bookmark 2']);

  const filteredExamples = examples.filter(example => {
    const matchesCategory = selectedCategory === null || example.category === selectedCategory;
    const matchesSearch = searchQuery === '' || example.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const suggestions = [
    'Generate a SaaS pricing calculator',
    'How can I structure LLM output?',
    'Calculate the factorial of a number'
  ];

  const handleNewConversation = () => {
    const newConv = `Conversation ${conversations.length + 1}`;
    setConversations([newConv, ...conversations]);
    setSidebarMode('history');
    setSidebarExpanded(true);
  };

  const handleSidebarClick = (mode: 'examples' | 'history' | 'projects' | 'bookmarks') => {
    if (sidebarMode === mode && sidebarExpanded) {
      setSidebarExpanded(false);
    } else {
      setSidebarMode(mode);
      setSidebarExpanded(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#000000] text-[#f5f5f0] overflow-hidden font-['Poppins']">
      {/* Minimalist Sidebar */}
      <div className="w-16 bg-[#000000] border-r border-[#1a1a1a]/30 flex flex-col items-center py-6 relative z-30">
        {/* Icons Stack */}
        <div className="flex flex-col gap-6 flex-1 mt-8">
          <button 
            onClick={handleNewConversation}
            className={`w-10 h-10 rounded-lg hover:bg-[#000000] flex items-center justify-center transition-colors ${sidebarMode === 'history' ? 'bg-[#000000]' : ''}`}
            aria-label="New Conversation" 
            title="New Conversation"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button 
            onClick={() => handleSidebarClick('history')}
            className={`w-10 h-10 rounded-lg hover:bg-[#000000] flex items-center justify-center transition-colors ${sidebarMode === 'history' ? 'bg-[#000000]' : ''}`}
            aria-label="History" 
            title="History"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button 
            onClick={() => handleSidebarClick('examples')}
            className={`w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors ${sidebarMode === 'examples' ? 'bg-[#1a1a1a]' : ''}`}
            aria-label="Examples" 
            title="Examples"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </button>
          <button 
            onClick={() => handleSidebarClick('projects')}
            className={`w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors ${sidebarMode === 'projects' ? 'bg-[#1a1a1a]' : ''}`}
            aria-label="Projects" 
            title="Projects"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>
          <button 
            onClick={() => handleSidebarClick('bookmarks')}
            className={`w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors ${sidebarMode === 'bookmarks' ? 'bg-[#1a1a1a]' : ''}`}
            aria-label="Bookmarks" 
            title="Bookmarks"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable Sidebar */}
      {sidebarExpanded && (
        <div className="w-80 bg-[#000000] border-r border-[#1a1a1a]/30 flex flex-col transition-all duration-300 ease-out relative z-20 h-full">
          {sidebarMode === 'examples' && (
            <>
              {/* Header */}
              <div className="px-6 py-6 border-b border-[#1a1a1a]/30">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-semibold text-[#f5f5f0] tracking-tight">AI SDK Examples</h1>
                  <button
                    onClick={() => setSidebarExpanded(false)}
                    className="p-1.5 hover:bg-[#000000] rounded-lg transition-colors"
                    aria-label="Close sidebar"
                  >
                    <svg className="w-5 h-5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-[#888] font-light">Explore {examples.length} examples</p>
              </div>

              {/* Search */}
              <div className="px-6 py-4 border-b border-[#1a1a1a]/30">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search examples..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#000000] border border-[#2a2a2a] rounded-lg text-[#f5f5f0] placeholder:text-[#666] focus:outline-none focus:border-[#f5f5f0]/20 transition-all text-sm font-light"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="px-4 py-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-2 ${
                      selectedCategory === null
                        ? 'bg-[#000000] text-[#f5f5f0]'
                        : 'text-[#888] hover:bg-[#000000] hover:text-[#f5f5f0]'
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
                                className="block px-4 py-2.5 rounded-lg text-sm text-[#ccc] hover:bg-[#000000] hover:text-[#f5f5f0] transition-all duration-200 font-light"
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

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#1a1a1a]/30">
                <div className="text-xs text-[#666] font-light">
                  {filteredExamples.length} of {examples.length} examples
                </div>
              </div>
            </>
          )}

          {sidebarMode === 'history' && (
            <>
              <div className="px-6 py-6 border-b border-[#1a1a1a]/30">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-semibold text-[#f5f5f0] tracking-tight">History</h1>
                  <button
                    onClick={() => setSidebarExpanded(false)}
                    className="p-1.5 hover:bg-[#000000] rounded-lg transition-colors"
                    aria-label="Close sidebar"
                  >
                    <svg className="w-5 h-5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 border-b border-[#1a1a1a]/30">
                <button
                  onClick={handleNewConversation}
                  className="w-full px-4 py-2.5 bg-[#000000] hover:bg-[#000000] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f0] font-medium transition-colors text-left"
                >
                  + New Chat
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
                <div className="space-y-1">
                  {conversations.map((conv, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#ccc] hover:bg-[#000000] hover:text-[#f5f5f0] transition-colors font-light"
                    >
                      {conv}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {sidebarMode === 'projects' && (
            <>
              <div className="px-6 py-6 border-b border-[#1a1a1a]/30">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-semibold text-[#f5f5f0] tracking-tight">Projects</h1>
                  <button
                    onClick={() => setSidebarExpanded(false)}
                    className="p-1.5 hover:bg-[#000000] rounded-lg transition-colors"
                    aria-label="Close sidebar"
                  >
                    <svg className="w-5 h-5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
                <div className="space-y-1">
                  {projects.map((project, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#ccc] hover:bg-[#000000] hover:text-[#f5f5f0] transition-colors font-light"
                    >
                      {project}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {sidebarMode === 'bookmarks' && (
            <>
              <div className="px-6 py-6 border-b border-[#1a1a1a]/30">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-xl font-semibold text-[#f5f5f0] tracking-tight">Bookmarks</h1>
                  <button
                    onClick={() => setSidebarExpanded(false)}
                    className="p-1.5 hover:bg-[#000000] rounded-lg transition-colors"
                    aria-label="Close sidebar"
                  >
                    <svg className="w-5 h-5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4">
                <div className="space-y-1">
                  {bookmarks.map((bookmark, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#ccc] hover:bg-[#000000] hover:text-[#f5f5f0] transition-colors font-light"
                    >
                      {bookmark}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Background Ripple Effect */}
        <BackgroundRippleEffect 
          rows={Math.ceil(typeof window !== 'undefined' ? window.innerHeight / 50 : 20)}
          cols={Math.ceil(typeof window !== 'undefined' ? window.innerWidth / 50 : 30)}
          cellSize={50}
        />

        {/* Messages Area (when there are messages) */}
        {messages.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-8 relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-4 ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-[#f5f5f0]">AI</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-6 py-4 ${
                      m.role === 'user'
                        ? 'bg-[#000000] border border-[#2a2a2a] text-[#f5f5f0]'
                        : 'bg-[#000000] border border-[#2a2a2a] text-[#f5f5f0]'
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
                    <div className="w-10 h-10 rounded-xl bg-[#000000] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-[#f5f5f0]">You</span>
                    </div>
                  )}
        </div>
      ))}

              {/* Loading Indicator */}
      {(status === 'submitted' || status === 'streaming') && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-[#f5f5f0]">AI</span>
                  </div>
                  <div className="bg-[#000000] border border-[#2a2a2a] rounded-2xl px-6 py-4">
                    <div className="flex gap-2">
                      <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-2 h-2 bg-[#888] rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                  </div>
        </div>
      )}

              {/* Error Message */}
      {error && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-[#f5f5f0]">!</span>
                  </div>
                  <div className="bg-[#000000] border border-[#2a2a2a] rounded-2xl px-6 py-4">
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
        ) : (
          /* Centered Welcome Content */
          <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
            <div className="max-w-3xl w-full space-y-8">
              {/* Title */}
              <div className="text-center space-y-3">
                <h1 className="text-5xl font-semibold text-[#f5f5f0] tracking-tight">
                  What can I help you ship?
                </h1>
                <p className="text-lg text-[#888] font-light">
                  Generate UI, ask questions, debug, execute code, and much more.
                </p>
              </div>

              {/* Input Box - Centered */}
              <div className="space-y-4">
                <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />

                {/* Suggestion Chips */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="px-3 py-1.5 bg-[#000000] border border-[#2a2a2a] rounded-full text-xs text-[#f5f5f0] font-light hover:bg-[#0a0a0a] hover:border-[#2a2a2a] transition-all flex items-center gap-1.5"
                      onClick={() => sendMessage({ text: suggestion })}
                    >
                      <span>{suggestion}</span>
                      <svg className="w-3 h-3 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Box for when there are messages */}
        {messages.length > 0 && (
          <div className="p-6 relative z-10">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-3xl space-y-4">
                <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />
              </div>
            </div>
        </div>
      )}

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
