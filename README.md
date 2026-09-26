# Qnion

Qnion is a frontend-only prototype for AI-powered onion crate and batch grading at procurement centres (SIH 2026). It presents a procurement staff scanning flow and a prototype quality officer workspace for reviewing sample findings, bulb bounding boxes, batch grade breakdowns (Grade A, URS, Rejected), and client-generated inspection reports.

## What the prototype demonstrates

- A role-selection landing page for Procurement Staff and Quality Officer journeys.
- A procurement staff home experience with shared theme/language controls, and the `Scan Onion Batch` and `Meet the Team` actions.
- A six-item crate and heap image library. Selecting an item runs a timed, simulated preprocessing → bulb detection → quality grading → grade verdict sequence.
- Crate-specific bounding boxes, downgraded/rejected items, Grade A compliant elements, corrective actions, and case references loaded from local JSON fixtures.
- A client-side PDF inspection dossier generated with jsPDF from the selected fixture.
- An officer login and dashboard backed by intentionally static prototype records, including procurement centre sample analytics.
- A small source-linked FAQ assistant that answers recognised local keywords without making a network or AI API request.
- Warm onion light and dark themes, English/Hindi/Marathi UI strings, local team portraits, and social links.

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Role selection / landing page | Public |
| `/customer` | Procurement staff home | Public |
| `/customer#scanner` | Batch scanner | Public |
| `/customer#team` | Team section | Public |
| `/officer` | Officer demo login | Public |
| `/officer/dashboard` | Officer prototype dashboard | Demo session required |
| `/officer/scan` | Shared scanner in officer mode | Demo session required |
| `/officer/team` | Shared team section in officer mode | Demo session required |

Officer logout clears the demo session and returns to `/`, the public landing page.

## Quick start

Requirements: Node.js with npm available on the development machine.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```bash
npm run build
npm run preview
```

## Main user flows

### Procurement Staff

1. Open `/` and select Procurement Staff.
2. On the home view, choose `Scan Onion Batch` or use the navigation.
3. Choose one of the six local sample crate or heap images from the library.
4. Wait for the simulated pipeline (Preprocessing → Bulb Detection → Quality Grading → Verdict) to complete.
5. Review the image overlays, defect classifications (Good, Damaged, Rotten, Sprouted, Undersized), Grade A / URS / Rejected breakdown, and quality guidance.
6. Download the client-generated batch summary PDF, or choose another batch.
7. Open `Meet the Team` from the home action or header profile control.

### Quality Officer

1. Open `/` and select Quality Officer.
2. Use the demo credentials or the auto-fill control on `/officer`.
3. Review the clearly labelled prototype dashboard with inspection statistics, recurring defect trends, and recent batch records.
4. Use the dashboard actions to open the same scanner and team experiences.
5. Use the header logout control to return to `/`.

## Sample library

The fixtures are stored in `src/data/samples/` and are imported by `src/data/presets.ts`.

| Fixture | Case reference | Product / Batch | Default result |
| --- | --- | --- | --- |
| `sample1` | `QN-CRATE-001` | Nashik Red Onion Crate | Warning (72% Grade A) |
| `sample2` | `QN-CRATE-002` | Lasalgaon Mixed Heap | Action Needed (58% Grade A) |
| `sample3` | `QN-CRATE-003` | Pimpalgaon Premium Crate | Compliant (89% Grade A) |
| `sample4` | `QN-CRATE-004` | Yeola Storage Lot | Action Needed (46% Grade A) |
| `sample5` | `QN-CRATE-005` | Manmad Fresh Arrival | Warning (76% Grade A) |
| `sample6` | `QN-CRATE-006` | Sinnar Select Crate | Compliant (94% Grade A) |

Each fixture owns its batch metadata, image path, bounding boxes, defects/violations, compliant elements, and change log.

## Project structure

```text
src/
  App.tsx                 route resolver and shared customer/officer shell
  components/             header, dashboard actions, scanner, results, team, assistant
  context/                theme state and persistence
  data/                   sample fixtures, officer prototype records, FAQ sources
  i18n/                   English, Hindi, and Marathi strings
  pages/                  role selection, officer auth, officer dashboard
  services/               client-side PDF generation
  types/                  shared TypeScript models
public/assets/            crates, team portraits, logo, seal
docs/                     project, product, design, and contributor documentation
```

## Theme, language, and persistence

Theme and language are independent React providers:
- Theme is applied through `data-theme` on the root HTML element and persisted under `qnion:theme`.
- Language is persisted under `qnion:language` (supports `en` English, `hi` हिन्दी, and `mr` मराठी).
- The demo officer session uses `qnion:officer` in `sessionStorage`.

## Documentation index

- [Architecture](docs/ARCHITECTURE.md) — runtime structure, routes, data flow, and boundaries.
- [Customer guide](docs/CUSTOMER_GUIDE.md) — end-user walkthrough and troubleshooting.
- [Design system](docs/DESIGN.md) — visual language, warm onion themes, responsive rules, and accessibility.
- [Developer guide](docs/DEVELOPER_GUIDE.md) — setup, extension points, and verification.
- [Product requirements](docs/PRD.md) — prototype scope, journeys, requirements, and roadmap.
- [Rules and validation](docs/RULES.md) — grading rules and data guardrails.
