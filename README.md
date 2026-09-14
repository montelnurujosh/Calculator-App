# Pythonic React Calculator

An interactive and responsive calculator web application designed with the authentic aesthetic and keyboard experience of a Python REPL (Read-Eval-Print Loop). Built with React 19, TypeScript, Tailwind CSS, and Vite.

## Features

- **Python REPL Aesthetic**: Terminal styling with `>>>` interactive prompts, syntax coloring, and simulated interpreter header (`Python 3.12.3`).
- **Python-Style Exponentiation**: Supports native Python power notation `**` (e.g. `2**8 = 256`) as well as caret `^`.
- **Keyboard History Navigation**: Cycle through previous expressions using the `↑` (Up) and `↓` (Down) arrow keys, just like a true Python console.
- **Python REPL Commands**: Type `clear()` or `cls` to clear the terminal history directly from the input prompt, or click the header button.
- **Advanced Math Evaluation**: Powered by bundled `mathjs` supporting arithmetic, precedence, grouping, constants (`pi`, `e`), and functions (`sqrt(x)`, `abs(x)`, `sin(x)`, etc.).
- **Graceful Error Handling**: Detects invalid syntax and division by zero, formatting them with Pythonic error messages (`ZeroDivisionError: division by zero`).
- **Responsive & Accessible**: Works seamlessly on mobile, tablet, and desktop with on-screen buttons and keyboard navigation, complete with `aria-label` screen reader support.

## Tech Stack

- **React 19**
- **TypeScript 5.8**
- **Vite 6**
- **Tailwind CSS 4**
- **math.js 15**
- **Vitest & React Testing Library**

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Running Tests

Run the full automated test suite (unit and integration tests):

```bash
npm test
```

To run in watch mode during development:

```bash
npm run test:watch
```

### Type Checking

Verify TypeScript types across the entire project:

```bash
npm run typecheck
```

### Production Build

Build the optimized, production-ready bundle with chunk splitting:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The project is fully configured for zero-config production deployment across major hosting platforms:

- **Netlify**: Configured via `netlify.toml` (`dist` publish directory with single-page application redirect rules).
- **Vercel**: Configured via `vercel.json` (`dist` output directory with rewrite rules).
- **GitHub Pages / Static Hosts**: Relative asset base path (`./`) configured in `vite.config.ts`.
- **Continuous Integration (CI)**: Automated GitHub Actions workflow at `.github/workflows/ci.yml` runs type-checking, tests, and builds on push and pull requests.
