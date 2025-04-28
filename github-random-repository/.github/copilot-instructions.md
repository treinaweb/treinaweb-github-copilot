# GitHub Copilot Instructions for "GitHub Random Repository"

## Project Overview

**Project Name**: GitHub Random Repository

**Description**:  
This project is a web application built with Next.js and Tailwind CSS that allows users to discover random public repositories from GitHub. Upon visiting the site or clicking a button, users will be presented with a randomly selected repository, including details such as its name, description, owner, language, and star count.  
The project aims to create an intuitive, visually clean, and responsive interface that makes exploring new GitHub repositories fun and effortless.

## Final Goal

- Build a modern, performant web application using Next.js and Tailwind CSS.
- Fetch random public repositories using GitHub's public REST API.
- Display repository information in a clean and accessible layout.
- Ensure excellent responsiveness and accessibility across different devices.
- Follow good development practices with clean, modular, and scalable code.

## Technologies

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **API Integration**: GitHub REST API (`https://api.github.com/`)
- **Type Checking**: TypeScript
- **Version Control**: Git (GitHub)

## Recommended Project Structure

- `.github/`
  - `copilot-instructions.md`
- `app/`
  - `layout.tsx`
  - `page.tsx`
  - `components/`
    - `RepositoryCard.tsx`
    - `RandomButton.tsx`
  - `services/`
    - `github.ts`
  - `types/`
    - `repository.ts`
  - `utils/`
    - `fetchRandomRepository.ts`
- `public/`
- `styles/`
  - `globals.css`
- `tsconfig.json`
- `tailwind.config.ts`
- `next.config.js`
- `package.json`
- `README.md`

## Best Practices

### Next.js

- **App Router**: Use the `/app` directory with `page.tsx` and `layout.tsx` files.
- **Server Components**: Prefer server components unless client-side interactivity is required (e.g., button clicks).
- **Loading States**: Implement loading states when making async API calls.
- **SEO**: Configure basic metadata for the page (`export const metadata = {}` inside `page.tsx`).
- **Error Handling**: Use proper try-catch blocks when fetching from APIs and display friendly error messages.

### Tailwind CSS

- **Utility-first**: Prefer small, composable utility classes rather than creating custom CSS whenever possible.
- **Responsive Design**: Use Tailwind’s responsive modifiers (`sm:`, `md:`, `lg:`, etc.) to ensure mobile-first design.
- **Consistent Spacing**: Follow consistent spacing scales (`p-4`, `m-6`, etc.).
- **Dark Mode**: Prepare the styles for dark mode support using Tailwind’s dark mode class if time permits.

### TypeScript

- **Strict Typing**: Use strict types for all props, API responses, and utility functions.
- **Type Definitions**: Store shared types in `/types/` folder (`repository.ts` for example).
- **Avoid Any**: Never use `any` type unless absolutely necessary.

### GitHub REST API

- **Efficient Requests**: Use appropriate endpoints and authentication if needed to prevent hitting rate limits.
- **Pagination Handling**: Be mindful that GitHub API responses are paginated.
- **Error Handling**: Handle HTTP errors (e.g., 403, 404, 500) gracefully.

### General

- **Component Reusability**: Keep components small, reusable, and composable.
- **Code Readability**: Write clean, readable, and self-documenting code.
- **Commit Messages**: Write meaningful commit messages following the "type: short description" format (e.g., `feat: add random repository fetcher`).
- **Folder Naming**: Use lowercase and kebab-case for folder names and PascalCase for component files.
- **Environment Variables**: If needed (e.g., GitHub token), use `.env.local` and do not commit sensitive information.

---

_This document is intended to guide GitHub Copilot Agent Mode in understanding the project structure, goals, technologies, and best practices while assisting in the "GitHub Random Repository" project._
