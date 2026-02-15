# DebateGPT 🎙️

An AI-powered debate training platform that helps you improve your argumentation skills through real-time debates with adaptive AI opponents.

## Features

- **Adaptive AI Opponents**: Choose from beginner, intermediate, or advanced difficulty levels
- **Real-time Streaming**: Instant AI responses using Claude 3.5 Sonnet
- **Argument Analysis**: Get detailed feedback on your arguments with scores for:
  - Logical strength
  - Evidence quality
  - Persuasiveness
  - Structure
- **Debate Tracking**: Monitor your progress with round counters and statistics
- **Export & Share**: Download your debate sessions as Markdown files
- **Keyboard Shortcuts**: Use Ctrl/Cmd+Enter to quickly submit arguments
- **Preset Topics**: Choose from curated debate topics or create your own

## Getting Started

### Prerequisites

- Bun (latest version)
- Anthropic API key

### Installation

```bash
bun install
```

### Environment Setup

Create a `.env.local` file with your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to start debating!

### Build

```bash
bun run build
```

## Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **AI**: Vercel AI SDK + Anthropic Claude 3.5 Sonnet
- **UI**: shadcn/ui + Tailwind CSS
- **Language**: TypeScript
- **Validation**: Zod

## How It Works

1. **Choose a topic** from presets or enter your own
2. **Select your position** (For or Against) and difficulty level
3. **Make your arguments** turn by turn
4. **Get AI feedback** on each argument with detailed analysis
5. **Export your debate** to review and share your progress

## Architecture

- `/src/app/api/debate` - Streaming debate AI endpoint
- `/src/app/api/analyze` - Argument analysis endpoint
- `/src/components/debate-interface.tsx` - Main debate UI
- `/src/components/argument-feedback.tsx` - AI feedback component
- `/src/components/debate-setup.tsx` - Initial configuration screen

## License

MIT

---

Built with ❤️ for TreeHacks 2026
