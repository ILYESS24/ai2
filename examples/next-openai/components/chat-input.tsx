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
      <div className="flex items-end gap-3 bg-[#1a1a1a] border subtle-border rounded-2xl p-3 focus-within:border-[#f5f5f0]/20 focus-within:bg-[#1a1a1a] transition-all duration-200 modern-shadow">
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent text-[#f5f5f0] placeholder:text-[#666] resize-none outline-none px-4 py-3 max-h-32 overflow-y-auto text-sm leading-relaxed font-light custom-scrollbar"
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
            className="px-5 py-3 bg-[#1a1a1a] hover:bg-[#0f0f0f] border subtle-border text-[#f5f5f0] rounded-xl transition-all duration-200 flex-shrink-0 font-medium modern-shadow hover:border-[#f5f5f0]/20"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={status !== 'ready' || text.trim() === ''}
            className="px-5 py-3 bg-[#f5f5f0] hover:bg-[#e8e8e3] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0a0a] rounded-xl transition-all duration-200 flex-shrink-0 font-semibold modern-shadow disabled:hover:bg-[#f5f5f0]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
