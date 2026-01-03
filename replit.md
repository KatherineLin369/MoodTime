# MoodTime

## Overview

MoodTime is a mental health and wellness web application designed for teens and young users. The app provides a comprehensive support hub that combines mood tracking, AI-powered chat therapy, relaxation games, and crisis resources. The core purpose is to help users understand their emotions, build healthy coping habits, and access support when needed.

Key features include:
- **Mood Journal**: Track daily moods with emotions and notes, visualized with charts
- **AI Therapist Chat**: Conversational AI for emotional support with streaming responses
- **Relaxation Zone**: Calming mini-games like box breathing, zen blocks, and gratitude journaling
- **Crisis Resources**: Highlighted support information including 988 crisis line
- **User Profiles**: Session-based authentication with Replit Auth

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom mental wellness color palette (yellow, green, blue theme)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Charts**: Recharts for mood history visualization
- **Fonts**: Quicksand (display) and Nunito Sans (body) for a friendly, approachable feel

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build System**: Vite for client, esbuild for server bundling
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Authentication**: Replit Auth with OpenID Connect, session-based with PostgreSQL session store
- **AI Integration**: OpenAI API via Replit AI Integrations for chat and image generation

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` with models split into `shared/models/`
- **Key Tables**: 
  - `users` and `sessions` (Replit Auth - mandatory)
  - `mood_entries` (user mood tracking)
  - `gratitude_entries` (gratitude journal)
  - `conversations` and `messages` (AI chat history)

### Authentication Flow
- Replit Auth handles OAuth/OIDC flow
- Sessions stored in PostgreSQL via `connect-pg-simple`
- Protected routes use `isAuthenticated` middleware
- User claims available via `req.user.claims.sub` for user ID

### Project Structure
```
├── client/src/          # React frontend
│   ├── pages/           # Route components
│   ├── components/      # UI components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
│   ├── replit_integrations/  # Auth, chat, image modules
│   └── routes.ts        # API route definitions
├── shared/              # Shared types and schemas
│   ├── schema.ts        # Drizzle schema exports
│   └── models/          # Individual model definitions
└── migrations/          # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Authentication
- **Replit Auth**: OAuth/OIDC provider via `ISSUER_URL` (defaults to replit.com/oidc)
- **express-session**: Session management with `SESSION_SECRET` environment variable

### AI Services
- **OpenAI API**: Chat completions and image generation
  - `AI_INTEGRATIONS_OPENAI_API_KEY`: API key for OpenAI
  - `AI_INTEGRATIONS_OPENAI_BASE_URL`: Base URL for Replit AI proxy
  - Models used: GPT for chat, `gpt-image-1` for image generation

### Key npm Packages
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animations
- `recharts`: Chart visualizations
- `date-fns`: Date formatting
- `zod`: Schema validation
- `drizzle-zod`: Drizzle-to-Zod schema generation
- `lucide-react`: Icon library