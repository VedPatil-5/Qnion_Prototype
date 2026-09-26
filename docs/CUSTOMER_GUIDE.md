# Procurement Staff Guide

## 1. Before you begin

Qnion is a browser prototype for onion quality grading at procurement centres (SIH 2026). It uses local sample crate/heap images and prepared findings to demonstrate the grading workflow without requiring a live backend or camera hardware.

## 2. Open the experience

1. Start the project with `npm run dev` and open the local Vite URL.
2. On the public landing page, select **Procurement Staff** and continue.
3. The home view contains the workflow overview and primary actions:
   - **Scan Onion Batch** opens the batch scanner.
   - **Meet the Team** opens the team section.
4. The header provides language (English, हिन्दी, मराठी) and theme (Light, Dark) controls.

## 3. Run a sample batch grading

1. Select **Scan Onion Batch**.
2. Select **Choose from Library**.
3. Pick one of the six onion crate or heap images.
4. The scanner displays a timed four-stage simulation:
   - Pre-processing;
   - Bulb Detection;
   - Quality Grading; and
   - Grade Verdict.
5. When processing finishes, review the bounding box overlays and results:
   - Grade A percentage (sound, marketable onions);
   - URS percentage (under-size / sortable onions with minor defects or sprouting);
   - Rejected percentage (rotten / decayed onions);
   - Quality guidance and corrective actions.
6. Select **Download Batch Report PDF** to generate and save a summary report.

## 4. Library contents

| Batch / Fixture | Case Reference | Quality Profile |
| --- | --- | --- |
| Nashik Red Onion Crate | QN-CRATE-001 | 72% Grade A · 23% URS · 5% Rejected |
| Lasalgaon Mixed Heap | QN-CRATE-002 | 58% Grade A · 31% URS · 11% Rejected |
| Pimpalgaon Premium Crate | QN-CRATE-003 | 89% Grade A · 9% URS · 2% Rejected |
| Yeola Storage Lot | QN-CRATE-004 | 46% Grade A · 38% URS · 16% Rejected |
| Manmad Fresh Arrival | QN-CRATE-005 | 76% Grade A · 20% URS · 4% Rejected |
| Sinnar Select Crate | QN-CRATE-006 | 94% Grade A · 5% URS · 1% Rejected |
