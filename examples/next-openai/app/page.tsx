'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '@/components/chat-input';
import Link from 'next/link';

export default function Home() {
  const [showPremiumBanner, setShowPremiumBanner] = useState(true);
  const { error, status, sendMessage, messages, regenerate, stop } = useChat();

  const suggestions = [
    'Generate a SaaS pricing calculator',
    'How can I structure LLM output?',
    'Calculate the factorial of a number'
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden font-['Poppins']">
      {/* Minimalist Sidebar */}
      <div className="w-16 bg-[#0f0f0f] border-r border-[#1a1a1a]/30 flex flex-col items-center py-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#f5f5f0] flex items-center justify-center">
            <span className="text-[#0a0a0a] text-xs font-bold">V2</span>
          </div>
        </div>

        {/* Icons Stack */}
        <div className="flex flex-col gap-6 flex-1">
          <button className="w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors" aria-label="New" title="New">
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors" aria-label="History" title="History">
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors" aria-label="Projects" title="Projects">
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </button>
          <button className="w-10 h-10 rounded-lg hover:bg-[#1a1a1a] flex items-center justify-center transition-colors" aria-label="Bookmarks" title="Bookmarks">
            <svg className="w-5 h-5 text-[#f5f5f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
          <svg className="w-6 h-6 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Vector Pattern Background */}
        <div className="absolute inset-0 vector-pattern opacity-30 pointer-events-none"></div>

        {/* Public Beta Tag */}
        <div className="absolute top-6 right-6 z-10">
          <span className="px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-xs text-[#888] font-light">
            Public Beta
          </span>
        </div>

        {/* Centered Content */}
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

            {/* Premium Banner */}
            {showPremiumBanner && (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-[#888] font-light">
                  Need more messages? Get higher limits with Premium.
                </span>
                <div className="flex items-center gap-3">
                  <button className="text-sm text-[#60a5fa] hover:text-[#93c5fd] font-medium transition-colors">
                    Upgrade Plan
                  </button>
                  <button
                    onClick={() => setShowPremiumBanner(false)}
                    className="w-5 h-5 flex items-center justify-center text-[#666] hover:text-[#f5f5f0] transition-colors"
                    aria-label="Close banner"
                    title="Close banner"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Input Box */}
            <ChatInput status={status} onSubmit={text => sendMessage({ text })} stop={stop} />

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-[#f5f5f0] font-light hover:bg-[#1f1f1f] hover:border-[#2a2a2a] transition-all flex items-center gap-2"
                  onClick={() => sendMessage({ text: suggestion })}
                >
                  <span>{suggestion}</span>
                  <svg className="w-4 h-4 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="border-t border-[#1a1a1a]/30 py-6 relative z-10">
          <div className="flex items-center justify-center gap-6 text-sm text-[#666] font-light">
            <Link href="#" className="hover:text-[#f5f5f0] transition-colors">FAQ</Link>
            <Link href="#" className="hover:text-[#f5f5f0] transition-colors">Terms</Link>
            <Link href="#" className="hover:text-[#f5f5f0] transition-colors">AI Policy</Link>
            <Link href="#" className="hover:text-[#f5f5f0] transition-colors">Privacy</Link>
            <Link href="https://vercel.com" target="_blank" className="hover:text-[#f5f5f0] transition-colors flex items-center gap-1">
              Vercel
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
