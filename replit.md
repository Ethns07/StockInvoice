# Overview

InventoryPro is a comprehensive inventory management system with integrated invoicing capabilities. The application provides a complete business solution for tracking products, managing stock levels, handling customer relationships, and generating professional invoices. Built as a full-stack web application, it features a modern React frontend with Express.js backend, utilizing PostgreSQL for data persistence and Replit's authentication system for user management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side is built with React 18 using TypeScript, implementing a component-based architecture with modern patterns:

- **UI Framework**: Utilizes shadcn/ui components built on Radix UI primitives for consistent, accessible interface elements
- **Styling**: Tailwind CSS with CSS variables for theming, supporting both light and dark modes
- **State Management**: TanStack Query (React Query) for server state management with optimistic updates and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build System**: Vite for fast development and optimized production builds

## Backend Architecture
The server follows RESTful API principles with Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Authentication**: Replit's OpenID Connect integration with session-based auth
- **Session Storage**: PostgreSQL-backed session store for scalability
- **API Design**: Resource-based endpoints with consistent error handling and logging

## Data Storage Solutions
PostgreSQL database with schema-first approach:

- **ORM**: Drizzle ORM for type-safe queries and migrations
- **Schema Management**: Centralized schema definitions in shared directory
- **Data Validation**: Zod schemas derived from database schema for runtime validation
- **Migration System**: Drizzle Kit for database schema evolution

## Authentication and Authorization
Integrated Replit authentication system:

- **Provider**: OpenID Connect with Replit as identity provider
- **Session Management**: Server-side sessions with PostgreSQL storage
- **Authorization**: Route-level authentication middleware protecting API endpoints
- **User Management**: Automatic user provisioning with profile synchronization

## Database Schema
Core entities with relational design:

- **Users**: Profile information synchronized with Replit auth
- **Products**: Inventory items with SKU, pricing, and stock tracking
- **Customers**: Client information for invoice generation
- **Invoices**: Billing documents with line items and status tracking
- **Sessions**: Authentication session storage

The schema supports inventory tracking with automatic stock level monitoring, multi-item invoicing with calculated totals, and comprehensive business reporting capabilities.

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations with PostgreSQL support
- **express**: Web application framework for RESTful API development
- **react**: Frontend library for building user interfaces
- **@tanstack/react-query**: Server state management with caching and synchronization

## UI and Styling
- **@radix-ui/***: Collection of accessible, unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Type-safe variant handling for component styling
- **lucide-react**: Comprehensive icon library with React components

## Form and Validation
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for various schema libraries
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Authentication and Session
- **openid-client**: OpenID Connect client for Replit authentication
- **passport**: Authentication middleware for Node.js
- **express-session**: Session middleware for Express applications
- **connect-pg-simple**: PostgreSQL session store for express-session

## Development Tools
- **vite**: Build tool with fast HMR for development
- **tsx**: TypeScript execution engine for development server
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **esbuild**: JavaScript bundler for production builds

## Utility Libraries
- **date-fns**: Modern date utility library for JavaScript
- **memoizee**: Function memoization for performance optimization
- **nanoid**: URL-safe unique string ID generator
- **ws**: WebSocket library for real-time database connections