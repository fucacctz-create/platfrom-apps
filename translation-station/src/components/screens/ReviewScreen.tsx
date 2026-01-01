"use client";

import { useTranslation } from "@/context/TranslationContext";

export default function ReviewScreen() {
  const {
    state,
    goToScreen,
    updateSummary,
    updateMainPart,
    updateStyle,
    setGeneratedPrompt,
    setLoading,
  } = useTranslation();

  const handleConfirm = () => {
    setLoading(true);

    // Generate the prompt based on specification
    const prompt = generatePrompt();
    setGeneratedPrompt(prompt);

    setTimeout(() => {
      setLoading(false);
      goToScreen("export");
    }, 1000);
  };

  const generatePrompt = () => {
    const { specification } = state;

    const humanReadable = {
      summary: specification.summary,
      mainParts: specification.mainParts.map(
        (p) => `${p.name}: ${p.description}`
      ),
      style: specification.style,
    };

    const machineReadable = `You are an expert mobile app developer. Build a mobile application based on the following specification:

## Summary
${specification.summary}

## Key Features
${specification.mainParts.map((p, i) => `${i + 1}. **${p.name}:** ${p.description}`).join("\n")}

## Design Requirements
- Style: ${specification.style}
- Ensure the UI is responsive and follows mobile-first principles
- Use modern UI patterns and best practices
- Implement smooth animations and transitions
- Ensure accessibility compliance

## Technical Requirements
- Build using React Native or SwiftUI (based on target platform)
- Implement proper state management
- Follow clean architecture principles
- Include error handling and loading states
- Write clean, maintainable code with comments

Please provide the complete project structure and implementation files.`;

    return { humanReadable, machineReadable };
  };

  return (
    <div className="bg-background-light font-display text-slate-900 antialiased selection:bg-primary/30">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden pb-28 max-w-lg mx-auto w-full bg-white shadow-2xl shadow-slate-200/50">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100 transition-all">
          <button
            onClick={() => goToScreen("clarification")}
            className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors group"
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
              className="group-hover:-translate-x-0.5 transition-transform"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
            Review Your App
          </h2>
        </div>

        {/* Progress Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
          <div className="h-1.5 w-8 rounded-full bg-primary"></div>
          <div className="h-1.5 w-8 rounded-full bg-primary ring-2 ring-primary/30"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-slate-200"></div>
        </div>

        <div className="flex flex-col gap-6 px-4">
          {/* Wireframe Preview Card */}
          <div className="w-full">
            <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-200 bg-surface-light">
              <div className="relative w-full aspect-[3/4] bg-slate-50 overflow-hidden group">
                {/* Wireframe illustration */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="w-48 h-80 bg-white rounded-3xl shadow-xl border border-slate-200 p-3 flex flex-col">
                    {/* Phone screen mockup */}
                    <div className="w-full h-6 bg-slate-100 rounded-lg mb-2 flex items-center justify-center">
                      <div className="w-16 h-1.5 bg-slate-300 rounded-full"></div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="w-full h-8 bg-slate-100 rounded-lg"></div>
                      <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                      <div className="w-full h-24 bg-slate-100 rounded-lg"></div>
                      <div className="w-full h-24 bg-slate-100 rounded-lg"></div>
                      <div className="w-full h-24 bg-slate-100 rounded-lg"></div>
                    </div>
                    <div className="w-full h-12 bg-slate-100 rounded-lg mt-2 flex items-center justify-around">
                      <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                      <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                      <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <button className="bg-white/90 hover:bg-white backdrop-blur-md text-slate-800 shadow-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                      <path d="M11 8v6" />
                      <path d="M8 11h6" />
                    </svg>
                    Tap to zoom
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">
                    Wireframe v1.0
                  </p>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    Validated
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-slate-500 text-sm font-normal">
                    Generated based on your description and clarifications.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Interpretation */}
          <div className="flex flex-col gap-3">
            <h2 className="text-slate-900 tracking-tight text-xl font-bold leading-tight pt-2">
              AI Interpretation
            </h2>
            <div className="bg-surface-light rounded-xl p-5 border border-slate-200 shadow-sm">
              {/* Summary */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                  Summary
                </label>
                <textarea
                  value={state.specification.summary}
                  onChange={(e) => updateSummary(e.target.value)}
                  className="w-full text-slate-600 text-sm font-normal leading-relaxed bg-slate-50 rounded-lg p-3 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  rows={4}
                />
              </div>

              {/* Main Parts */}
              <div className="space-y-4">
                {state.specification.mainParts.map((part, index) => (
                  <div key={part.id} className="flex gap-3 items-start">
                    <div className="mt-0.5 flex items-center justify-center size-6 rounded-full bg-blue-50 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        {index === 0 && (
                          <>
                            <rect width="7" height="7" x="3" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="3" rx="1" />
                            <rect width="7" height="7" x="14" y="14" rx="1" />
                            <rect width="7" height="7" x="3" y="14" rx="1" />
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
                          </>
                        )}
                      </svg>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={part.name}
                        onChange={(e) =>
                          updateMainPart(part.id, "name", e.target.value)
                        }
                        className="text-sm font-semibold text-slate-900 bg-transparent border-none focus:ring-0 p-0 w-full"
                      />
                      <input
                        type="text"
                        value={part.description}
                        onChange={(e) =>
                          updateMainPart(part.id, "description", e.target.value)
                        }
                        className="text-xs text-slate-500 mt-0.5 bg-transparent border-none focus:ring-0 p-0 w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Style */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                  Style
                </label>
                <input
                  type="text"
                  value={state.specification.style}
                  onChange={(e) => updateStyle(e.target.value)}
                  className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Tip Box */}
          <div className="bg-blue-50/50 rounded-lg p-3 flex items-start gap-3 border border-blue-100 mb-4">
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
              className="text-primary mt-0.5"
            >
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-slate-800 font-medium">
                Want to tweak the layout?
              </p>
              <p className="text-xs text-slate-500">
                You can manually edit components in the builder after
                confirming.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="fixed bottom-0 z-30 w-full max-w-lg mx-auto bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goToScreen("clarification")}
              className="flex-1 h-12 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
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
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              Refine Idea
            </button>
            <button
              onClick={handleConfirm}
              disabled={state.isLoading}
              className="flex-[2] h-12 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {state.isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Confirm &amp; Generate
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
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
