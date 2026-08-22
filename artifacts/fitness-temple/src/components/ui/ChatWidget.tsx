import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_ACTIONS = [
  { label: "🗺️ Site Tour", message: "Give me a quick tour of this website" },
  { label: "💪 Programs", message: "What programs do you offer?" },
  { label: "💳 Membership", message: "Tell me about membership plans and pricing" },
  { label: "📞 Contact", message: "How can I reach the gym?" },
];

function MessageContent({ text }: { text: string }) {
  const parts = text.split(/(\/(programs|about|gallery|membership|contact)(?=[^a-z]|$))/gi);
  return (
    <span>
      {parts.map((part, i) => {
        if (/^\/(programs|about|gallery|membership|contact)$/i.test(part)) {
          return (
            <Link key={i} href={part} className="underline text-[#E31E24] hover:text-red-400 font-semibold">
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && messages.length === 0) {
      const greeting: Message = {
        role: "assistant",
        content:
          '💪 Welcome to Fitness Temple! I\'m your AI guide. Ask me anything about our programs, trainer, membership — or say "Give me a tour" to explore the whole site. Let\'s go! 🔥',
      };
      setMessages([greeting]);
    }
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = (await res.json()) as { reply?: string; message?: string };
      const reply = data.reply ?? data.message ?? "Sorry, I couldn't respond. Please try again.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      if (!open) setUnread(true);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] group focus:outline-none border-0 p-0 bg-transparent"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={open ? "Close chat" : "Open AI chat assistant"}
      >
        {/* Outer glow ring */}
        <span className="absolute inset-0 rounded-full bg-[#E31E24]/20 animate-ping [animation-duration:2.5s]" />

        {/* Main button */}
        <span
          className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
            open
              ? "bg-[#1a1a1a] border-2 border-[#E31E24] shadow-[0_0_24px_rgba(227,30,36,0.5)]"
              : "bg-gradient-to-br from-[#E31E24] via-[#b8151c] to-[#7a0d12] border-2 border-[#E31E24]/60 shadow-[0_0_30px_rgba(227,30,36,0.4),0_4px_20px_rgba(0,0,0,0.6)]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-[#E31E24]" />
              </motion.div>
            ) : (
              <motion.div
                key="dumbbell"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Dumbbell SVG icon */}
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left weight */}
                  <rect x="2" y="8" width="3" height="8" rx="1" fill="white" opacity="0.9" />
                  <rect x="5" y="6" width="3" height="12" rx="1" fill="white" opacity="0.9" />
                  {/* Bar */}
                  <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="2.2" />
                  {/* Right weight */}
                  <rect x="16" y="6" width="3" height="12" rx="1" fill="white" opacity="0.9" />
                  <rect x="19" y="8" width="3" height="8" rx="1" fill="white" opacity="0.9" />
                </svg>
                {/* Online dot */}
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#E31E24] shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </span>

        {/* Unread badge */}
        {unread && !open && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#E31E24] text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-[#E31E24]"
          >
            1
          </motion.span>
        )}

        {/* Tooltip on hover */}
        {!open && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111] text-white text-xs font-heading uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/10 pointer-events-none">
            Ask AI 💬
          </span>
        )}
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-26 right-4 sm:right-6 z-[9998] flex flex-col bg-[#0a0a0a] border border-[#E31E24]/20 shadow-[0_8px_50px_rgba(227,30,36,0.15),0_8px_40px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{
              width: "min(24rem, calc(100vw - 2rem))",
              maxHeight: "min(600px, calc(100dvh - 9rem))",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#111] via-[#1a0a0a] to-[#111] border-b border-[#E31E24]/15 shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E31E24] to-[#7a0d12] flex items-center justify-center shadow-[0_0_12px_rgba(227,30,36,0.4)]">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#111]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-[13px] uppercase tracking-[0.15em] text-white leading-none">
                  Fitness Temple <span className="text-[#E31E24]">AI</span>
                </p>
                <p className="text-[10px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Online — Ask me anything
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-[#E31E24] transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-[#E31E24]/20 border border-[#E31E24]/30 flex items-center justify-center shrink-0 mb-0.5">
                      <Sparkles className="w-3 h-3 text-[#E31E24]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-br from-[#E31E24] to-[#b8151c] text-white rounded-t-sm rounded-bl-sm"
                        : "bg-[#1a1a1a] text-gray-200 border border-white/8 rounded-t-sm rounded-br-sm"
                    }`}
                  >
                    <MessageContent text={m.content} />
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#E31E24]/20 border border-[#E31E24]/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-[#E31E24]" />
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-t-sm rounded-br-sm px-4 py-3">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#E31E24] animate-bounce"
                          style={{ animationDelay: `${i * 0.14}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick action chips */}
            {messages.length <= 1 && !loading && (
              <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0 border-t border-white/5 pt-3">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => send(a.message)}
                    disabled={loading}
                    className="text-[11px] font-heading uppercase tracking-wider px-3 py-1.5 border border-[#E31E24]/40 text-[#E31E24] hover:bg-[#E31E24] hover:text-white transition-colors disabled:opacity-40 leading-none"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-[#E31E24]/10 bg-[#111] shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything…"
                className="flex-1 bg-[#0a0a0a] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-[#E31E24] focus:outline-none transition-colors"
                disabled={loading}
                maxLength={500}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 shrink-0 bg-gradient-to-br from-[#E31E24] to-[#b8151c] flex items-center justify-center hover:shadow-[0_0_12px_rgba(227,30,36,0.4)] transition-all disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
