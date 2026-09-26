# Developer guide

## 1. Development contract

The repository is a Vite/React/TypeScript frontend prototype for AI onion crate grading (SIH 2026).

## 2. Prerequisites and commands

```bash
npm install
npm run dev
```

Build verification:
```bash
npm run build
```

## 3. Repository structure

```text
src/App.tsx                    route resolver and shell
src/components/                Header, GlobalControls, ScannerTab, ResultsPanel, TeamTab, ChatbotFab
src/context/ThemeContext.tsx   warm light/dark theme provider
src/data/presets.ts            sample and team member presets
src/data/samples/*.json        six onion crate sample fixtures
src/data/gradingFaqs.ts       assistant FAQ responses
src/data/officerPrototypeData.ts sample officer metrics
src/i18n/index.tsx             English, Hindi, Marathi translations
src/pages/                     RoleSelectionPage, OfficerAuthPage, OfficerDashboardPage
src/services/pdfService.ts     client-side PDF batch report generator
src/types/index.ts             SampleDataset and shared interfaces
src/index.css                  theme CSS tokens
```
