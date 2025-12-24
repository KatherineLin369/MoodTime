# MoodTime - Complete Setup Guide

## Step 1: Create Project Structure
```bash
mkdir moodtime && cd moodtime
mkdir -p client/src/{pages,components,lib,hooks}
mkdir -p server/replit_integrations/{auth,chat,image}
mkdir -p shared/models
mkdir -p migrations
mkdir -p attached_assets
mkdir -p script
```

## Step 2: Copy Configuration Files (Root Level)
- package.json
- tsconfig.json
- tailwind.config.ts
- vite.config.ts
- drizzle.config.ts
- postcss.config.js

## Step 3: Copy Client Files

### HTML & CSS
- client/index.html
- client/src/index.css
- client/src/main.tsx

### App & Router
- client/src/App.tsx
- client/src/pages/Landing.tsx
- client/src/pages/Home.tsx
- client/src/pages/MoodJournal.tsx
- client/src/pages/AIChat.tsx
- client/src/pages/Games.tsx
- client/src/pages/Resources.tsx
- client/src/pages/Profile.tsx
- client/src/pages/not-found.tsx

### Components
- client/src/components/Navigation.tsx
- client/src/components/MoodPicker.tsx
- client/src/components/ui/* (use shadcn/ui CLI to install)

### Hooks & Lib
- client/src/hooks/use-auth.ts
- client/src/hooks/use-moods.ts
- client/src/hooks/use-chat.ts
- client/src/lib/queryClient.ts
- client/src/lib/auth-utils.ts

## Step 4: Copy Server Files

### Root
- server/index.ts
- server/db.ts
- server/storage.ts
- server/static.ts
- server/routes.ts
- server/vite.ts

### Auth Integration
- server/replit_integrations/auth/index.ts
- server/replit_integrations/auth/routes.ts

### Chat Integration
- server/replit_integrations/chat/index.ts
- server/replit_integrations/chat/routes.ts
- server/replit_integrations/chat/storage.ts

### Image Integration
- server/replit_integrations/image/index.ts
- server/replit_integrations/image/routes.ts
- server/replit_integrations/image/client.ts

## Step 5: Copy Shared Files
- shared/schema.ts
- shared/routes.ts
- shared/models/auth.ts
- shared/models/chat.ts

## Step 6: Build Script
- script/build.ts

## Step 7: Install & Run
```bash
npm install
npm run db:push
npm run dev
```

## Environment Variables
```
DATABASE_URL=your_postgresql_url
OPENAI_API_KEY=your_openai_key
SESSION_SECRET=random_secret_string
```

## Colors Used
- Primary (Blue): 200 80% 55%
- Secondary (Green): 85 70% 60%
- Accent (Yellow): 45 95% 55%

All files are ready to copy individually!
