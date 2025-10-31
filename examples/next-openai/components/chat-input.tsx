import { useState, useRef, useEffect } from 'react';

export default function ChatInput({
  status,
  onSubmit,
  stop,
}: {
  status: string;
  onSubmit: (text: string) => void;
  stop?: () => void;
}) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        onSubmit(text);
        setText('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }}
      className="relative"
    >
      <div className="flex items-end gap-3 bg-[#1a1a1a]/70 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-2xl p-3 focus-within:border-[#60a5fa]/50 focus-within:ring-2 focus-within:ring-[#60a5fa]/20 transition-all duration-200 hover:border-[#2a2a2a] shadow-xl">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent text-[#f5f5f0] placeholder:text-[#666] resize-none outline-none px-3 py-2 max-h-32 overflow-y-auto text-sm leading-relaxed custom-scrollbar"
          placeholder="Type your message..."
          disabled={status !== 'ready'}
          value={text}
          onChange={e => setText(e.target.value)}
          rows={1}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (text.trim() !== '' && status === 'ready') {
                onSubmit(text);
                setText('');
                if (textareaRef.current) {
                  textareaRef.current.style.height = 'auto';
                }
              }
            }
          }}
        />
        {stop && (status === 'streaming' || status === 'submitted') ? (
          <button
            type="button"
            onClick={stop}
            className="px-5 py-2.5 bg-gradient-to-r from-red-900/80 to-red-800/80 hover:from-red-800 hover:to-red-700 text-[#f5f5f0] rounded-xl transition-all duration-200 flex-shrink-0 font-medium shadow-lg hover:scale-105 hover:shadow-red-500/20"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={status !== 'ready' || text.trim() === ''}
            className="px-5 py-2.5 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed text-[#f5f5f0] rounded-xl transition-all duration-200 flex-shrink-0 font-medium shadow-lg hover:scale-105 hover:shadow-blue-500/30 disabled:hover:scale-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-[#666]">
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 rounded">Enter</kbd>
          <span>to send</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-1 bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 rounded">Shift</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-[#1a1a1a]/50 border border-[#2a2a2a]/50 rounded">Enter</kbd>
          <span>for new line</span>
        </span>
      </div>
    </form>
  );
}
