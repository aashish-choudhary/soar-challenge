# Soar Task - React Banking Dashboard

A modern banking dashboard built with React, TypeScript, and Vite, featuring form validation, data visualization, and responsive design.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS with custom animations
- **Form Management:** React Hook Form with Zod validation
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Data Visualization:** Chart.js with React Chartjs 2
- **UI Components:**
  - Radix UI primitives
  - Lucide React icons
  - Class Variance Authority for component variants
- **Utilities:**
  - date-fns for date manipulation
  - clsx & tailwind-merge for conditional styling
  - TypeScript for type safety

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components
│   ├── layout/     # Layout components (Header, Sidenav)
│   └── settings/   # Settings page components
├── lib/            # Utility functions and configurations
├── pages/          # Page components
├── types/          # TypeScript type definitions
├── App.tsx         # Root component
└── main.tsx        # Application entry point
```

## Key Features

- **Form Validation:**

  - Real-time validation with immediate feedback
  - Complex validation rules using Zod
  - Field-specific error messages
  - Visual feedback for invalid fields

- **Responsive Design:**

  - Mobile-first approach
  - Adaptive layouts
  - Responsive navigation

- **Type Safety:**
  - Full TypeScript integration
  - Type-safe form handling
  - Strict type checking

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd soar-task
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write clean, maintainable code
- Use meaningful variable and function names

### Component Structure

- Keep components focused and single-responsibility
- Use TypeScript interfaces for props
- Implement proper prop validation
- Use composition over inheritance

### Form Validation Rules

- **Name:** Letters and spaces only, 2-50 characters
- **Username:** Letters, numbers, underscores, and hyphens, 3-30 characters
- **Email:** Valid email format, 5-254 characters
- **Password:** (Optional) 8+ characters with uppercase, lowercase, number, and special character
- **Date of Birth:** Must be between 13-100 years old
- **Addresses:** Maximum 200 characters
- **City/Country:** 2-50 characters
- **Postal Code:** Common format validation

## Building for Production

1. Create a production build:

```bash
npm run build
# or
yarn build
```

2. Preview the production build:

```bash
npm run preview
# or
yarn preview
```

The production build will be available in the `dist` directory.
