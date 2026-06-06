## Introduction

Building a personal blog with a wiki-style design offers a clean, distraction-free reading experience. This article walks through the architecture of a React-based wiki blog with Tailwind CSS and Vite.

## Component Architecture

The blog uses a component-based architecture with React. Each view — Home, Articles, Timeline, and Article Detail — is a separate component rendered conditionally based on navigation state.

### Navigation Pattern

Navigation uses a state-driven approach with a `currentView` variable controlling which page component is rendered. Future iterations could migrate to React Router for URL-based routing with deep linking support.

## Dark Mode Implementation

Dark mode uses the class-based strategy with Tailwind CSS. The user's preference is stored in localStorage, defaulting to the system preference via `prefers-color-scheme`.

## Conclusion

A wiki-style blog built with React and Tailwind CSS provides a fast, maintainable foundation. The component architecture makes it easy to extend with new features while keeping the codebase organized.
