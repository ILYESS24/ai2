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
    >
      <input
        className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f5f0] placeholder:text-[#666] rounded shadow-xl focus:outline-none focus:border-[#4a9eff]"
        placeholder="Say something..."
        disabled={status !== 'ready'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {stop && (status === 'streaming' || status === 'submitted') && (
        <button
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-[#2a2a2a] bg-[#1a1a1a] text-[#f5f5f0] rounded shadow-xl hover:bg-[#2a2a2a] transition-colors"
          type="submit"
          onClick={stop}
        >
          Stop
        </button>
      )}
    </form>
  );
}
