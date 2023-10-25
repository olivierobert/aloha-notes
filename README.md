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

### Process

The project was developed following this process:
1. Build a simple prototype with the core features in this branch: https://github.com/olivierobert/aloha-notes/tree/poc. This step was done to remove any technical uncertainties and to validate the core features.
2. Plan the final implementation with this GitHub Project: https://github.com/users/olivierobert/projects/1

### Known Issues

- Using a third-party for the wysiwyg editor would be easier to maintain and would provide more features, but the goal was to use as few dependencies as possible.
- Positioning of the "User Mention" dropdown is based on the current mouse position, insteaf of the position of the caret.
- Additional UI tests are required to validate the note editor.
