"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslation } from "@/context/TranslationContext";
import { UploadedFile } from "@/types";

export default function UploadScreen() {
  const { state, goToScreen, addFile, removeFile, setDescription, setLoading } =
    useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        processFiles(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const uploadedFile: UploadedFile = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            type: file.type,
            size: file.size,
            preview: e.target?.result as string,
            file: file,
          };
          addFile(uploadedFile);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAnalyze = async () => {
    if (state.uploadedFiles.length === 0 && !state.description.trim()) {
      return;
    }
    setLoading(true);
    // Simulate processing - in real implementation, this would call the API
    setTimeout(() => {
      setLoading(false);
      goToScreen("clarification");
    }, 1500);
  };

  const canProceed =
    state.uploadedFiles.length > 0 || state.description.trim().length > 0;

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-background-light shadow-xl ring-1 ring-gray-900/5">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-background-light/90 backdrop-blur-md border-b border-transparent">
        <button
          onClick={() => goToScreen("welcome")}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-black/5 transition-colors"
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
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Visual to Code</h1>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-black/5 transition-colors">
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
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-5 pb-28 scrollbar-hide">
        {/* Upload Zone */}
        <div className="mt-6 flex flex-col gap-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative group cursor-pointer w-full rounded-2xl border-2 border-dashed transition-all duration-300 shadow-md hover:shadow-lg ${
              isDragging
                ? "border-primary bg-blue-50/50"
                : "border-gray-400 hover:border-primary bg-white hover:bg-blue-50/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div
                className={`mb-6 flex h-24 w-24 items-center justify-center rounded-full transition-colors duration-300 ring-1 ring-blue-100 shadow-sm ${
                  isDragging
                    ? "bg-primary text-white"
                    : "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Upload Visuals
              </h3>
              <p className="mb-8 text-base text-gray-500 max-w-[280px] leading-relaxed font-medium">
                Drag &amp; drop or tap to select photos, screenshots, or
                sketches
              </p>
              <span className="inline-flex h-14 items-center justify-center rounded-xl bg-gray-900 px-10 text-lg font-bold text-white transition hover:bg-gray-800 group-hover:scale-105 transform duration-200 shadow-lg shadow-gray-900/10">
                Browse Files
              </span>
            </div>
          </div>
        </div>

        {/* Uploaded Files Preview */}
        {state.uploadedFiles.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Uploaded Files ({state.uploadedFiles.length})
            </p>
            <div className="flex flex-wrap gap-3">
              {state.uploadedFiles.map((file) => (
                <div key={file.id} className="relative group">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
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
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supported Formats */}
        <div className="mt-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            Supported Formats
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm transition-transform hover:scale-105">
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
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Screenshots
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm transition-transform hover:scale-105">
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
                <path d="m12 19 7-7 3 3-7 7-3-3z" />
                <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="m2 2 7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">
                Sketches
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 shadow-sm transition-transform hover:scale-105">
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
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m10 8 4 4-4 4" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Videos</span>
            </div>
          </div>
        </div>

        {/* Additional Context */}
        <div className="mt-10">
          <label
            className="mb-3 block text-base font-bold text-gray-900"
            htmlFor="context"
          >
            Additional Context
          </label>
          <p className="mb-3 text-sm text-gray-500">
            Describe specific behaviors or flows not visible in the images.
          </p>
          <div className="relative group">
            <textarea
              id="context"
              name="context"
              value={state.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 'The login button should redirect to the Dashboard. The logo in the corner should be clickable home...'"
              rows={5}
              className="block w-full rounded-xl border-gray-200 bg-white p-4 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary shadow-sm resize-none transition-shadow"
            />
            <div
              className="absolute bottom-3 right-3 text-gray-400 hover:text-primary cursor-pointer transition-colors p-2 rounded-lg hover:bg-blue-50"
              title="Use Voice Input"
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
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-10 pb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">Quick Tips</p>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 shadow-sm">
            <div className="flex gap-3">
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
                className="text-primary shrink-0"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              <div className="text-sm text-gray-700 leading-relaxed font-medium">
                For best results, upload high-contrast images. Hand-drawn
                sketches work best when drawn on plain white paper.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background-light/90 backdrop-blur-lg border-t border-gray-200 z-20">
        <button
          onClick={handleAnalyze}
          disabled={!canProceed || state.isLoading}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold text-white shadow-lg active:scale-[0.98] transition-all ${
            canProceed && !state.isLoading
              ? "bg-primary hover:bg-blue-600 shadow-blue-500/20"
              : "bg-gray-300 cursor-not-allowed shadow-none"
          }`}
        >
          {state.isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              <span>Analyzing...</span>
            </>
          ) : (
            <>
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
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
              <span>Analyze &amp; Generate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
