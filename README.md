# Aloha Notes 🥥

Next.JS-based note-taking application with a focus on UX and simplicity.

## Getting Started

### Prerequisites

- [Node](https://nodejs.org) ![node-version-image](https://img.shields.io/badge/node-18.12.1-brightgreen.svg)

### Development

Copy the `.env.example` file to `.env.local` and fill in the required values:

```bash
cp .env.example .env.local
```

Moidy the value of `NEXT_PUBLIC_SESSION` to a specific user session.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Testing

Run the non-UI tests:

```bash
npm run test
```

Run the UI tests:

1. First, install the required dependencies:

```bash
npx playwright install
```

2. Then, run the tests:

```bash
npm run test:ui
```

## Deployment

The application is automatically deployed to [Vercel](https://vercel.com) on every push to the `main` branch. The production version is available at [https://aloha-notes.vercel.app](https://aloha-notes.vercel.app).

## About

This project was created and is maintained by [Olivier Robert](https://github.com/olivierobert).
