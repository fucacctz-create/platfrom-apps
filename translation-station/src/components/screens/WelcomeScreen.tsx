"use client";

import { useTranslation } from "@/context/TranslationContext";
import themeConfig from "@/config/theme";

export default function WelcomeScreen() {
  const { goToScreen } = useTranslation();

  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Top Bar - Skip Button */}
      <div className="flex w-full items-center justify-end px-6 pt-12 pb-2">
        <button
          onClick={() => goToScreen("upload")}
          className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors dark:text-slate-400"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 -mt-10">
        {/* Hero Illustration */}
        <div className="mb-10 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-2xl bg-white p-8 shadow-sm dark:bg-slate-800/50">
          <div className="h-full w-full flex items-center justify-center">
            {/* Lightbulb + Code Icon SVG */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-90"
            >
              {/* Background */}
              <rect
                x="20"
                y="20"
                width="160"
                height="160"
                rx="16"
                fill="#FED7AA"
              />
              {/* Code bracket */}
              <rect
                x="40"
                y="70"
                width="50"
                height="60"
                rx="8"
                fill="white"
                stroke="#E5E7EB"
                strokeWidth="2"
              />
              <path
                d="M55 90 L48 100 L55 110"
                stroke="#2b8cee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M75 90 L82 100 L75 110"
                stroke="#2b8cee"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lightbulb */}
              <ellipse cx="130" cy="90" rx="35" ry="40" fill="#FCD34D" />
              <rect x="115" y="125" width="30" height="10" rx="2" fill="#9CA3AF" />
              <rect x="118" y="135" width="24" height="6" rx="2" fill="#6B7280" />
              <rect x="121" y="141" width="18" height="4" rx="2" fill="#4B5563" />
              {/* Filament */}
              <path
                d="M125 75 Q130 85 125 95 Q130 105 125 115"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M135 75 Q130 85 135 95 Q130 105 135 115"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center mb-4 px-2">
          From Dream to Code
        </h1>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed text-center max-w-[320px]">
          {themeConfig.brand.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex w-full flex-col items-center gap-8 px-6 pb-12 pt-4">
        {/* Page Indicators */}
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="h-2 rounded-full bg-primary w-8 transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-[#dbe0e6] dark:bg-slate-700"></div>
          <div className="h-2 w-2 rounded-full bg-[#dbe0e6] dark:bg-slate-700"></div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => goToScreen("upload")}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 px-6 text-white font-semibold text-lg hover:bg-primary-hover active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-primary/30 shadow-sm shadow-primary/20"
        >
          <span>Let&apos;s Go</span>
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
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
