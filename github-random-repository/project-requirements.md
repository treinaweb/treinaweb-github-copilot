# GitHub Random Repository - Project Requirements

## Overview

The **GitHub Random Repository** project is a web application designed to help users discover random repositories based on a selected programming language.  
The project emphasizes learning how to:

- Integrate external APIs
- Manage asynchronous requests
- Handle multiple UI states (empty, loading, error, success)
- Build responsive and dynamic user interfaces with JavaScript (Next.js + Tailwind CSS)

---

## Functional Requirements

- **Language Selection**:  
  Users must be able to select a programming language from a dropdown menu.

- **Fetch Random Repository**:  
  When a language is selected, the application must fetch repositories from GitHub's Repository Search API and display **one random repository** that matches the selected language.

- **Repository Details**:  
  Display the following repository information:
  - Name (with a clickable link to the repository)
  - Description
  - Number of Stars (⭐)
  - Number of Forks (🍴)
  - Number of Open Issues (🐛)
  - Language (🛠️)

- **UI States**:
  - **Empty State**:  
    Shown when no language is selected. Prompt the user to select a language.
  
  - **Loading State**:  
    Shown while fetching data from GitHub.
  
  - **Error State**:  
    Shown when the fetch operation fails (e.g., network error, API limit exceeded).

  - **Success State**:  
    Shown when a repository is successfully fetched.

- **Refresh Button**:  
  After a successful fetch, show a "Refresh" button that allows the user to fetch another random repository using the same language selection.

---

## Non-Functional Requirements

- **Responsiveness**:  
  The application must adapt to different screen sizes (mobile, tablet, desktop).

- **Accessibility**:  
  The app must use semantic HTML, keyboard navigability, and proper contrast for texts and buttons.

- **Performance**:  
  Ensure minimal loading times and smooth transitions between states.

- **Error Handling**:  
  - Gracefully handle API errors.
  - Show friendly error messages and allow retrying.

- **Code Quality**:
  - Use TypeScript for type safety.
  - Follow clean code practices.
  - Components should be reusable and modular.

---

## API Details

- **GitHub Search API Endpoint**:  
  `GET https://api.github.com/search/repositories?q=language:{selected_language}&sort=stars&order=desc`

- **Considerations**:
  - GitHub API responses are paginated (default 30 items per page). Randomly pick one item from the fetched list.
  - Be mindful of rate limiting for unauthenticated requests (60 requests/hour).

---

## Technology Stack

- **Next.js** (App Router architecture)
- **Tailwind CSS** (for styling)
- **TypeScript** (for strict type checking)
- **GitHub REST API** (for fetching repository data)

---

## User Interface Layout (Based on Provided Wireframe)

- **Header**: App title - "GitHub Repository Finder"
- **Dropdown**: Language selector
- **Message/Repository Card**:
  - "Please select a language" (empty state)
  - "Loading, please wait..." (loading state)
  - "Error fetching repositories" + "Click to retry" button (error state)
  - Repository details (success state)
- **Refresh Button**: Visible after a repository is loaded.

---

## Optional Enhancements (Stretch Goals)

- Implement dark mode.
- Allow users to bookmark or save favorite repositories.
- Provide a search bar to allow custom repository search beyond language.
- Handle API authentication (OAuth token) to avoid rate limiting issues.

---

## Reference

- [GitHub REST API Documentation - Search Repositories](https://docs.github.com/en/rest/search/search#search-repositories)
