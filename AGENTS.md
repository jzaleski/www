# AGENTS.md

## Project Overview

Personal website built with Next.js 16, React 19, and TypeScript.

## Development Guidelines

### Code Style

- Use TypeScript with strict types
- Follow ESLint rules (eslint.config.js)
- Format with Prettier (pre-commit hook runs both)
- Prefer functional components with hooks

### Running Checks

```bash
npm run lint        # Lint + fix
npm run prettier    # Format + fix
npm run tsc         # Type check
npm run pre-commit  # All checks + build
```

### File Locations

- Components: `app/components/` (Header.tsx, ModeSetter.tsx, ResumeContent.tsx)
- Pages: `app/` (Next.js app router - page.tsx, layout.tsx)
- Styles: `app/globals.css`
- Config: `next.config.js`, `tsconfig.json`, `eslint.config.js`

### Commit Workflow

1. Run `npm run pre-commit` before committing
2. Use descriptive commit messages
3. No force pushes to main

### Key Dependencies

- Next.js 16 (app router)
- React 19
- TypeScript 5.9
- ESLint 9 with typescript-eslint
