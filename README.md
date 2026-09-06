# Book Index Generator — Frontend

An Angular client for the AI-powered book index generator. It lets users upload a PDF, generate a structured index, preview the results, and download them as a Word document.

**Maintained by:** dvora-wa
**Type:** Client project

## Overview

This is the user interface for the [Book Index Generator backend](https://github.com/dvora-wa/torah-index-backend). Users upload a book as a PDF, choose the type of index they want, optionally limit the page range, and receive a generated index they can preview and export.

## Features

- **PDF upload** — upload a book file for processing.
- **Index type selection** — choose between the supported index types (sources, topics, persons).
- **Page range selection** — optionally process only a specific range of pages.
- **Result preview** — preview the generated index entries before exporting.
- **Word export** — download the final index as a `.docx` file.
- **Admin panel** — dedicated screens for editing the AI prompts (prompt editor) and configuring the text chunking settings.
- **Centralized error handling** — an HTTP interceptor handles network errors across the app.

## Technical Stack

- **Framework:** Angular 20
- **Language:** TypeScript
- **UI components:** Angular Material
- **State management:** Angular Signals
- **HTTP:** Angular HttpClient with a custom error interceptor

## Architecture

- `components/index-generator` — the main index generation screen
- `admin/` — admin layout and pages (prompt editor, chunk settings)
- `services/` — API communication (index service, prompt-config service)
- `models/` — TypeScript interfaces for index data and configuration
- `interceptors/` — HTTP error handling

## Setup

```bash
# install dependencies
npm install

# run the development server
ng serve
```

Then open `http://localhost:4200/` in your browser.

### Configuration

The API base URL is configured in `src/environments/environment.ts`. Point it at your running instance of the backend service.

## Related Repository

- **Backend:** [torah-index-backend](https://github.com/dvora-wa/torah-index-backend) — the NestJS + OpenAI service this client talks to.

## Future Development / Roadmap

- Clean up commented-out code (e.g. the HTTP error interceptor).
- Add loading and progress indicators for long-running index generation.
- Add automated component tests.
