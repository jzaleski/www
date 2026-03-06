# www

A Next.js personal website built with React 19 and TypeScript.

## Tech Stack

- **Framework**: Next.js 16
- **React**: 19.2
- **TypeScript**: 5.9
- **Linting**: ESLint 9
- **Formatting**: Prettier 3
- **Build Tool**: Turborepo 2

## Getting Started

### Prerequisites

- Node.js (see `.node-version`)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

## Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm run start`          | Start production server  |
| `npm run lint`           | Lint and fix files       |
| `npm run lint:check`     | Check linting only       |
| `npm run prettier`       | Format and fix files     |
| `npm run prettier:check` | Check formatting only    |
| `npm run tsc`            | Type check               |
| `npm run pre-commit`     | Run all checks + build   |

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── components/      # React components
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── public/              # Static assets
├── bin/                 # Utility scripts
└── eslint.config.js     # ESLint configuration
```
