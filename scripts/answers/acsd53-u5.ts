import { QuestionData, GeneratedAnswer } from "./types";

export function getAcsd53Unit5Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
      case 3:
        return {
          summary: "Comprehensive guide to authoring a professional Penetration Testing Report: Executive Summary, Testing Methodology, Technical Findings, CVSS v3.1 Risk Prioritization, and Remediation Roadmap.",
          keyPoints: [
            "The Penetration Testing Report is the primary tangible business deliverable of an engagement.",
            "Bifurcated architecture: High-level Executive Summary (for C-suite/Board) and detailed Technical Findings (for engineers).",
            "Technical Findings structure: Title, CVSS score, affected asset, description, step-by-step reproduction PoC, impact, and remediation.",
            "Includes strategic remediation roadmap prioritized by risk vs implementation effort."
          ],
          content: `## 1. Introduction: The Central Deliverable
The **Penetration Testing Report** is the primary tangible business deliverable of an ethical hacking engagement. Regardless of the technical brilliance of the exploitation, an engagement is judged by the clarity, professionalism, and actionable utility of its final report.

\`\`\`
                         THE PENETRATION TESTING DELIVERABLE
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: EXECUTIVE SUMMARY                                           │
│ - High-level risk posture dashboard for Board & C-Suite                │
│ - Commercial risk impact, compliance status, strategic recommendations │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 2: ASSESSMENT METHODOLOGY & SCOPE                              │
│ - Rules of Engagement, testing timeline, tools, exclusions             │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 3: TECHNICAL VULNERABILITY FINDINGS                            │
│ - Detailed findings: Description, CVSS v3.1 score, Affected Hosts      │
│ - Step-by-Step Proof-of-Concept (PoC) Reproduction Steps               │
├────────────────────────────────────────────────────────────────────────┤
│ SECTION 4: STRATEGIC REMEDIATION ROADMAP                               │
│ - Immediate Hotfixes (24-48 hrs), Short-Term (30 days), Long-Term (90d)│
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 2. In-Depth Report Architecture Breakdown

### Section 1: The Executive Summary (Audience: CEO, CFO, CISO, Board)
- **Non-Technical Language:** Translates technical jargon into business and financial terms.
- **Risk Posture Dashboard:** Visual charts (e.g., finding distribution across Critical, High, Medium, Low).
- **Core Business Impact:** Answers the key questions: *Could customer payment data be stolen? Could operations be halted by ransomware? Are we compliant with PCI-DSS / HIPAA?*

### Section 2: Assessment Methodology & Scope
- Formally references the **PTES (Penetration Testing Execution Standard)** and **NIST SP 800-115**.
- Documents the authorized testing IP addresses, test dates, and explicit constraints.

### Section 3: Technical Vulnerability Findings (Audience: IT Security Engineers)
Each individual vulnerability finding must follow a rigorous, standardized format:
1. **Vulnerability Title & Tracking ID:** (e.g., \`SEC-01: Remote Code Execution via Log4j\`).
2. **Severity & CVSS v3.1 Vector:** Base Score, Temporal Score, Environmental Vector.
3. **Affected Assets:** Specific URLs, hostnames, IP addresses, and ports.
4. **Vulnerability Description:** Academic explanation of the underlying flaw.
5. **Step-by-Step Proof-of-Concept (PoC):** Verifiable, reproducible instructions, curl commands, and sanitised screenshots demonstrating exact exploitation.
6. **Remediation Guidance:** Specific patch versions, configuration lines, and defensive rule recommendations.

### Section 4: Prioritized Remediation Roadmap
- **Immediate Hotfixes (24–48 Hours):** Remediate Critical/High CVEs (patching public-facing zero-days, revoking compromised admin credentials).
- **Short-Term Actions (30 Days):** Enforce Multi-Factor Authentication (MFA), fix SQL injections, implement internal network segmentation.
- **Strategic Architectural Overhaul (90+ Days):** Deploy Zero Trust Architecture, transition to automated CI/CD static security scanning (SAST/DAST).

---

## 3. Exam Summary
A professional penetration testing report bridges technical findings and corporate governance: it contains a non-technical **Executive Summary** for leadership, detailed **Technical Findings with reproducible PoCs** for developers, and a **Prioritized Remediation Roadmap**.'`
        };

      case 2:
        return {
          summary: "Comprehensive technical framework for Vulnerability Prioritization and Risk Scoring using the Common Vulnerability Scoring System (CVSS v3.1).",
          keyPoints: [
            "Raw vulnerability counts are meaningless; flaws must be prioritized based on real business risk.",
            "CVSS v3.1 computes scores across three metric groups: Base, Temporal, and Environmental.",
            "Risk is mathematically defined as: Risk = Likelihood x Impact.",
            "Prioritization balances exploit availability (exploit-db, in-the-wild weaponization) against asset criticality."
          ],
          content: `## 1. Introduction: The Need for Risk Prioritization
In modern enterprise environments, vulnerability scanners regularly output hundreds or thousands of theoretical weaknesses. Security teams have finite budgets and engineering hours. **Vulnerability Prioritization** is the scientific process of ranking vulnerabilities based on actual **operational risk and business impact**.

\`\`\`
       ┌────────────────────────┐
       │   Discovered Flaw      │ (CVE-2023-XXXX)
       └───────────┬────────────┘
                   │
                   ▼
       ┌────────────────────────┐
       │    CVSS v3.1 Metrics   │ ──► Base Score (Intrinsic Qualities)
       └───────────┬────────────┘ ──► Temporal Score (Exploit Maturity)
                   │              ──► Environmental Score (Asset Criticality)
                   ▼
       ┌────────────────────────┐
       │ Calculated Risk Rating │ ──► Critical / High / Medium / Low
       └───────────┬────────────┘
                   │
                   ▼
       [Remediation Pipeline Action]
\`\`\`

---

## 2. The Common Vulnerability Scoring System (CVSS v3.1)

CVSS v3.1 provides an open, vendor-neutral standard for calculating severity on a scale from **0.0 to 10.0**:

### 1. Base Metric Group (Intrinsic Qualities Over Time and Space)
- **Exploitability Metrics:**
  - *Attack Vector (AV):* Network (N) vs. Adjacent (A) vs. Local (L) vs. Physical (P).
  - *Attack Complexity (AC):* Low (L) vs. High (H).
  - *Privileges Required (PR):* None (N) vs. Low (L) vs. High (H).
  - *User Interaction (UI):* None (N) vs. Required (R).
  - *Scope (S):* Unchanged (U) vs. Changed (C) (critical metric: indicates whether exploit impacts components beyond the vulnerable entity, e.g., VM escape).
- **Impact Metrics (The CIA Triad):**
  - *Confidentiality Impact (C):* None (N), Low (L), High (H).
  - *Integrity Impact (I):* None (N), Low (L), High (H).
  - *Availability Impact (A):* None (N), Low (L), High (H).

### 2. Temporal Metrics (Changes Over Time)
- *Exploit Code Maturity (E):* Unproven vs. Proof-of-Concept vs. Functional vs. High (active in-the-wild exploitation).
- *Remediation Level (RL):* Official Fix vs. Temporary Fix vs. Workaround vs. Unavailable.

### 3. Environmental Metrics (Customized to Specific Enterprise Context)
- Tailors the score to the specific asset's role in the organization. A critical RCE on an isolated test machine without internet access receives an Environmental Score significantly lower than on the primary customer database.

---

## 3. The Classic Risk Matrix Formulation
$$\\mathbf{\\text{Risk} = \\text{Likelihood (Exploitability)} \\times \\text{Impact (Business Damage)}}$$

| Severity Rating | CVSS v3.1 Score Range | Required Remediation SLA |
| :--- | :--- | :--- |
| **Critical** | **9.0 – 10.0** | Remediate within **24 – 48 Hours** |
| **High** | **7.0 – 8.9** | Remediate within **7 Days** |
| **Medium** | **4.0 – 6.9** | Remediate within **30 Days** |
| **Low** | **0.1 – 3.9** | Remediate within **90 Days / Next Release Cycle** |
| **None** | **0.0** | Informational; no SLA |

---

## 4. Exam Summary
Vulnerability prioritization evaluates **Likelihood $\\times$ Impact**. The **CVSS v3.1 framework** quantifies risk across **Base** (exploitability & CIA impact), **Temporal** (in-the-wild exploit maturity), and **Environmental** (asset business criticality) metric groups to establish strict remediation SLAs.`
        };
    }
  }

  // ==========================================
  // PART B (10 MARKS)
  // ==========================================
  if (part === "PART B") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive explanation of the purpose and value proposition of the Penetration Testing Deliverable in enterprise risk governance.",
          keyPoints: [
            "The deliverable is the ultimate return on investment for the organization.",
            "Translates simulated attacks into actionable defensive engineering tasks.",
            "Provides evidence for compliance audits (PCI-DSS, ISO 27001, SOC 2).",
            "Serves as an authoritative benchmark for tracking security maturity over time."
          ],
          content: `## 1. What is the Penetration Testing Deliverable?
The **Penetration Testing Deliverable** is the formal, consolidated documentation package presented to client executives and technical stakeholders upon the conclusion of an ethical hacking assessment. It represents the permanent record and intellectual product of the engagement.

---

## 2. Core Purposes of the Deliverable

1. **Demonstrating Proof of Real-World Vulnerability:** Eliminates theoretical speculation. The report provides incontrovertible proof that specific attack vectors can compromise internal systems.
2. **Providing an Actionable Engineering Remediation Guide:** Security audits that merely point out flaws without guidance create paralysis. A professional deliverable provides precise code snippets, configuration directives, and architectural fixes.
3. **Satisfying Regulatory and Legal Compliance:** Acts as legal evidence of due diligence required by regulatory standards:
   - **PCI-DSS Requirement 11.3:** Requires documented annual internal and external penetration testing reports.
   - **SOC 2 Type II Audits:** Proves that management conducts third-party vulnerability testing.
4. **Benchmarking Security Maturity Over Time:** Allows executive leadership to compare year-over-year security postures, measuring whether remediation investments successfully reduce organizational attack surfaces.

---

## 3. Exam Summary
The penetration testing deliverable provides **tangible evidence of real-world risk**, delivers an **actionable engineering roadmap for remediation**, satisfies **mandatory regulatory compliance (PCI-DSS, SOC 2)**, and establishes an authoritative **security maturity benchmark**.'`
        };

      case 9:
        return {
          summary: "Comprehensive technical analysis of the Incident Management Lifecycle in cybersecurity, detailing all six standard phases defined by NIST SP 800-61.",
          keyPoints: [
            "NIST SP 800-61 defines 6 phases: 1) Preparation, 2) Detection & Analysis, 3) Containment, 4) Eradication, 5) Recovery, 6) Post-Incident Activity (Lessons Learned).",
            "Containment isolates compromised systems to stop lateral infection.",
            "Eradication purges malware, backdoors, and compromised credentials.",
            "Lessons Learned transforms incident data into permanent architectural improvements."
          ],
          content: `## 1. Introduction: The Incident Response Lifecycle
No defense is 100% impenetrable. An organization must possess a structured, practiced **Incident Response (IR)** capability to detect, contain, and recover from active security breaches. The global standard framework is **NIST SP 800-61** (Computer Security Incident Handling Guide).

\`\`\`
                     THE NIST INCIDENT MANAGEMENT LIFECYCLE
┌──────────────────────┐
│    1. Preparation    │ ──► Policies, IR team (CSIRT), tool provisioning, playbooks
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│2. Detection & Analysis│ ──► SIEM alerts, EDR triage, scope of compromise determination
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│    3. Containment    │ ──► Short-Term: Network isolation; Long-Term: Segmentation
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│    4. Eradication    │ ──► Malware removal, rootkit cleaning, credential resetting
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│     5. Recovery      │ ──► Restoring from clean backups, continuous monitoring
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│6. Post-Incident Review│ ──► Root cause analysis, Lessons Learned, policy updates
└──────────────────────┘
\`\`\`

---

## 2. In-Depth Phase Breakdown

### Phase 1: Preparation
- Establishing the Computer Security Incident Response Team (CSIRT).
- Provisioning forensic tooling (Wireshark, EnCase, FTK Imager), communication channels, and legal contact directories.

### Phase 2: Detection and Analysis
- Triaging alerts generated by SIEMs (Splunk, Elastic) and EDR agents (CrowdStrike).
- Determining whether an alert is a benign false positive or an active **True Positive Incident**, analyzing indicators of compromise (IoCs).

### Phase 3: Containment (Stopping the Bleeding)
- **Short-Term Containment:** Isolating infected endpoints from the network (severing network cables or isolating via EDR) to prevent lateral spread of ransomware.
- **Long-Term Containment:** Applying firewall filter rules to block command-and-control (C2) domains while preserving evidence for legal forensics.

### Phase 4: Eradication
- Completely identifying and removing all artifacts of the attacker: deleting malware binaries, purging rootkits, re-imaging compromised operating systems, and revoking compromised Active Directory credentials.

### Phase 5: Recovery
- Restoring affected systems to normal production operations from verified, clean offline backups.
- Implementing enhanced temporary logging and monitoring to detect any immediate re-infection attempts.

### Phase 6: Post-Incident Activity (Lessons Learned)
- Conducting a blameless post-mortem retrospective within 14 days of incident closure.
- Answering: *How did the attacker enter? Why did defenses fail to prevent it? What structural policies must be updated?*

---

## 3. Exam Summary
The **NIST Incident Management Lifecycle** operates in six sequential phases: **Preparation** (readiness), **Detection & Analysis** (triage), **Containment** (damage control), **Eradication** (threat removal), **Recovery** (safe restoration), and **Post-Incident Review** (lessons learned).`
        };
    }
  }

  // ==========================================
  // PART C (2 MARKS)
  // ==========================================
  if (part === "PART C") {
    switch (qNo) {
      case 1:
        return {
          summary: "Formal definition of a Penetration Testing Deliverable.",
          keyPoints: [
            "Formal documentation package submitted at the end of a security assessment.",
            "Contains executive summaries, technical vulnerabilities, and remediation roadmaps."
          ],
          content: `### Definition of Penetration Testing Deliverable
A **Penetration Testing Deliverable** is the formal, confidential written documentation package presented to an organization at the conclusion of a security assessment. It provides an Executive Summary of business risk, technical vulnerability findings with reproducible Proof-of-Concepts (PoCs), and an engineering remediation roadmap.`
        };

      case 2:
        return {
          summary: "Formal definition of an Executive Summary.",
          keyPoints: [
            "High-level non-technical section of a security report for C-suite and Board members.",
            "Translates technical findings into financial risk, compliance, and strategic impacts."
          ],
          content: `### What is an Executive Summary?
An **Executive Summary** is the non-technical section of a cybersecurity report written specifically for senior leadership (C-suite, Board of Directors). It summarizes overall security posture, highlights critical business risks in plain language, and provides strategic recommendations without overwhelming non-technical executives with technical jargon.`
        };

      case 3:
        return {
          summary: "Formal definition of a Vulnerability Report.",
          keyPoints: [
            "Technical engineering document detailing discovered security flaws.",
            "Contains reproduction steps, CVSS scores, and remediation directives."
          ],
          content: `### Definition of Vulnerability Report
A **Vulnerability Report** is a technical document that details every security flaw uncovered during testing, providing the vulnerability title, affected IP/URL, Common Vulnerability Scoring System (CVSS) rating, step-by-step reproduction instructions, and specific technical patching guidance for developers.`
        };

      case 5:
        return {
          summary: "Definition of the Common Vulnerability Scoring System (CVSS).",
          keyPoints: [
            "Open vendor-neutral standard for scoring vulnerability severity from 0.0 to 10.0.",
            "Evaluates Base, Temporal, and Environmental metric groups."
          ],
          content: `### What is a CVSS Score?
The **Common Vulnerability Scoring System (CVSS)** is an open industry standard framework for measuring the severity of software vulnerabilities on a scale from **0.0 to 10.0**. It calculates ratings across three metric groups: **Base** (intrinsic exploitability and impact), **Temporal** (current exploit availability), and **Environmental** (customized organizational context).`
        };

      case 8:
        return {
          summary: "Formal definition of Incident Response.",
          keyPoints: [
            "Structured methodology for handling active cyber breaches.",
            "Aims to minimize damage, reduce recovery time, and preserve evidence."
          ],
          content: `### Definition of Incident Response
**Incident Response (IR)** is the structured, systematic organizational approach taken by an enterprise to prepare for, detect, contain, investigate, and recover from active cybersecurity breaches, attacks, and malware infections, aiming to minimize operational downtime, financial loss, and reputational damage.`
        };
    }
  }

  return null;
}
