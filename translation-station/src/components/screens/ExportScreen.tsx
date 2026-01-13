"use client";

import { useState } from "react";
import { useTranslation } from "@/context/TranslationContext";

export default function ExportScreen() {
  const { state, goToScreen, reset } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (state.generatedPrompt?.machineReadable) {
      try {
        await navigator.clipboard.writeText(
          state.generatedPrompt.machineReadable
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleTranslateAnother = () => {
    reset();
    goToScreen("upload");
  };

  return (
    <div className="bg-background-light font-display text-[#111418] antialiased">
      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center bg-background-light p-4 pb-2 justify-between border-b border-[#e5e7eb]">
          <button
            onClick={() => goToScreen("review")}
            className="text-[#111418] flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Your Blueprint
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 gap-6 pb-24">
          {/* App Concept Card */}
          <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-[#e5e7eb]">
            <div className="relative h-48 w-full bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
              {/* Blueprint style background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              {/* Wireframe illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-40 border-2 border-white/30 rounded-xl flex flex-col p-2 gap-1">
                  <div className="w-full h-3 bg-white/20 rounded"></div>
                  <div className="w-2/3 h-2 bg-white/15 rounded"></div>
                  <div className="flex-1 flex flex-col gap-1 mt-1">
                    <div className="w-full h-6 bg-white/10 rounded"></div>
                    <div className="w-full h-6 bg-white/10 rounded"></div>
                    <div className="w-full h-6 bg-white/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-4 gap-2">
              <div className="flex items-center gap-2">
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
                  className="text-primary"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <p className="text-[#111418] tracking-tight text-xl font-bold leading-tight">
                  App Concept
                </p>
              </div>
              <p className="text-[#637588] text-sm font-medium leading-relaxed">
                {state.specification.summary ||
                  "A productivity tracker designed specifically for freelance artists to log hours, manage client projects, and visualize earnings efficiently."}
              </p>
            </div>
          </div>

          {/* Optimized AI Prompt Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
                Optimized AI Prompt
              </h2>
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary uppercase tracking-wide">
                Ready to Code
              </span>
            </div>

            {/* Prompt Card */}
            <div className="relative flex flex-col rounded-xl bg-white border border-[#e5e7eb] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-[#f9fafb] px-4 py-3">
                <span className="text-[#637588] text-xs font-mono font-medium">
                  prompt.txt
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e5e7eb]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e5e7eb]"></div>
                </div>
              </div>

              {/* Prompt Content */}
              <div className="p-4 max-h-[320px] overflow-y-auto scrollbar-thin">
                <pre className="text-[#111418] text-sm font-mono leading-relaxed select-text whitespace-pre-wrap">
                  {state.generatedPrompt?.machineReadable ||
                    `You are an expert SwiftUI developer. Build a mobile app that allows users to track hours spent on creative projects. The app should be built using SwiftUI and Swift 5.

Key Features:
1. **Dashboard:** A clean home screen showing a weekly summary of hours logged and total earnings.
2. **Project Management:** Users can create projects with a name, hourly rate, and client name.
3. **Timer:** A prominent timer toggle to start/stop tracking for a specific project.
4. **History:** A list view of past sessions with edit capabilities.

Design Requirements:
- Use a dark mode-first color scheme.
- Ensure the UI is minimalist with high contrast.
- Use San Francisco font (system font).
- No external dependencies if possible.

Please provide the full Xcode project structure and the main View files.`}
                </pre>
              </div>
            </div>

            <p className="text-[#637588] text-xs px-1">
              Copy this prompt and paste it into your preferred AI coding tool
              (ChatGPT, Claude, etc.) to generate your codebase.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              Next Steps
            </h3>
            <ol className="text-sm text-slate-600 space-y-2 ml-6 list-decimal">
              <li>Copy the prompt above using the button below</li>
              <li>Open your preferred AI coding tool (Claude, ChatGPT, etc.)</li>
              <li>Paste the prompt and let the AI generate your app code</li>
              <li>Review and customize the generated code as needed</li>
            </ol>
          </div>

          {/* Translate Another */}
          <button
            onClick={handleTranslateAnother}
            className="text-primary text-sm font-semibold hover:underline text-center"
          >
            Translate Another Idea
          </button>
        </div>

        {/* Footer Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light border-t border-[#e5e7eb] z-20">
          <button
            onClick={handleCopy}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 bg-primary text-white gap-2 px-6 shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors active:scale-[0.98]"
          >
            {copied ? (
              <>
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
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-base font-bold leading-normal tracking-[0.015em]">
                  Copied to Clipboard!
                </span>
              </>
            ) : (
              <>
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
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                <span className="text-base font-bold leading-normal tracking-[0.015em]">
                  Copy Prompt to Clipboard
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
