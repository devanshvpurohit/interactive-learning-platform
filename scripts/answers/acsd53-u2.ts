import { QuestionData, GeneratedAnswer } from "./types";

export function getAcsd53Unit2Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
      case 2:
        return {
          summary: "Comprehensive penetration testing plan aligned with enterprise Business Objectives, organizational security policies, previous test findings, and operational risk boundaries.",
          keyPoints: [
            "Penetration testing must align directly with business revenue drivers and mission-critical assets.",
            "Incorporates previous remediation verification to prevent vulnerability regression.",
            "Security policies dictate testing boundaries, sensitive systems, and authorization protocols.",
            "Balances thorough adversarial simulation against operational business continuity."
          ],
          content: `## 1. Executive Summary: The Business-Aligned Pen Test
A penetration test that operates in a technical vacuum without understanding **Business Objectives** is ineffective. Security exists to support the business mission—protecting revenue streams, maintaining brand equity, safeguarding customer trust, and ensuring regulatory compliance.

\`\`\`
       ┌────────────────────────┐
       │   Business Objectives  │ (Revenue, Brand Equity, Compliance)
       └───────────┬────────────┘
                   │ Defines Critical Value Drivers
                   ▼
       ┌────────────────────────┐
       │   Pen Testing Scope    │ ◄─── Previous Test Findings (Regressions)
       └───────────┬────────────┘ ◄─── Corporate Security Policies
                   │
                   ▼
       ┌────────────────────────┐
       │ High-Impact Assessment │ ──► Protects Core Revenue Engines
       └────────────────────────┘
\`\`\`

---

## 2. In-Depth Components of the Business-Aligned Plan

### 1. Identifying Core Business Objectives & Critical Assets (Crown Jewels)
- In a financial services firm, the business objective is 24/7 transaction processing and safeguarding depositor balances. Testing prioritizes core transaction APIs, Swift terminals, and database integrity.
- In a healthcare system, the priority is patient care continuity and HIPAA compliance; testing prioritizes ICU monitoring networks and EHR systems while strictly forbidding denial-of-service tests.

### 2. Incorporating Security Policies & Governance
- **Acceptable Use Policies (AUP):** Ensuring simulated phishing emails do not violate employee agreements.
- **Incident Response Coordination:** Ensuring the internal Blue Team / SOC handles simulated attacks under established escalation playbooks.

### 3. Reviewing Previous Test Results (Regression Testing)
- Auditing the remediation status of findings from previous quarters:
  - Were reported high-severity SQL injections genuinely fixed, or merely masked by brittle WAF rules?
  - Have infrastructure changes reintroduced previously patched legacy protocols (e.g., SMBv1)?

### 4. Navigating Business Challenges & Inherent Operational Risks
- **Operational Uptime Constraints:** Scheduling resource-heavy network port scans and fuzzing strictly during maintenance windows (e.g., Sunday 01:00 – 05:00) to avoid service degradation.
- **Third-Party SaaS & Cloud Constraints:** Obtaining explicit permission from cloud infrastructure providers (AWS, Azure) and third-party SaaS vendors where multi-tenant infrastructure is shared.

---

## 3. Exam Summary
A business-aligned penetration testing plan directly maps technical attack vectors to **business objectives (crown jewels)**, integrates **security policies**, audits **previous remediation regressions**, and strictly respects **operational uptime constraints**.`
        };

      case 5:
      case 6:
        return {
          summary: "Comprehensive comparative evaluation of Penetration Testing Methodologies: Black-Box, White-Box, and Gray-Box testing, analyzing knowledge asymmetry, cost, and efficiency.",
          keyPoints: [
            "Black-Box (Zero-Knowledge): Simulates external threat actor; realistic but time-consuming.",
            "White-Box (Full-Knowledge): Full access to source code, architecture, and credentials; exhaustive coverage.",
            "Gray-Box (Partial-Knowledge): Simulates insider threat or compromised user; industry standard for balanced cost and depth.",
            "Selection depends on business objective, testing budget, and threat modeling."
          ],
          content: `## 1. The Knowledge Spectrum in Security Testing
Penetration testing methodologies are categorized along a spectrum based on the degree of architectural and environmental knowledge provided to the assessment team prior to testing.

\`\`\`
◄──────────────────────────────────────────────────────────────────────────────►
BLACK-BOX (Zero-Knowledge)         GRAY-BOX (Partial-Knowledge)    WHITE-BOX (Full-Knowledge)
- Target: External Hacker          - Target: Malicious Insider    - Target: Complete Audit
- Knowledge: IP / Domain only      - Knowledge: Low-priv login    - Knowledge: Code, Architecture, DB
- Speed: Slow (Extensive Recon)    - Speed: Balanced / Fast       - Speed: Highly Efficient
\`\`\`

---

## 2. In-Depth Methodology Breakdown

### 1. Black-Box Testing (Zero-Knowledge Testing)
- **Concept:** The tester is provided with zero prior information beyond a high-level target company name or IP range, perfectly simulating an external, unauthenticated cybercriminal.
- **Strengths:** Provides the most authentic test of an organization's perimeter defense and external detection capabilities.
- **Weaknesses:** High time and monetary cost spent on mundane reconnaissance. If the tester is blocked by a simple firewall configuration error, deeper critical internal vulnerabilities remain undiscovered.

### 2. White-Box Testing (Clear-Box / Crystal-Box Testing)
- **Concept:** The tester is granted complete, unfettered access to application source code repositories, network topology diagrams, database schemas, and administrative accounts.
- **Strengths:** Maximum exhaustive depth. Testers use **Static Application Security Testing (SAST)** and architectural review to find subtle logic flaws that black-box testing would never trigger.
- **Weaknesses:** Does not realistically model the external adversary experience; high complexity and developer interview overhead.

### 3. Gray-Box Testing (Partial-Knowledge Testing)
- **Concept:** The tester is provided with limited insider knowledge—typically a standard user login, an internal IP address on the corporate network, and basic architecture documentation.
- **Industry Standard:** Simulates the most common real-world breach scenario: an attacker who has compromised an employee's workstation via phishing and seeks to move laterally.
- **Strengths:** Delivers the optimal return on investment (ROI), eliminating weeks of brute-force reconnaissance while testing internal defenses thoroughly.

---

## 3. Comparative Synthesis Matrix

| Dimension | Black-Box Testing | Gray-Box Testing | White-Box Testing |
| :--- | :--- | :--- | :--- |
| **Prior Knowledge** | Zero (External attacker view) | Partial (Standard user account/IP) | Full (Source code, schemas, configs) |
| **Realistic Adversary Simulation**| Highest (External actor) | High (Insider threat / Phished staff) | Lowest (Collaborative audit) |
| **Time Spent on Recon** | 60%–70% of total time | 15%–20% of total time | 0% (Immediate code review) |
| **Vulnerability Depth**| Superficial / Perimeter-focused | High (Internal network & privilege logic)| Complete / Exhaustive |
| **Cost to Organization** | High cost per finding | Optimal / Balanced ROI | High initial setup, fast testing |

---

## 4. Exam Summary
**Black-box** testing provides zero-knowledge external adversary simulation; **White-box** testing provides full-knowledge code and architectural audits; and **Gray-box** testing provides partial-knowledge insider simulation, offering the industry's most cost-effective balance.`
        };

      case 8:
      case 9:
        return {
          summary: "Technical analysis of Inherent versus Imposed Limitations in penetration testing engagements and their governance in Rules of Engagement.",
          keyPoints: [
            "Inherent Limitations are unavoidable technical and temporal boundaries natural to any simulation.",
            "Imposed Limitations are deliberate client restrictions placed on testing to preserve business operations.",
            "Inherent: Point-in-time snapshot, finite testing hours, cannot use destructive zero-days.",
            "Imposed: Scope exclusions, restricted testing hours (off-peak), banned Denial of Service attacks."
          ],
          content: `## 1. Introduction: Testing Boundaries
A penetration test is a controlled, professional assessment operating under legal contracts and ethical constraints. Consequently, it can never perfectly replicate an unconstrained nation-state cyberwarfare adversary due to two distinct categories of constraints: **Inherent Limitations** and **Imposed Limitations**.

\`\`\`
                               PEN TESTING LIMITATIONS
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
INHERENT LIMITATIONS                                        IMPOSED LIMITATIONS
(Natural Technical Boundaries)                              (Deliberate Client Restrictions)
- Point-in-time snapshot                                    - Excluded sensitive systems (ICU, SCADA)
- Bounded time and budget                                   - Restricted maintenance hours (11pm-5am)
- Ethical prohibition against destructive malware           - Ban on Denial of Service (DoS) attacks
- Incomplete coverage of all potential attack paths         - Advance notification to defensive Blue Team
\`\`\`

---

## 2. Inherent Limitations (Natural Constraints of Security Testing)
1. **Point-in-Time Snapshot:** A penetration test reflects security posture exclusively at the moment of execution. A critical software patch released or a new firewall misconfiguration introduced the following morning renders findings incomplete.
2. **Time and Budget Asymmetry:** Real adversaries possess infinite time to probe a single target over years. Ethical hackers are constrained by fixed 2-to-4-week statement-of-work (SOW) contracts.
3. **Ethical Non-Destructive Constraint:** A black-hat hacker will willingly wipe a database or deploy destructive ransomware to achieve ransom; an ethical tester cannot use destructive techniques that jeopardize client data integrity.

---

## 3. Imposed Limitations (Client-Mandated Scope Constraints)
1. **System and Subnet Exclusions:** The client explicitly excludes sensitive production systems (e.g., active manufacturing lines, hospital patient telemetry, live core banking databases) to eliminate operational risk.
2. **Prohibition of Denial-of-Service (DoS) Testing:** Testing is forbidden from executing volumetric packet flooding, SYN floods, or resource starvation exploits that threaten system availability.
3. **Temporal Restrictions:** The client dictates that active exploitation must pause during core business hours, permitting testing only between 11:00 PM and 5:00 AM.
4. **Third-Party Hosting Exclusions:** Client cannot authorize testing on third-party SaaS or shared data centers without written third-party consent.

---

## 4. Exam Summary
**Inherent Limitations** are the natural technical boundaries of any engagement (point-in-time snapshot, bounded budget, non-destructive ethics); **Imposed Limitations** are client-mandated operational rules (excluded IP ranges, restricted off-peak hours, prohibition of DoS).`
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
          summary: "Comprehensive exploration of the Business Perspective in Ethical Hacking, analyzing ROI, risk management, and regulatory compliance.",
          keyPoints: [
            "Ethical hacking is an investment in enterprise risk reduction, not merely a technical exercise.",
            "Aligns cyber defense with business continuity, shareholder value, and legal liability mitigation.",
            "Justifies security spending through quantitative risk reduction (ALE = SLE * ARO).",
            "Protects intellectual property, brand reputation, and consumer trust."
          ],
          content: `## 1. The Business Perspective
In modern enterprise management, cybersecurity is no longer viewed as an isolated IT cost center; it is recognized as a vital **board-level business enabler**. The Business Perspective in ethical hacking evaluates security assessments through the lens of **business continuity**, **reputation protection**, **legal compliance**, and **Return on Security Investment (ROSI)**.

\`\`\`
TECHNICAL PERSPECTIVE:                   BUSINESS PERSPECTIVE:
"Found CVE-2023-38606 on server 10.4" ──► "This vulnerability threatens our core e-commerce
                                           revenue stream, risking $450k in hourly downtime
                                           and non-compliance penalties with PCI-DSS."
\`\`\`

---

## 2. Key Business Drivers for Ethical Hacking

1. **Protecting Core Revenue & Preventing Downtime:** The average cost of enterprise downtime exceeds $5,600 per minute. A controlled penetration test uncovers flaws before ransomware can shut down operations.
2. **Mitigating Regulatory Fines & Legal Sanctions:** Failure to maintain adequate security controls triggers severe statutory penalties:
   - **GDPR:** Fines up to 4% of global annual turnover or €20 million.
   - **PCI-DSS:** Fines up to $100,000 per month and revocation of card processing rights.
3. **Preserving Brand Equity & Customer Trust:** Customer acquisition cost is high; customer churn following a publicly disclosed credential breach can permanently impair market capitalization.
4. **Quantitative Risk Justification:**
   $$\\text{ALE (Annualized Loss Expectancy)} = \\text{SLE (Single Loss Expectancy)} \\times \\text{ARO (Annualized Rate of Occurrence)}$$
   Demonstrating that an investment in ethical hacking eliminates high-probability loss vectors justifies the security budget to the Chief Financial Officer (CFO).

---

## 3. Exam Summary
The business perspective elevates ethical hacking from a technical audit into a strategic **risk mitigation investment** that protects **revenue generation**, preserves **brand reputation**, satisfies **statutory compliance**, and provides measurable **ROSI**.`
        };

      case 7:
        return {
          summary: "Detailed analysis of Attack Types and Attack Source Points in penetration testing engagements.",
          keyPoints: [
            "Attack types: Internal attacks, external perimeter attacks, social engineering, physical breaches, supply-chain attacks.",
            "Source points: Internet (external), DMZ, internal corporate LAN, remote VPN, wireless/Wi-Fi, third-party vendor connections.",
            "Source point selection dictates network visibility and simulated adversary access tier.",
            "Simulating multiple source points evaluates defense-in-depth and internal segmentation."
          ],
          content: `## 1. Attack Types and Source Points
A comprehensive ethical hacking engagement evaluates diverse **Attack Types** initiated from multiple strategic **Source Points** to test defense-in-depth across the entire enterprise perimeter.

\`\`\`
                               ATTACK SOURCE POINTS
[External Internet] ──► [DMZ Bastion] ──► [Internal LAN] ──► [Core Database VLAN]
        │                     │                 │
        ▼                     ▼                 ▼
Perimeter Web / VPN   Reverse Proxy Flaws   Lateral Movement, Active Directory Compromise
\`\`\`

---

## 2. Taxonomy of Attack Types

1. **External Network Attacks:** Probing public-facing IP addresses, firewalls, mail servers, and VPN concentrators from the public internet.
2. **Internal Network Attacks:** Initiated from within the private corporate network (behind firewalls) to simulate an insider threat or compromised employee laptop.
3. **Social Engineering Attacks:** Spear-phishing, credential harvesting portals, voice pretexting (vishing), and physical badge cloning.
4. **Wireless & RF Attacks:** Probing corporate Wi-Fi encryption (WPA2/WPA3 Enterprise), rogue AP injection, and Bluetooth peripheral exploits.
5. **Supply-Chain & Third-Party Attacks:** Compromising trusted third-party vendor connections or software dependencies.

---

## 3. Attack Source Points in Penetration Testing

| Source Point | Physical / Network Location | Simulated Threat Actor | Typical Goal |
| :--- | :--- | :--- | :--- |
| **External Internet** | Remote off-site workstation | External black-hat cybercriminal | Breach DMZ, exploit public web servers |
| **DMZ (Demilitarized Zone)**| Compromised staging web server| Attacker who breached perimeter | Pivot from DMZ into internal database LAN |
| **Internal Corporate LAN** | Hardwired Ethernet port / Wi-Fi| Disgruntled employee or contractor | Compromise Active Directory, dump hashes |
| **Remote VPN Gateway** | Authenticated contractor VPN | Compromised remote worker credentials| Test internal network access controls |

---

## 4. Exam Summary
Ethical hacking models multiple **Attack Types** (external, internal, social engineering, wireless) originating from distinct **Source Points** (Internet, DMZ, internal LAN, VPN) to rigorously test every layer of defense-in-depth.`
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
          summary: "Formal definition of Business Objectives in ethical hacking.",
          keyPoints: [
            "Strategic commercial goals and core revenue engines of an organization.",
            "Guides pen test prioritization to safeguard mission-critical business assets."
          ],
          content: `### Definition of Business Objectives
In ethical hacking, **Business Objectives** are the high-level commercial goals, revenue drivers, operational priorities, and legal compliance obligations of an enterprise (e.g., maintaining 99.99% e-commerce uptime, protecting patient medical confidentiality). Ethical hacking engagements must align directly with these objectives to safeguard mission-critical assets.`
        };

      case 2:
        return {
          summary: "Formal definition of a Security Policy.",
          keyPoints: [
            "Formal documentation defining mandatory cybersecurity rules and procedures.",
            "Establishes behavioral guidelines across employees, networks, and data handling."
          ],
          content: `### What is a Security Policy?
A **Security Policy** is a formal, executive-approved organizational document that outlines the rules, standards, responsibilities, and technical procedures governing how an enterprise protects its physical and digital information assets against unauthorized access, theft, and operational disruption.`
        };

      case 3:
        return {
          summary: "Formal definition of a Controlled Attack.",
          keyPoints: [
            "Authorized simulated intrusion executed under predefined safety boundaries.",
            "Avoids operational disruption and data corruption."
          ],
          content: `### Definition of a Controlled Attack
A **Controlled Attack** is an authorized, simulated cyber assault executed by ethical hackers under strict contractual boundaries and non-destructive guidelines. It aims to demonstrate proof-of-vulnerability while deliberately avoiding service downtime, data destruction, or business disruption.`
        };

      case 4:
        return {
          summary: "Formal definition of an Inherent Limitation.",
          keyPoints: [
            "Natural technical or temporal constraint inescapable in any security audit.",
            "Includes point-in-time snapshot and bounded testing hours."
          ],
          content: `### Definition of an Inherent Limitation
An **Inherent Limitation** is an unavoidable, natural constraint universal to all penetration testing assessments (such as testing being a point-in-time snapshot, bounded by fixed calendar days and budget, and ethically prohibited from using destructive malware).`
        };

      case 5:
        return {
          summary: "Formal definition of an Imposed Limitation.",
          keyPoints: [
            "Client-mandated restriction established in the Rules of Engagement.",
            "Excludes sensitive systems or restricts testing hours to off-peak."
          ],
          content: `### Definition of an Imposed Limitation
An **Imposed Limitation** is a deliberate, contractual restriction placed on the testing team by the client organization in the Rules of Engagement (e.g., forbidding Denial of Service testing, restricting testing to off-peak hours, or explicitly excluding production databases from scope).`
        };

      case 6:
      case 7:
      case 8:
        return {
          summary: "Definitions of Black-Box, White-Box, and Gray-Box testing.",
          keyPoints: [
            "Black-Box: Zero prior knowledge; external attacker view.",
            "White-Box: Full architectural and source code access.",
            "Gray-Box: Partial user-level knowledge; optimal balance."
          ],
          content: `### Black-Box vs. White-Box vs. Gray-Box Testing
1. **Black-Box Testing (Zero-Knowledge):** The tester has no prior knowledge of the target systems, simulating an external adversary starting from scratch.
2. **White-Box Testing (Full-Knowledge):** The tester is granted complete access to source code, network diagrams, and administrative credentials for an exhaustive code audit.
3. **Gray-Box Testing (Partial-Knowledge):** The tester is provided limited information (e.g., standard user credentials) to simulate an insider threat or phished employee.`
        };
    }
  }

  return null;
}
