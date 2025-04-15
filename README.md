# CV-Library Frontend

## Live Demo

The application is deployed and accessible at: [https://cv-libraries-tha.vercel.app/en/jobs](https://cv-libraries-tha.vercel.app/en/jobs)

## Project Overview

This is a Next.js application that provides a frontend for CV-Library, allowing users to search for jobs by location or industry. The application features a responsive design, internationalization support, and a modular architecture.

## Technologies Used

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: SCSS/CSS Modules (no UI libraries)
- **Testing**: Jest with React Testing Library
- **Internationalization**: i18n support for English and German
- 
## Key Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Server-Side Rendering**: Utilizing Next.js SSR capabilities
- **Internationalization**: Support for multiple languages (currently English and German)
- **Modular Architecture**: Component-based structure for maintainability
- **Type Safety**: Strict TypeScript configuration to ensure code quality
- **Accessibility**: Focus on creating accessible UI components

## Project Structure

- `src/app`: Next.js App Router pages and layouts
- `src/components`: Reusable UI components
- `src/hooks`: Custom React hooks
- `src/i18n`: Internationalization configuration and translations
- `src/styles`: Global styles and variables
- `__tests__`: Test files for components and utilities

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cv-library-tha

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Component Highlights

- **JobsSearch**: Main component for searching jobs with tabs for Location and Industry views
- **TabsComponent**: Reusable tabs interface for switching between different views
- **LocationAutocomplete**: Autocomplete component for location search with API integration
- **LanguageSwitcher**: Component for switching between available languages

## API Integration

The application integrates with the CV-Library API for location search:
- Location API endpoint: `https://api.cv-library.co.uk/v1/locations?q={query}`
- Requires at least two characters to return results

## Styling Approach

The project uses CSS Modules with SCSS for component styling, providing:
- Scoped styles to prevent conflicts
- Reusable variables for consistent theming
- Responsive design with media queries
- No external UI libraries to maintain lightweight bundle size

## Brand Colors

- Primary: #005DA4
- Secondary: #003777
- White: #FFFFFF
- Green: #5BB543
- Dark Gray: #333333
- Light Blue: #4488D5
- Black: #000000

## Continuous Integration

The project includes a GitHub Actions workflow that runs on pull requests and merges to the main branch:
- Linting checks
- Type checking
- Unit tests with coverage reporting
- Build verification

## Deployment

The application is deployed on Vercel with automatic deployments from the main branch.
