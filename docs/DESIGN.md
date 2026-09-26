# Design system

## 1. Design intent

Qnion is designed as a calm, quality-inspection-oriented workspace for onion grading at procurement centres (SIH 2026): clear hierarchy, compact crate cards, explicit grade status colours (Grade A / URS / Rejected), and short actions. The interface should feel trustworthy and practical for procurement centre staff and quality officers.

The warm onion light theme is the reference visual language. Dark mode is an independent theme with its own surface, border, text, control, status, and hover values. Layout, content, and interaction behaviour remain shared between themes.

## 2. Visual foundations

### Light theme

The light palette uses warm onion tones (creams, warm sands, deep onion browns, harvest amber, and fresh olive green):

| Token | Value | Use |
| --- | --- | --- |
| `--surface` | `#fdf8f0` | Page background |
| `--surface-strong` | `#f5ebdd` | Stronger background / cards |
| `--surface-raised` | `#faf3e9` | Inner sections / cards |
| `--surface-soft` | `#efe3d4` | Secondary controls and icon wells |
| `--card` | `#fffef9` | Raised cards and dialogs |
| `--text` | `#2d2218` | Headings and primary text |
| `--muted` | `#8b755d` | Supporting copy |
| `--border` | `#d4c0a8` | Card and control borders |
| `--primary` | `#a0522d` | Primary action and link colour (onion brown) |
| `--primary-hover` | `#8b4513` | Primary action hover |
| `--primary-soft` | `#f5e6dc` | Primary tint |
| `--success` | `#6b8e23` | Grade A status |
| `--warning` | `#c98a12` | URS (under-size/sortable) |
| `--danger` | `#8b2d1c` | Rejected / rot |

### Dark theme

Dark mode uses deep warm roasted tones rather than stark blue or pitch black:

| Token | Value | Use |
| --- | --- | --- |
| `--surface` | `#1e1812` | Page background |
| `--card` | `#261e14` | Raised cards and dialogs |
| `--surface-raised` | `#241d15` | Inner sections |
| `--surface-soft` | `#3d3024` | Secondary controls and icon wells |
| `--text` | `#f5ebe0` | Headings and primary text |
| `--muted` | `#c9b8a0` | Supporting copy |
| `--border` | `#4a3d2e` | Card and control borders |
| `--primary` | `#d4a574` | Primary link and action colour |
| `--success` | `#a3c453` | Grade A status |
| `--warning` | `#f0c05f` | URS status |
| `--danger` | `#f0a08c` | Rejected status |

## 3. Typography

- Body text uses the Inter system stack defined by `--font-sans`.
- Display headings use Plus Jakarta Sans through `--font-display`.
- IDs, references, and technical values may use the JetBrains Mono stack.
- Hindi and Marathi use the bundled Devanagari font support with natural agricultural procurement terminology.

## 4. Layout and responsive behaviour

- Dashboard actions stack on narrow screens and sit side-by-side when space allows.
- Scanner controls remain full-width and touch-friendly.
- Team cards use responsive columns (1 on mobile, 2 on medium, 3 on desktop).
- Officer tables use horizontal overflow rather than shrinking critical columns.
