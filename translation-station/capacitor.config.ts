import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "cafe.prototype.translate",
  appName: "Translation Station",
  webDir: "out",
  server: {
    // For development, use live reload
    // url: "http://localhost:3000",
    // cleartext: true,
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "Translation Station",
  },
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#f6f7f8",
      showSpinner: false,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#f6f7f8",
    },
  },
};

export default config;
