"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/context/TranslationContext";
import { ClarificationMessage } from "@/types";

// Mock clarification questions for demo
const mockQuestions = [
  {
    question:
      'I see a button labeled "Go" in your sketch. What should happen when a user taps it?',
    suggestions: ["Go to next screen", "Submit form", "Show loading"],
  },
  {
    question:
      "Now regarding the list below the header: should that display recent activity or saved items?",
    suggestions: ["Recent Activity", "Saved Items", "User's Choice"],
  },
  {
    question: "What type of authentication would you prefer for this app?",
    suggestions: ["Email/Password", "Social Login", "Both"],
  },
  {
    question: "Should the app support offline mode?",
    suggestions: ["Yes, with sync", "No, online only", "Limited offline"],
  },
  {
    question: "What color scheme fits your brand best?",
    suggestions: ["Light mode", "Dark mode", "System preference"],
  },
];

export default function ClarificationScreen() {
  const { state, goToScreen, addMessage, setSpecification, setLoading } =
    useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.clarificationMessages]);

  // Initialize with first question
  useEffect(() => {
    if (state.clarificationMessages.length === 0 && mockQuestions.length > 0) {
      const initialMessage: ClarificationMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: mockQuestions[0].question,
        timestamp: new Date(),
        suggestions: mockQuestions[0].suggestions,
      };
      addMessage(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: ClarificationMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInputValue("");

    // Move to next question or finish
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    if (nextIndex < mockQuestions.length) {
      // Add next AI question after a delay
      setTimeout(() => {
        const aiMessage: ClarificationMessage = {
          id: `msg-${Date.now()}-ai`,
          role: "assistant",
          content: mockQuestions[nextIndex].question,
          timestamp: new Date(),
          suggestions: mockQuestions[nextIndex].suggestions,
        };
        addMessage(aiMessage);
      }, 800);
    } else {
      // All questions answered, move to review
      setLoading(true);
      setTimeout(() => {
        // Generate mock specification based on answers
        setSpecification({
          summary:
            "A calm, content-first social feed application designed for travelers. The layout focuses on large imagery with minimal distractions, emphasizing discovery and exploration.",
          mainParts: [
            {
              id: "1",
              name: "Feed Component",
              description:
                "Vertical scroll with infinite pagination logic detected.",
            },
            {
              id: "2",
              name: "Search & Discovery",
              description: "Top bar search input with filter capabilities.",
            },
            {
              id: "3",
              name: "Style Profile",
              description: "Clean, modern aesthetic with generous whitespace.",
            },
          ],
          style: "Clean, modern aesthetic with generous whitespace",
          wireframeUrl: "/wireframe-preview.png",
        });
        setLoading(false);
        goToScreen("review");
      }, 1500);
    }
  };

  const progress = Math.round(
    ((currentQuestionIndex + 1) / mockQuestions.length) * 100
  );

  return (
    <div className="bg-background-light font-display text-slate-900 h-screen flex flex-col overflow-hidden selection:bg-primary/30">
      {/* Header */}
      <header className="shrink-0 bg-surface-light border-b border-slate-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => goToScreen("upload")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-600"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-base font-bold leading-tight text-slate-900">
              Refining Your Idea
            </h1>
            <p className="text-xs text-slate-500 font-medium">AI Assistant</p>
          </div>
          <button
            onClick={() => goToScreen("upload")}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-600"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-slate-500">
              Clarifying {Math.min(currentQuestionIndex + 1, mockQuestions.length)} of{" "}
              {mockQuestions.length}
            </span>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 space-y-6 bg-background-light">
        {/* Visual Context Card */}
        {state.uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
              Visual Context
            </p>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
              <div
                className="w-16 h-16 bg-center bg-cover rounded-lg shrink-0 border border-slate-100"
                style={{
                  backgroundImage: `url(${state.uploadedFiles[0]?.preview})`,
                }}
              />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm font-bold truncate text-slate-900">
                  {state.uploadedFiles[0]?.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Tap to view full image details
                </p>
              </div>
              <button className="p-2 text-primary hover:bg-blue-50 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="flex justify-center">
          <span className="text-xs font-medium text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">
            Today,{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Messages */}
        {state.clarificationMessages.map((message, index) => (
          <div key={message.id}>
            {message.role === "assistant" ? (
              <div className="flex items-end gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1 max-w-[85%]">
                  <span className="text-xs text-slate-500 ml-1">
                    AI Assistant
                  </span>
                  <div className="bg-white p-3.5 rounded-2xl rounded-bl-none shadow-sm border border-slate-200">
                    <p className="text-sm leading-relaxed text-slate-800">
                      {message.content}
                    </p>
                  </div>
                  {/* Suggestions */}
                  {message.suggestions &&
                    index === state.clarificationMessages.length - 1 && (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-1 w-full scrollbar-hide">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(suggestion)}
                            className="whitespace-nowrap px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-full transition-colors shadow-sm"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row-reverse items-end gap-3">
                <div className="flex flex-col gap-1 items-end max-w-[85%]">
                  <span className="text-xs text-slate-500 mr-1">You</span>
                  <div className="bg-primary p-3.5 rounded-2xl rounded-br-none shadow-sm">
                    <p className="text-sm leading-relaxed text-white">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {state.isLoading && (
          <div className="flex items-end gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />
                <path d="M9 13v2" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 max-w-[85%]">
              <span className="text-xs text-slate-500 ml-1">AI Assistant</span>
              <div className="bg-white p-3.5 rounded-2xl rounded-bl-none shadow-sm border border-slate-200">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input Footer */}
      <footer className="fixed bottom-0 w-full max-w-md mx-auto bg-surface-light border-t border-slate-200 p-4 pb-6 z-20">
        <div className="flex items-end gap-3">
          <button className="p-2.5 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
              <line x1="16" x2="22" y1="5" y2="5" />
              <line x1="19" x2="19" y1="2" y2="8" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full bg-slate-100 text-slate-900 placeholder-slate-500 text-sm rounded-3xl py-3 pl-4 pr-10 border-none focus:ring-2 focus:ring-primary/50 resize-none overflow-hidden"
              placeholder="Type your answer..."
              rows={1}
              style={{ minHeight: "44px" }}
            />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className={`h-11 w-11 flex items-center justify-center rounded-full shadow-lg transition-all shrink-0 ${
              inputValue.trim()
                ? "bg-primary hover:bg-blue-600 text-white shadow-blue-500/20"
                : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-0.5"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}
