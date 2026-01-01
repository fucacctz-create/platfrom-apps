# Translation Station

> From Dream to Code - Transform your app ideas into structured specifications

Translation Station is a microservice that helps users transform unstructured app ideas (sketches, descriptions) into structured specifications ready for AI code generators.

## Features

- **Visual Upload**: Drag and drop screenshots, sketches, or videos
- **Text Description**: Describe your app idea in natural language
- **AI Clarification**: Interactive Q&A to refine your idea
- **Specification Review**: Edit and customize the generated specification
- **Export**: Get AI-ready prompts for code generation

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Context + useReducer

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

The app runs at `http://localhost:3000` by default.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── translate/
│   │       └── route.ts      # API endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   └── screens/
│       ├── WelcomeScreen.tsx      # Onboarding
│       ├── UploadScreen.tsx       # File upload & description
│       ├── ClarificationScreen.tsx # AI Q&A chat
│       ├── ReviewScreen.tsx       # Spec review & edit
│       └── ExportScreen.tsx       # Final prompt export
├── config/
│   └── theme.ts              # Theme configuration
├── context/
│   └── TranslationContext.tsx # Global state management
└── types/
    └── index.ts              # TypeScript types
```

## API

### `GET /api/translate`

Health check endpoint.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "version": "1.0.0"
}
```

### `POST /api/translate`

Process translation request.

**Request (JSON):**
```json
{
  "description": "A social app for travelers...",
  "hasFiles": false
}
```

**Request (FormData):**
- `description`: Text description (optional)
- `files`: Uploaded files (optional)

**Response:**
```json
{
  "success": true,
  "specification": {
    "summary": "...",
    "mainParts": [...],
    "style": "..."
  },
  "clarifications": [...],
  "prompt": {
    "humanReadable": {...},
    "machineReadable": "..."
  }
}
```

## User Flows

1. **Welcome** → Introduction and onboarding
2. **Upload & Describe** → Add visuals and/or text description
3. **Clarification** → Answer AI questions to refine idea
4. **Review & Confirm** → Edit and approve specification
5. **Export** → Copy AI prompt to clipboard

## Configuration

Theme colors, fonts, and labels can be customized in `src/config/theme.ts`.

## Deployment

The service is designed to be deployed at `http://translate.prototype.cafe`.

```bash
# Build
npm run build

# Start
npm start
```

## License

MIT
