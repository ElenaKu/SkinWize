# SkinWise - AI Skincare Product Analyzer

## Overview

SkinWise is a comprehensive skincare analysis application that helps users make informed decisions about their skincare products through AI-powered ingredient analysis. The app allows users to scan product ingredient lists, receive detailed safety ratings, and get personalized product recommendations to improve their skincare routines. Built with a focus on trust, credibility, and educational value, SkinWise combines professional scientific analysis with an intuitive user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development practices
- **UI Framework**: Tailwind CSS with shadcn/ui component library for consistent, accessible design
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: Single-page application with tab-based navigation (scan, products, routine, profile)
- **Theme System**: CSS custom properties with light/dark mode support and localStorage persistence
- **Design System**: Professional health/beauty aesthetic with sage green primary color and scientific credibility focus

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for RESTful API endpoints
- **Development Environment**: Vite for fast development with hot module replacement
- **File Upload**: Support for image capture and file upload for product scanning
- **Product Analysis**: Comprehensive ingredient analysis system with safety scoring
- **Product Database**: Market product suggestions with compatibility scoring

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Development Storage**: In-memory storage fallback for development/testing

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Model**: Username/password authentication with UUID primary keys
- **Data Validation**: Zod schemas for runtime type validation and API safety

### Component Architecture
- **Design Pattern**: Atomic design with reusable UI components
- **Camera Integration**: File upload with drag-and-drop support for product scanning
- **Ingredient Analysis**: Comprehensive safety scoring with detailed explanations
- **Routine Management**: Timeline-based skincare routine builder
- **Product Cards**: Rich product displays with safety indicators and improvement suggestions

### Product Suggestion System
- **Market Database**: Comprehensive product database with 100+ real products
- **Compatibility Analysis**: Ingredient interaction and routine optimization
- **Safety Scoring**: Multi-factor safety assessment (irritation potential, sensitivity, pregnancy safety)
- **Recommendation Engine**: Personalized suggestions based on current products and skin concerns

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon Database
- **drizzle-orm**: Type-safe database ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and API caching
- **@radix-ui/***: Accessible headless UI components for consistent interactions

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking for both frontend and backend
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **ESBuild**: Fast JavaScript bundler for production builds

### UI and Styling
- **shadcn/ui**: Pre-built component library based on Radix UI primitives
- **class-variance-authority**: Type-safe component variant management
- **clsx & tailwind-merge**: Conditional CSS class management

### Validation and Forms
- **zod**: Runtime type validation for API requests and form data
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Integration between react-hook-form and Zod

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation for components and data
- **lucide-react**: Consistent icon library for UI elements