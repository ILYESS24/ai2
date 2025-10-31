'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 bg-[#0f0f0f] border-r border-[#1a1a1a] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#1a1a1a]">
            <h1 className="text-xl font-bold text-[#f5f5f0] mb-1">AI SDK</h1>
            <p className="text-xs text-[#888]">Examples Gallery</p>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-[#0f0f0f] border-b border-[#1a1a1a] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              aria-label="Toggle sidebar"
              title="Toggle sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-[#f5f5f0]">AI SDK Examples</h2>
          </div>
          <div className="text-sm text-[#888]">Next.js OpenAI Integration</div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#f5f5f0] mb-3">
                AI SDK Examples
              </h1>
              <p className="text-lg text-[#888]">
                Explore {examples.length} examples of AI integrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(selectedCategory === null
                ? examples
                : examples.filter(e => e.category === selectedCategory)
              ).map((example, index) => (
                <Link
                  key={example.link}
                  href={example.link}
                  className="block p-5 bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg hover:border-[#4a9eff] hover:bg-[#151515] transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-xs font-mono text-[#666] group-hover:bg-[#1e3a8a] group-hover:text-[#f5f5f0] transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#f5f5f0] group-hover:text-[#6bb0ff] transition-colors mb-1">
                        {example.title}
                      </h3>
                      <p className="text-xs text-[#666] uppercase">{example.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
