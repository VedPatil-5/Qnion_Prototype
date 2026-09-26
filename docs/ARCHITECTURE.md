# Architecture

## 1. Scope and operating model

Qnion is a single-page React 19 application built with Vite, TypeScript, and Tailwind CSS. It is a client-side prototype for onion quality assessment at procurement centres (SIH 2026). The browser manages route resolution, theme and language state, demo-session state, sample selection, simulated processing, result rendering, and PDF generation.

## 2. Runtime topology

```text
src/main.tsx
  └── App
     ├── ThemeProvider
     │  └── I18nProvider
     │     ├── public role selection (/)
     │     ├── officer auth (/officer or protected officer route)
     │     ├── officer dashboard (/officer/dashboard)
     │     └── CustomerShell
     │        ├── Header + GlobalControls
     │        ├── OverviewTab
     │        ├── ScannerTab
     │        │  ├── PhotosGrid
     │        │  ├── simulated PipelineStepper
     │        │  ├── BoundingBoxOverlay
     │        │  └── ResultsPanel
     │        ├── TeamTab
     │        └── ChatbotFab
     └── client-side PDF service (pdfService.ts)
```

## 3. Route map

| Path | Rendered surface | Access rule |
| --- | --- | --- |
| `/` | `RoleSelectionPage` | Public |
| `/officer` | `OfficerAuthPage` | Public |
| `/officer/dashboard` | `OfficerDashboardPage` | Requires `sessionStorage['qnion:officer'] === 'true'` |
| `/officer/scan` | `CustomerShell` with `ScannerTab` | Requires demo session |
| `/officer/team` | `CustomerShell` with `TeamTab` | Requires demo session |
| `/customer` | `CustomerShell` with `OverviewTab` | Public |
| `/customer#scanner` | `CustomerShell` with `ScannerTab` | Public |
| `/customer#team` | `CustomerShell` with `TeamTab` | Public |

## 4. Internationalization and Theme

- Theme: Light (warm onion tones) and Dark (deep roasted tones) persisted in `localStorage['qnion:theme']`.
- Language: English (`en`), Hindi (`hi`), and Marathi (`mr`) persisted in `localStorage['qnion:language']`.
