// Type definitions for Translation Station

export type ScreenType =
  | "welcome"
  | "upload"
  | "clarification"
  | "review"
  | "export";

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  preview: string;
  file: File;
}

export interface ClarificationMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface MainPart {
  id: string;
  name: string;
  description: string;
}

export interface AppSpecification {
  summary: string;
  mainParts: MainPart[];
  style: string;
  wireframeUrl?: string;
}

export interface GeneratedPrompt {
  humanReadable: {
    summary: string;
    mainParts: string[];
    style: string;
  };
  machineReadable: string;
}

export interface TranslationState {
  currentScreen: ScreenType;
  uploadedFiles: UploadedFile[];
  description: string;
  clarificationMessages: ClarificationMessage[];
  clarificationProgress: number;
  totalClarifications: number;
  specification: AppSpecification;
  generatedPrompt: GeneratedPrompt | null;
  isLoading: boolean;
  error: string | null;
}

export interface TranslateRequest {
  files?: File[];
  description?: string;
  clarificationAnswers?: Array<{ questionId: string; answer: string }>;
}

export interface TranslateResponse {
  success: boolean;
  specification?: AppSpecification;
  clarifications?: ClarificationMessage[];
  prompt?: GeneratedPrompt;
  error?: string;
}
