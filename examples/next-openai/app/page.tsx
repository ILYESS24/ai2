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
  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#f5f5f0] mb-4">
            AI SDK Examples
          </h1>
          <p className="text-xl text-[#e8e8e3]">
            Next.js OpenAI Integration Examples
          </p>
        </div>

        <div className="space-y-8">
          {categories.map(category => {
            const categoryExamples = examples.filter(e => e.category === category);
            return (
              <div key={category} className="bg-[#1a1a1a] rounded-lg shadow-lg border border-[#2a2a2a] p-6">
                <h2 className="text-2xl font-semibold text-[#f5f5f0] mb-4 border-b border-[#3a3a3a] pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryExamples.map((example, index) => (
                    <Link
                      key={example.link}
                      href={example.link}
                      className="block p-4 rounded-lg border border-[#2a2a2a] hover:border-[#4a9eff] hover:bg-[#2a2a2a] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#888] text-sm font-mono w-6">
                          {index + 1}.
                        </span>
                        <span className="text-[#f5f5f0] group-hover:text-[#6bb0ff] font-medium">
                          {example.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-[#888] text-sm">
          <p>Total: {examples.length} examples available</p>
        </div>
      </div>
    </main>
  );
}
