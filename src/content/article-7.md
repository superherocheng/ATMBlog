## Introduction

Dark mode has become an expected feature in modern web applications. Tailwind CSS provides excellent support for implementing dark mode with minimal overhead.

## Strategy Selection

Tailwind supports three dark mode strategies: `media` (based on system preference), `class` (manual toggle), and hybrid approaches. The class strategy offers the most flexibility, allowing user override of system preference.

### Class Strategy Setup

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

## Persistent Preferences

Store the user's dark mode preference in localStorage and apply it on page load. Default to the system preference using the `prefers-color-scheme` media query.

## Conclusion

Tailwind CSS makes dark mode implementation straightforward. The class-based strategy provides the best user experience by respecting both system preferences and manual overrides.
