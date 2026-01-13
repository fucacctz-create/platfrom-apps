import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TranslationProvider } from "@/context/TranslationContext";

export const metadata: Metadata = {
  title: "Translation Station | From Dream to Code",
  description:
    "Transform your app ideas into structured specifications. Upload sketches, describe your vision, and get AI-ready prompts for code generation.",
  keywords: [
    "app development",
    "AI",
    "code generation",
    "wireframe",
    "specification",
    "prototype",
  ],
  authors: [{ name: "prototype.cafe" }],
  openGraph: {
    title: "Translation Station | From Dream to Code",
    description:
      "Transform your app ideas into structured specifications for AI code generators.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Translation Station | From Dream to Code",
    description:
      "Transform your app ideas into structured specifications for AI code generators.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#101922" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
