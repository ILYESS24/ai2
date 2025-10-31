import { useState } from 'react';

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

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        onSubmit(text);
        setText('');
      }}
      className="relative"
    >
      <div className="flex items-end gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-2 focus-within:border-[#4a9eff] transition-colors">
        <textarea
          className="flex-1 bg-transparent text-[#f5f5f0] placeholder:text-[#666] resize-none outline-none px-3 py-2 max-h-32 overflow-y-auto"
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
              }
            }
          }}
        />
        {stop && (status === 'streaming' || status === 'submitted') ? (
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 bg-[#7f1d1d] hover:bg-[#991b1b] text-[#f5f5f0] rounded-xl transition-colors flex-shrink-0"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={status !== 'ready' || text.trim() === ''}
            className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed text-[#f5f5f0] rounded-xl transition-colors flex-shrink-0"
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
