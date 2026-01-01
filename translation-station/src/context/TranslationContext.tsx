"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  TranslationState,
  ScreenType,
  UploadedFile,
  ClarificationMessage,
  AppSpecification,
  GeneratedPrompt,
  MainPart,
} from "@/types";

// Initial state
const initialState: TranslationState = {
  currentScreen: "welcome",
  uploadedFiles: [],
  description: "",
  clarificationMessages: [],
  clarificationProgress: 0,
  totalClarifications: 5,
  specification: {
    summary: "",
    mainParts: [],
    style: "",
  },
  generatedPrompt: null,
  isLoading: false,
  error: null,
};

// Action types
type TranslationAction =
  | { type: "SET_SCREEN"; payload: ScreenType }
  | { type: "ADD_FILE"; payload: UploadedFile }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "ADD_MESSAGE"; payload: ClarificationMessage }
  | { type: "SET_CLARIFICATION_PROGRESS"; payload: number }
  | { type: "SET_SPECIFICATION"; payload: AppSpecification }
  | { type: "UPDATE_SUMMARY"; payload: string }
  | { type: "UPDATE_MAIN_PART"; payload: { id: string; field: keyof MainPart; value: string } }
  | { type: "ADD_MAIN_PART"; payload: MainPart }
  | { type: "REMOVE_MAIN_PART"; payload: string }
  | { type: "UPDATE_STYLE"; payload: string }
  | { type: "SET_GENERATED_PROMPT"; payload: GeneratedPrompt }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };

// Reducer
function translationReducer(
  state: TranslationState,
  action: TranslationAction
): TranslationState {
  switch (action.type) {
    case "SET_SCREEN":
      return { ...state, currentScreen: action.payload };
    case "ADD_FILE":
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      };
    case "REMOVE_FILE":
      return {
        ...state,
        uploadedFiles: state.uploadedFiles.filter(
          (f) => f.id !== action.payload
        ),
      };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "ADD_MESSAGE":
      return {
        ...state,
        clarificationMessages: [...state.clarificationMessages, action.payload],
      };
    case "SET_CLARIFICATION_PROGRESS":
      return { ...state, clarificationProgress: action.payload };
    case "SET_SPECIFICATION":
      return { ...state, specification: action.payload };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        specification: { ...state.specification, summary: action.payload },
      };
    case "UPDATE_MAIN_PART":
      return {
        ...state,
        specification: {
          ...state.specification,
          mainParts: state.specification.mainParts.map((part) =>
            part.id === action.payload.id
              ? { ...part, [action.payload.field]: action.payload.value }
              : part
          ),
        },
      };
    case "ADD_MAIN_PART":
      return {
        ...state,
        specification: {
          ...state.specification,
          mainParts: [...state.specification.mainParts, action.payload],
        },
      };
    case "REMOVE_MAIN_PART":
      return {
        ...state,
        specification: {
          ...state.specification,
          mainParts: state.specification.mainParts.filter(
            (p) => p.id !== action.payload
          ),
        },
      };
    case "UPDATE_STYLE":
      return {
        ...state,
        specification: { ...state.specification, style: action.payload },
      };
    case "SET_GENERATED_PROMPT":
      return { ...state, generatedPrompt: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Context
interface TranslationContextType {
  state: TranslationState;
  dispatch: React.Dispatch<TranslationAction>;
  // Helper functions
  goToScreen: (screen: ScreenType) => void;
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  setDescription: (description: string) => void;
  addMessage: (message: ClarificationMessage) => void;
  setSpecification: (spec: AppSpecification) => void;
  updateSummary: (summary: string) => void;
  updateMainPart: (id: string, field: keyof MainPart, value: string) => void;
  addMainPart: (part: MainPart) => void;
  removeMainPart: (id: string) => void;
  updateStyle: (style: string) => void;
  setGeneratedPrompt: (prompt: GeneratedPrompt) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Provider
export function TranslationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(translationReducer, initialState);

  const value: TranslationContextType = {
    state,
    dispatch,
    goToScreen: (screen) => dispatch({ type: "SET_SCREEN", payload: screen }),
    addFile: (file) => dispatch({ type: "ADD_FILE", payload: file }),
    removeFile: (id) => dispatch({ type: "REMOVE_FILE", payload: id }),
    setDescription: (description) =>
      dispatch({ type: "SET_DESCRIPTION", payload: description }),
    addMessage: (message) => dispatch({ type: "ADD_MESSAGE", payload: message }),
    setSpecification: (spec) =>
      dispatch({ type: "SET_SPECIFICATION", payload: spec }),
    updateSummary: (summary) =>
      dispatch({ type: "UPDATE_SUMMARY", payload: summary }),
    updateMainPart: (id, field, value) =>
      dispatch({ type: "UPDATE_MAIN_PART", payload: { id, field, value } }),
    addMainPart: (part) => dispatch({ type: "ADD_MAIN_PART", payload: part }),
    removeMainPart: (id) => dispatch({ type: "REMOVE_MAIN_PART", payload: id }),
    updateStyle: (style) => dispatch({ type: "UPDATE_STYLE", payload: style }),
    setGeneratedPrompt: (prompt) =>
      dispatch({ type: "SET_GENERATED_PROMPT", payload: prompt }),
    setLoading: (loading) => dispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
    reset: () => dispatch({ type: "RESET" }),
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
