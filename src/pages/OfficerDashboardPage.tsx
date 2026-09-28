import React, { useState } from "react";
import {
  Activity,
  BarChart3,
  Download,
  FileCheck2,
  FileText,
  LoaderCircle,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useI18n } from "../i18n";
import { GlobalControls } from "../components/GlobalControls";
import { ChatbotFab } from "../components/ChatbotFab";
import {
  officerStats,
  recentInspections,
  penaltyRecords,
} from "../data/officerPrototypeData";
import { SAMPLE_DATASETS } from "../data/presets";
import { generateInspectionPdf } from "../services/pdfService";
import { DashboardActions } from "../components/DashboardActions";

const statusClass = (status: string) =>
  status === "COMPLIANT"
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
    : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300";
const ONION_BROWN = "#8b4513";
const VIOLATION_CRIMSON = "#8b2d1c";
const violationCategoryData = [
  { category: "Rotten / Soft Rot", percentage: 68 },
  { category: "Sprouting", percentage: 45 },
  { category: "Undersized / Small", percentage: 38 },
  { category: "Skin Damage / Cuts", percentage: 24 },
];

const toInspectionDate = (timestamp?: string) => {
  if (!timestamp) return null;
  const date = new Date(`${timestamp.split(" - ")[0]} 12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
};

const fixtureInspectionDates = SAMPLE_DATASETS.map((sample) =>
  toInspectionDate(sample.inspectionDateTime),
).filter((date): date is Date => date !== null);
const latestFixtureDate = new Date(
  Math.max(...fixtureInspectionDates.map((date) => date.getTime())),
);
const fixtureActivity = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(latestFixtureDate);
  date.setDate(date.getDate() - (6 - index));
  const inspections = fixtureInspectionDates.filter(
    (fixtureDate) => fixtureDate.toDateString() === date.toDateString(),
  ).length;
  return {
    day: `${date.getDate()}`,
    date: date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    inspections,
  };
});

const averageGrade = (key: "gradeA" | "urs" | "rejected") =>
  Math.round(
    SAMPLE_DATASETS.reduce(
      (total, sample) => total + sample.gradeBreakdown[key],
      0,
    ) / SAMPLE_DATASETS.length,
  );

const totalOnionsInspected = SAMPLE_DATASETS.reduce(
  (total, sample) => total + sample.boundingBoxes.length,
  0,
);
const totalDefectiveOnions = SAMPLE_DATASETS.reduce(
  (total, sample) =>
    total + sample.boundingBoxes.filter((onion) => onion.label !== "GOOD").length,
  0,
);

const defectData = [
  { label: "Rotten", code: "ROTTEN", color: "#8b2d1c" },
  { label: "Sprouted", code: "SPROUTED", color: "#c98a12" },
  { label: "Damaged", code: "DAMAGED", color: "#a0522d" },
  { label: "Undersized", code: "UNDERSIZED", color: "#6b8e23" },
].map((defect) => ({
  ...defect,
  count: SAMPLE_DATASETS.reduce(
    (total, sample) =>
      total +
      sample.boundingBoxes.filter((onion) => onion.label === defect.code).length,
    0,
  ),
}));

const maxDefectCount = Math.max(...defectData.map((defect) => defect.count));

const centreName = (location?: string) =>
  (location ?? "Not recorded").replace(/\s+Procurement Centre$/i, "");

export const OfficerDashboardPage: React.FC<{
  navigate: (path: string) => void;
}> = ({ navigate }) => {
  const { t, language } = useI18n();
  const [downloadingReport, setDownloadingReport] = useState<string | null>(
    null,
  );
  const [reportMessage, setReportMessage] = useState("");
  const downloadSampleReport = async (sampleId: string) => {
    const sample = SAMPLE_DATASETS.find((dataset) => dataset.id === sampleId);
    if (!sample) {
      setReportMessage(t("reportUnavailable"));
      return;
    }
    setDownloadingReport(sampleId);
    setReportMessage("");
    try {
      await generateInspectionPdf(sample, { language });
      setReportMessage(t("pdfDownloaded"));
    } catch {
      setReportMessage(t("reportUnavailable"));
    } finally {
      setDownloadingReport(null);
    }
  };
  const cards = [
    [t("totalInspections"), officerStats.inspections, Activity],
    [t("compliantProducts"), officerStats.compliant, ShieldCheck],
    [t("nonCompliantProducts"), officerStats.nonCompliant, ShieldAlert],
    [t("violationsDetected"), officerStats.violations, Target],
    [t("reportsGenerated"), officerStats.reports, FileText],
  ] as const;
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] font-sans">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/assets/qnion-logo.png"
              alt={t("brand")}
              className="h-9 w-9 rounded-xl bg-[#fff4de] object-contain"
            />
            <span className="hidden font-display text-lg font-bold sm:inline">
              {t("dashboard")}
            </span>
          </button>
          <div className="flex items-center gap-2">
            <GlobalControls compact />
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem("qnion:officer");
                navigate("/");
              }}
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--primary)] cursor-pointer"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-7">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {t("prototype")}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold">
              {t("dashboard")}
            </h1>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {t("sampleData")}
            </p>
          </div>
        </div>
        <DashboardActions
          onNavigateToScanner={() => navigate("/officer/scan")}
          onNavigateToTeam={() => navigate("/officer/team")}
        />
        <section>
          <h2 className="mb-3 font-display text-lg font-bold">
            {t("overview")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map(([label, value, Icon]) => (
              <div
                key={label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {label}
                  </span>
                  <Icon className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <p className="mt-4 font-display text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="order-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-bold">
                {t("inspectionSummary")}
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {t("recentSub")}
              </p>
            </div>
            <FileCheck2 className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {[
              [t("totalOnionsInspected"), String(totalOnionsInspected)],
              [t("gradeAPercentage"), `${averageGrade("gradeA")}%`],
              [t("ursPercentage"), `${averageGrade("urs")}%`],
              [t("rejectedPercentage"), `${averageGrade("rejected")}%`],
              [t("averageQualityScore"), `${averageGrade("gradeA")}%`],
              [t("defectiveOnions"), String(totalDefectiveOnions)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
                  {label}
                </p>
                <p className="mt-2 font-display text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
          {reportMessage && (
            <p
              role="status"
              className="mt-3 rounded-xl bg-[var(--primary-soft)] px-3 py-2 text-xs font-semibold text-[var(--primary)]"
            >
              {reportMessage}
            </p>
          )}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Date / Time</th>
                  <th className="p-3">{t("status")}</th>
                  <th className="p-3">{t("violations")}</th>
                  <th className="p-3">{t("report")}</th>
                </tr>
              </thead>
              <tbody>
                {recentInspections.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[var(--border)] last:border-0"
                  >
                    <td className="p-3 font-mono text-xs">{item.id}</td>
                    <td className="p-3 font-semibold">{item.product}</td>
                    <td className="p-3 text-[var(--muted)]">{item.time}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold ${statusClass(item.status)}`}
                      >
                        {item.status === "COMPLIANT"
                          ? t("compliant")
                          : t("nonCompliant")}
                      </span>
                    </td>
                    <td className="p-3 text-[var(--muted)]">
                      {item.violation}
                    </td>
                    <td className="p-3">
                      {item.report ? (
                        <button
                          type="button"
                          aria-label={`${t("viewDetails")} - ${t("downloadReport")}`}
                          onClick={() => void downloadSampleReport(item.sampleId)}
                          disabled={downloadingReport === item.sampleId}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] disabled:opacity-50 cursor-pointer"
                        >
                          <span>{t("downloadReport")}</span>
                          {downloadingReport === item.sampleId ? (
                            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Download className="h-3.5 w-3.5" />
                          )}
                        </button>
                      ) : (
                        <span className="text-xs text-[var(--muted)]">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="order-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">
                {t("penaltyTracker")}
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {t("prototypeAmount")}
              </p>
            </div>
            <ShieldAlert className="h-5 w-5 text-red-500" />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {penaltyRecords.map((item) => (
              <div
                key={`${item.product}-${item.issue}`}
                className="rounded-xl border border-[var(--border)] p-3"
              >
                <div className="flex justify-between gap-3">
                  <p className="font-semibold">{item.product}</p>
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {item.amount}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {item.issue}
                </p>
                <p className="mt-2 text-xs text-[var(--primary)]">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="order-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">{t("evidence")}</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">{t("noData")}</p>
            </div>
            <MapPin className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {SAMPLE_DATASETS.slice(0, 4).map((sample) => (
              <article
                key={sample.id}
                className="rounded-xl border border-[var(--border)] p-3"
              >
                <div className="flex gap-3">
                  <img
                    src={sample.thumbnailUrl ?? sample.imagePath}
                    alt={`${sample.name} sample`}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold">
                      {sample.caseReference ?? sample.id}
                    </p>
                    <h3 className="mt-1 truncate font-semibold">{sample.name}</h3>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      Procurement Centre: {centreName(sample.inspectionLocation)}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {(sample.inspectionDateTime ?? "Not recorded").replace(
                        " - ",
                        " | ",
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-[var(--success-soft)] px-2 py-2">
                    <p className="text-[10px] text-[var(--muted)]">Grade A</p>
                    <p className="text-sm font-bold text-[var(--success)]">
                      {sample.gradeBreakdown.gradeA}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--warning-soft)] px-2 py-2">
                    <p className="text-[10px] text-[var(--muted)]">URS</p>
                    <p className="text-sm font-bold text-[var(--warning)]">
                      {sample.gradeBreakdown.urs}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--danger-soft)] px-2 py-2">
                    <p className="text-[10px] text-[var(--muted)]">Rejected</p>
                    <p className="text-sm font-bold text-[var(--danger)]">
                      {sample.gradeBreakdown.rejected}%
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={sample.imagePath}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {t("viewSample")}
                  </a>
                  <button
                    type="button"
                    onClick={() => void downloadSampleReport(sample.id)}
                    disabled={downloadingReport === sample.id}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[var(--primary)] px-3 py-2 text-xs font-semibold text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 cursor-pointer"
                  >
                    {downloadingReport === sample.id ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    {t("downloadReport")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="order-7 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">
                  {t("defectAnalysis")}
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Detected markers across sample fixtures
                </p>
              </div>
              <ShieldAlert className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div className="mt-5 space-y-4">
              {defectData.map((defect) => (
                <div key={defect.code}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold">{defect.label}</span>
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {defect.count}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[var(--surface-soft)]">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(defect.count / maxDefectCount) * 100}%`,
                        backgroundColor: defect.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate("/officer/scan")}
              className="mt-5 inline-flex items-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--primary)] hover:border-[var(--primary)] cursor-pointer"
            >
              {t("detailedAnalysis")}
            </button>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-bold">
                  {t("procurementComparison")}
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Quality mix by sample procurement centre
                </p>
              </div>
              <MapPin className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[430px] text-left text-sm">
                <thead className="border-b border-[var(--border)] text-xs text-[var(--muted)]">
                  <tr>
                    <th className="p-3">Procurement Centre</th>
                    <th className="p-3">Grade A</th>
                    <th className="p-3">URS</th>
                    <th className="p-3">Rejected</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_DATASETS.map((sample) => (
                    <tr
                      key={sample.id}
                      className="border-b border-[var(--border)] last:border-0"
                    >
                      <td className="p-3 font-semibold">
                        {centreName(sample.inspectionLocation)}
                      </td>
                      <td className="p-3 text-[var(--success)]">
                        {sample.gradeBreakdown.gradeA}%
                      </td>
                      <td className="p-3 text-[var(--warning)]">
                        {sample.gradeBreakdown.urs}%
                      </td>
                      <td className="p-3 text-[var(--danger)]">
                        {sample.gradeBreakdown.rejected}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <section className="order-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">
                {t("monitoring")}
              </h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                {t("sampleData")}
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div className="mt-5 grid grid-cols-1 items-start gap-5 md:grid-cols-3">
            <div className="flex min-w-0 flex-col">
              <p className="text-xs font-semibold text-[var(--muted)]">
                {t("compliance")}
              </p>
              <div
                className="relative mt-3 h-40"
                aria-label="Compliance ratio across sample fixtures"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: t("compliant"),
                          count: SAMPLE_DATASETS.filter(
                            (sample) => sample.defaultStatus === "COMPLIANT",
                          ).length,
                        },
                        {
                          name: t("nonCompliant"),
                          count: SAMPLE_DATASETS.filter(
                            (sample) => sample.defaultStatus !== "COMPLIANT",
                          ).length,
                        },
                      ]}
                      dataKey="count"
                      nameKey="name"
                      innerRadius={38}
                      outerRadius={58}
                      paddingAngle={3}
                      labelLine={false}
                      label={({ percent }) =>
                        `${Math.round((percent ?? 0) * 100)}%`
                      }
                    >
                      <Cell fill={ONION_BROWN} />
                      <Cell fill={VIOLATION_CRIMSON} />
                      <Label
                        value={`${SAMPLE_DATASETS.length} fixtures`}
                        position="center"
                        fill="var(--muted)"
                        fontSize={10}
                      />
                    </Pie>
                    <Tooltip
                      cursor={false}
                      formatter={(value, name) => [
                        `${value} fixture${Number(value) === 1 ? "" : "s"}`,
                        name,
                      ]}
                      contentStyle={{
                        borderColor: "var(--border)",
                        borderRadius: "0.75rem",
                        boxShadow: "none",
                        backgroundColor: "var(--card)",
                        color: "var(--text)"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-3 text-[10px] font-semibold text-[var(--muted)]">
                <span className="inline-flex items-center gap-1">
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ONION_BROWN }}
                  />
                  {t("compliant")} ·{" "}
                  {
                    SAMPLE_DATASETS.filter(
                      (sample) => sample.defaultStatus === "COMPLIANT",
                    ).length
                  }
                </span>
                <span className="inline-flex items-center gap-1">
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: VIOLATION_CRIMSON }}
                  />
                  {t("nonCompliant")} ·{" "}
                  {
                    SAMPLE_DATASETS.filter(
                      (sample) => sample.defaultStatus !== "COMPLIANT",
                    ).length
                  }
                </span>
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="text-xs font-semibold text-[var(--muted)]">
                {t("inspectionActivity")}
              </p>
              <div
                className="mt-3 h-40"
                aria-label="Inspection activity across seven fixture days"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={fixtureActivity}
                    margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
                  >
                    <Tooltip
                      cursor={false}
                      labelFormatter={(_, payload) =>
                        payload[0]?.payload.date ?? ""
                      }
                      formatter={(value) => [
                        `${value} inspection${Number(value) === 1 ? "" : "s"}`,
                        t("inspectionActivity"),
                      ]}
                      contentStyle={{
                        borderColor: "var(--border)",
                        borderRadius: "0.75rem",
                        boxShadow: "none",
                        backgroundColor: "var(--card)",
                        color: "var(--text)"
                      }}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted)", fontSize: 10 }}
                    />
                    <Bar
                      dataKey="inspections"
                      fill={ONION_BROWN}
                      radius={[4, 4, 0, 0]}
                      maxBarSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex min-w-0 flex-col">
              <p className="text-xs font-semibold text-[var(--muted)]">
                {t("violationCategories")}
              </p>
              <div
                className="mt-3 h-40"
                aria-label="Violation category percentages"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={violationCategoryData}
                    layout="vertical"
                    margin={{ top: 2, right: 8, left: 2, bottom: 0 }}
                  >
                    <Tooltip
                      cursor={false}
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{
                        borderColor: "var(--border)",
                        borderRadius: "0.75rem",
                        boxShadow: "none",
                        backgroundColor: "var(--card)",
                        color: "var(--text)"
                      }}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tickFormatter={(value) => `${value}%`}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted)", fontSize: 10 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      axisLine={false}
                      tickLine={false}
                      width={100}
                      tick={{ fill: "var(--muted)", fontSize: 10 }}
                    />
                    <Bar
                      dataKey="percentage"
                      fill={ONION_BROWN}
                      radius={[0, 4, 4, 0]}
                      maxBarSize={16}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ChatbotFab officerMode />
    </div>
  );
};
