import { NextRequest, NextResponse } from "next/server";

// Force static for mobile builds (returns stub response)
// For full API functionality, deploy to a server environment
export const dynamic = "force-static";

// Types for the API
interface MainPart {
  id: string;
  name: string;
  description: string;
}

interface AppSpecification {
  summary: string;
  mainParts: MainPart[];
  style: string;
  wireframeUrl?: string;
}

interface ClarificationQuestion {
  id: string;
  question: string;
  suggestions: string[];
}

interface TranslateResponse {
  success: boolean;
  specification?: AppSpecification;
  clarifications?: ClarificationQuestion[];
  prompt?: {
    humanReadable: {
      summary: string;
      mainParts: string[];
      style: string;
    };
    machineReadable: string;
  };
  error?: string;
  status?: string;
  version?: string;
}

// GET handler - Health check
export async function GET(): Promise<NextResponse<TranslateResponse>> {
  return NextResponse.json({
    success: true,
    status: "healthy",
    version: "1.0.0",
  });
}

// POST handler - Process translation request
export async function POST(
  request: NextRequest
): Promise<NextResponse<TranslateResponse>> {
  try {
    const contentType = request.headers.get("content-type") || "";

    let description = "";
    let hasFiles = false;

    // Handle multipart form data (file uploads)
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      description = formData.get("description") as string || "";
      const files = formData.getAll("files");
      hasFiles = files.length > 0;
    }
    // Handle JSON body
    else if (contentType.includes("application/json")) {
      const body = await request.json();
      description = body.description || "";
      hasFiles = body.hasFiles || false;
    }

    // Validate input
    if (!description && !hasFiles) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one input (description or file) is required",
        },
        { status: 400 }
      );
    }

    // Generate clarification questions based on input
    const clarifications: ClarificationQuestion[] = generateClarifications(
      description,
      hasFiles
    );

    // Generate initial specification based on description
    const specification: AppSpecification = analyzeInput(description, hasFiles);

    // Generate the AI prompt
    const prompt = generatePrompt(specification);

    return NextResponse.json({
      success: true,
      specification,
      clarifications,
      prompt,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process translation request",
      },
      { status: 500 }
    );
  }
}

// Helper function to generate clarification questions
function generateClarifications(
  description: string,
  hasFiles: boolean
): ClarificationQuestion[] {
  const questions: ClarificationQuestion[] = [];

  // Base questions that always apply
  questions.push({
    id: "q1",
    question: "What is the primary action users should take when they open the app?",
    suggestions: ["Browse content", "Create something", "Track activity"],
  });

  if (hasFiles) {
    questions.push({
      id: "q2",
      question:
        "I noticed some UI elements in your visuals. What should happen when users interact with the main button?",
      suggestions: ["Navigate to next screen", "Submit form", "Show modal"],
    });
  }

  if (description.toLowerCase().includes("list") || description.toLowerCase().includes("feed")) {
    questions.push({
      id: "q3",
      question: "What type of content should be displayed in the list/feed?",
      suggestions: ["Recent activity", "Saved items", "Recommendations"],
    });
  }

  questions.push({
    id: "q4",
    question: "What authentication method would you prefer?",
    suggestions: ["Email/Password", "Social login", "No authentication"],
  });

  questions.push({
    id: "q5",
    question: "What is your preferred visual style?",
    suggestions: ["Minimal & clean", "Bold & colorful", "Professional"],
  });

  return questions;
}

// Helper function to analyze input and generate specification
function analyzeInput(description: string, hasFiles: boolean): AppSpecification {
  // Extract key features from description
  const features: MainPart[] = [];

  // Default features based on common patterns
  if (description.toLowerCase().includes("dashboard") || hasFiles) {
    features.push({
      id: "1",
      name: "Dashboard",
      description: "Main overview screen showing key metrics and quick actions",
    });
  }

  if (
    description.toLowerCase().includes("feed") ||
    description.toLowerCase().includes("list")
  ) {
    features.push({
      id: "2",
      name: "Content Feed",
      description: "Scrollable list of content with infinite pagination",
    });
  }

  if (
    description.toLowerCase().includes("search") ||
    description.toLowerCase().includes("find")
  ) {
    features.push({
      id: "3",
      name: "Search & Discovery",
      description: "Search functionality with filters and suggestions",
    });
  }

  if (
    description.toLowerCase().includes("profile") ||
    description.toLowerCase().includes("user")
  ) {
    features.push({
      id: "4",
      name: "User Profile",
      description: "Personal profile with settings and preferences",
    });
  }

  // Add default features if none detected
  if (features.length === 0) {
    features.push(
      {
        id: "1",
        name: "Home Screen",
        description: "Main landing view with primary actions",
      },
      {
        id: "2",
        name: "Content View",
        description: "Display and interact with main content",
      },
      {
        id: "3",
        name: "Settings",
        description: "App configuration and user preferences",
      }
    );
  }

  return {
    summary:
      description ||
      "A modern mobile application with intuitive navigation and clean design.",
    mainParts: features,
    style: "Clean, modern aesthetic with focus on usability",
  };
}

// Helper function to generate AI prompt
function generatePrompt(specification: AppSpecification) {
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
${specification.mainParts
  .map((p, i) => `${i + 1}. **${p.name}:** ${p.description}`)
  .join("\n")}

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
}
