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
      <div className="flex items-center gap-3 bg-[#000000] border border-[#2a2a2a] rounded-xl px-4 py-3 focus-within:border-[#f5f5f0]/20 transition-all duration-200">
        {/* Paperclip Icon */}
        <button
          type="button"
          className="p-2 hover:bg-[#000000] rounded-lg transition-colors flex-shrink-0"
          aria-label="Attach file"
          title="Attach file"
        >
          <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* + Project Button */}
        <button
          type="button"
          className="px-3 py-1.5 bg-[#000000] hover:bg-[#000000] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f0] font-light transition-colors flex-shrink-0"
        >
          + Project
        </button>

        {/* Text Input */}
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent text-[#f5f5f0] placeholder:text-[#666] resize-none outline-none py-2 max-h-32 overflow-y-auto text-sm leading-relaxed font-light"
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

        {/* Send Button */}
        {stop && (status === 'streaming' || status === 'submitted') ? (
          <button
            type="button"
            onClick={stop}
            className="w-10 h-10 bg-[#000000] hover:bg-[#000000] border border-[#2a2a2a] rounded-full flex items-center justify-center transition-all flex-shrink-0"
            aria-label="Stop"
            title="Stop"
          >
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={status !== 'ready' || text.trim() === ''}
            className="w-10 h-10 bg-[#f5f5f0] hover:bg-[#e8e8e3] disabled:opacity-50 disabled:cursor-not-allowed text-[#0a0a0a] rounded-full flex items-center justify-center transition-all flex-shrink-0 disabled:hover:bg-[#f5f5f0]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
