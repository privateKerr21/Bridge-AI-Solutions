import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import type { GeneratedReport } from "./types";

// ─── Fonts ───────────────────────────────────────────────────────────────
// Use system-safe fonts. @react-pdf/renderer can register custom fonts via
// Font.register({ family: 'Inter', src: '...' }) but for server-side render
// we keep it simple with Helvetica/Times built-ins.

// ─── Styles ─────────────────────────────────────────────────────────────

const colors = {
  paper: "#EDE7DD",
  bone: "#F4EFE8",
  ink: "#161310",
  clay: "#3B302A",
  mute: "#736A5D",
  hairline: "#D8D0C2",
  gilt: "#B89968",
  giltDeep: "#8E6F3C",
  cta: "#C8602E",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.paper,
    padding: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.ink,
  },
  // ── Header ──
  header: {
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
    paddingBottom: 16,
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerBrand: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 1.2,
    color: colors.ink,
  },
  headerEyebrow: {
    fontSize: 8,
    letterSpacing: 1.4,
    color: colors.mute,
    marginTop: 4,
  },
  headerMeta: {
    fontSize: 8,
    letterSpacing: 1.2,
    color: colors.mute,
  },
  // ── Title ──
  eyebrow: {
    fontSize: 8,
    letterSpacing: 1.4,
    color: colors.mute,
    marginBottom: 6,
  },
  h1: {
    fontFamily: "Times-Roman",
    fontSize: 22,
    lineHeight: 1.2,
    color: colors.ink,
    marginBottom: 24,
  },
  // ── Section ──
  section: {
    marginBottom: 24,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  sectionH: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    color: colors.ink,
    marginBottom: 10,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.55,
    color: colors.clay,
    marginBottom: 8,
  },
  // ── Facts ──
  factsRow: {
    flexDirection: "row",
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    borderBottomWidth: 1,
    borderBottomColor: colors.hairline,
  },
  fact: {
    flex: 1,
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: colors.hairline,
  },
  factLast: {
    flex: 1,
    padding: 12,
  },
  factLabel: {
    fontSize: 7,
    letterSpacing: 1.2,
    color: colors.mute,
    marginBottom: 4,
  },
  factValue: {
    fontSize: 10,
    color: colors.ink,
  },
  factHighlight: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    color: colors.giltDeep,
  },
  // ── Opportunity ──
  opportunity: {
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: 14,
    marginBottom: 10,
    backgroundColor: colors.bone,
  },
  opName: {
    fontFamily: "Times-Roman",
    fontSize: 12,
    color: colors.ink,
    marginBottom: 8,
  },
  opGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  opCell: {
    width: "50%",
    paddingRight: 8,
    paddingBottom: 8,
  },
  opCellFull: {
    width: "100%",
    paddingBottom: 4,
  },
  opLabel: {
    fontSize: 7,
    letterSpacing: 1.2,
    color: colors.mute,
    marginBottom: 2,
  },
  opValue: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.ink,
  },
  // ── Recommendation ──
  recommendation: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    color: colors.giltDeep,
    marginBottom: 10,
    lineHeight: 1.3,
  },
  scopeBox: {
    marginTop: 10,
    padding: 14,
    backgroundColor: colors.bone,
    borderLeftWidth: 2,
    borderLeftColor: colors.gilt,
  },
  scopeBlock: {
    marginBottom: 12,
  },
  scopeLabel: {
    fontSize: 7,
    letterSpacing: 1.2,
    color: colors.mute,
    marginBottom: 6,
  },
  phaseRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  phaseName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: colors.ink,
    width: "32%",
    paddingRight: 8,
  },
  phaseSummary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.clay,
    width: "68%",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 9,
    color: colors.gilt,
    width: 10,
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.ink,
    flex: 1,
  },
  scopeBody: {
    fontSize: 9,
    lineHeight: 1.55,
    color: colors.ink,
  },
  // ── Footer ──
  footer: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    letterSpacing: 1,
    color: colors.mute,
  },
  ctaBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.ink,
  },
  ctaText: {
    color: colors.paper,
    fontSize: 10,
    lineHeight: 1.5,
  },
  ctaLink: {
    color: colors.gilt,
    fontFamily: "Helvetica-Bold",
    marginTop: 8,
  },
});

// ─── Document component ─────────────────────────────────────────────────

function ReportDocument({ report }: { report: GeneratedReport }) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerBrand}>BRIDGE AI SOLUTIONS</Text>
            <Text style={styles.headerEyebrow}>// SHADOW WORK AUDIT</Text>
          </View>
          <Text style={styles.headerMeta}>{today.toUpperCase()}</Text>
        </View>

        {/* Title */}
        <Text style={styles.eyebrow}>// STRATEGIC ROADMAP · DESIGN PHASE</Text>
        <Text style={styles.h1}>{report.diagnosis.role_summary}</Text>

        {/* Diagnosis */}
        <View style={styles.section}>
          <Text style={styles.sectionH}>The Diagnosis</Text>
          <Text style={styles.body}>{report.diagnosis.narrative}</Text>
          <View style={styles.factsRow}>
            <View style={styles.fact}>
              <Text style={styles.factLabel}>SHADOW WORK CONCENTRATED IN</Text>
              <Text style={styles.factValue}>
                {report.diagnosis.shadow_work_areas.join(" · ")}
              </Text>
            </View>
            <View style={styles.factLast}>
              <Text style={styles.factLabel}>TIME RECLAIMABLE</Text>
              <Text style={styles.factHighlight}>
                {report.diagnosis.total_hours_reclaimable}
              </Text>
            </View>
          </View>
        </View>

        {/* Opportunity Matrix */}
        <View style={styles.section}>
          <Text style={styles.sectionH}>The Opportunity Matrix</Text>
          {report.opportunity_matrix.map((item, i) => (
            <View key={i} style={styles.opportunity} wrap={false}>
              <Text style={styles.opName}>{item.workflow_name}</Text>
              <View style={styles.opGrid}>
                <View style={styles.opCellFull}>
                  <Text style={styles.opLabel}>// PROBLEM / GOAL</Text>
                  <Text style={styles.opValue}>{item.problem_or_goal}</Text>
                </View>
                <View style={styles.opCellFull}>
                  <Text style={styles.opLabel}>// PROPOSED SOLUTION</Text>
                  <Text style={styles.opValue}>{item.proposed_solution}</Text>
                </View>
                <View style={styles.opCell}>
                  <Text style={styles.opLabel}>// ACTION</Text>
                  <Text style={styles.opValue}>{item.action_category}</Text>
                </View>
                <View style={styles.opCell}>
                  <Text style={styles.opLabel}>// IMPACT</Text>
                  <Text style={styles.opValue}>{item.impact}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionH}>The First Build</Text>
          <Text style={styles.recommendation}>
            {report.next_steps.recommended_first_build}
          </Text>
          <Text style={styles.body}>{report.next_steps.rationale}</Text>

          <View style={styles.scopeBox}>
            <View style={styles.scopeBlock}>
              <Text style={styles.scopeLabel}>// PHASES</Text>
              {report.next_steps.scope.phases.map((phase, i) => (
                <View key={i} style={styles.phaseRow} wrap={false}>
                  <Text style={styles.phaseName}>{phase.name}</Text>
                  <Text style={styles.phaseSummary}>{phase.summary}</Text>
                </View>
              ))}
            </View>

            <View style={styles.scopeBlock}>
              <Text style={styles.scopeLabel}>// KEY COMPONENTS</Text>
              {report.next_steps.scope.key_components.map((c, i) => (
                <View key={i} style={styles.bullet} wrap={false}>
                  <Text style={styles.bulletDot}>·</Text>
                  <Text style={styles.bulletText}>{c}</Text>
                </View>
              ))}
            </View>

            <View>
              <Text style={styles.scopeLabel}>// DEFINITION OF DONE</Text>
              <Text style={styles.scopeBody}>{report.next_steps.scope.definition_of_done}</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaText}>
            You could take this roadmap and run with it. Or, if you&apos;d rather have it
            built for you, reply to the email this report came in on — we&apos;ll talk
            through the first build and decide if it&apos;s worth doing together.
          </Text>
          <Text style={styles.ctaLink}>hello@aibridgedsolutions.com</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>BRIDGE AI SOLUTIONS</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}

// ─── Public API ─────────────────────────────────────────────────────────

export async function renderReportPdf(report: GeneratedReport): Promise<Buffer> {
  const instance = pdf(<ReportDocument report={report} />);
  const blob = await instance.toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
