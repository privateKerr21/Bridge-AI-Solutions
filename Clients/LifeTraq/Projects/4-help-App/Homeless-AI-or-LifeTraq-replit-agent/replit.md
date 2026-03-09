# 4-HELP Resource Bridge

## Overview

4-HELP is a mobile-first web application designed to help at-risk populations in Salt Lake City find local resources including shelter, food, medical care, and legal assistance. The application prioritizes accessibility (WCAG AAA compliance), bilingual support (English/Spanish), and performance on low-end devices. It integrates an AI chat assistant (Hope AI via Chipp) for personalized resource discovery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React Context for language preferences
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Build Tool**: Vite with HMR support

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Vite dev server proxied through Express for unified development experience

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with output to `./migrations`
- **Storage Pattern**: Interface-based storage abstraction (`IStorage`) with in-memory implementation for development

### Key Design Decisions

1. **Accessibility-First Design**
   - All interactive elements minimum 48px touch targets
   - 7:1 contrast ratio (WCAG AAA)
   - System font stack for performance
   - Progressive disclosure pattern

2. **Bilingual Support**
   - Language context provider wraps entire application
   - `t(english, spanish)` helper function for translations
   - All resource data includes both language variants

3. **Offline-Ready Architecture**
   - Static resource data currently embedded in client
   - Clear loading and error states for network operations

4. **Monorepo Structure**
   - `client/` - React frontend application
   - `server/` - Express backend
   - `shared/` - Shared types and schemas

## External Dependencies

### Third-Party Services
- **Chipp AI Chat Widget**: Embedded chat assistant (Hope AI) loaded via external script
  - App URL: `https://hopeai4help-10035864.chipp.ai`
  - Widget script: `https://storage.googleapis.com/chipp-chat-widget-assets/build/bundle.js`

### Database
- **PostgreSQL**: Required for production (connection via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Database operations and schema management

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `wouter`: Client-side routing
- `zod`: Schema validation
- Radix UI primitives: Accessible component foundations
- `lucide-react`: Icon library

### External APIs
- **Google Maps**: Used for navigation links (opens in new tab)
- **Browser Geolocation API**: "Find Near Me" functionality for distance calculations