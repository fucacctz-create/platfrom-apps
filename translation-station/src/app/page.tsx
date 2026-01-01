"use client";

import { useTranslation } from "@/context/TranslationContext";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import UploadScreen from "@/components/screens/UploadScreen";
import ClarificationScreen from "@/components/screens/ClarificationScreen";
import ReviewScreen from "@/components/screens/ReviewScreen";
import ExportScreen from "@/components/screens/ExportScreen";

export default function Home() {
  const { state } = useTranslation();

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "welcome":
        return <WelcomeScreen />;
      case "upload":
        return <UploadScreen />;
      case "clarification":
        return <ClarificationScreen />;
      case "review":
        return <ReviewScreen />;
      case "export":
        return <ExportScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <main className="min-h-screen min-h-dvh bg-background-light">
      <div className="screen-transition">{renderScreen()}</div>
    </main>
  );
}
