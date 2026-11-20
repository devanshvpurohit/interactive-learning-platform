import { QuestionData, GeneratedAnswer } from "./types";

export function getAcsd53Unit1Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive penetration testing framework designed for a university campus network across all six standard phases: Planning, Reconnaissance, Enumeration, Vulnerability Analysis, Exploitation, and Reporting.",
          keyPoints: [
            "University networks feature high heterogeneity, BYOD devices, open Wi-Fi, ERP student portals, and research clusters.",
            "Phase 1: Planning & Scoping (Defining boundaries, obtaining written authorization / RoE).",
            "Phase 2 & 3: Reconnaissance & Enumeration (Discovering active subnets, open ports, Eduroam, LDAP/Active Directory).",
            "Phase 4 & 5: Vulnerability Analysis & Exploitation (CVSS scoring, controlled PoC on student LMS/grades).",
            "Phase 6: Reporting & Remediation (Executive summary for Dean/Board, technical remediation for campus IT)."
          ],
          content: `## 1. Executive Summary & Context: University Network Architecture
A university enterprise network represents a uniquely complex, decentralized environment: it must host public academic research portals, handle sensitive student financial/grade records (FERPA/GDPR compliance), support high-throughput campus Wi-Fi (Eduroam) for thousands of unmanaged BYOD (Bring Your Own Device) student endpoints, and protect critical research computing clusters.

\`\`\`
                 THE SIX-PHASE PENETRATION TESTING FRAMEWORK
[1. Planning & Scoping] ──► [2. Reconnaissance] ──► [3. Scanning & Enumeration]
                                                            │
                                                            ▼
[6. Reporting & Briefing] ◄── [5. Controlled Exploitation] ◄── [4. Vulnerability Analysis]
\`\`\`

---

## 2. In-Depth Phase Breakdown for Campus Assessment

### Phase 1: Planning and Scoping (Rules of Engagement)
- **Legal Authorization:** Formal written sign-off from the University Chancellor/CIO (Letter of Authorization / "Get Out of Jail Free" card).
- **Scope Definition:**
  - *In-Scope:* Student Information System (SIS/ERP), public web portals, campus Wi-Fi authentication servers (RADIUS/LDAP), administrative subnet (\`10.20.0.0/16\`).
  - *Out-of-Scope (Forbidden):* Live hospital/medical clinic networks, active high-voltage campus facilities, operational research supercomputers during active simulations.
  - *Testing Window:* Off-peak hours (11:00 PM – 5:00 AM) to prevent disruption of ongoing student examinations.

### Phase 2: Reconnaissance (Information Gathering)
- **Passive OSINT:** Harvesting faculty email addresses, subdomains (\`*.university.edu\`), and leaked GitHub repositories belonging to university research labs using tools like \`theHarvester\`, \`SpiderFoot\`, and Shodan.
- **DNS Interrogation:** Zone transfer testing (\`dig axfr @ns1.university.edu\`) to map hidden staging servers.

### Phase 3: Scanning and Enumeration
- **Network Discovery:** Scanning target ranges using Nmap:
  \`\`\`bash
  nmap -sS -sV -O -p- --min-rate 1000 10.20.0.0/16 -oA campus_scan
  \`\`\`
- **Service Enumeration:** Enumerating SMB shares (\`enum4linux\`), LDAP directories, Active Directory Domain Controllers, and SNMP community strings (\`public\`) across faculty printers and legacy routers.

### Phase 4: Vulnerability Analysis
- Automated scanning using Nessus / OpenVAS paired with manual verification.
- Mapping discovered weaknesses against the **Common Vulnerability Scoring System (CVSS v3.1)**:
  - Unpatched Apache Log4j (CVE-2021-44228) on legacy library servers.
  - SQL Injection vulnerabilities in custom-built student registration portals.
  - Default credentials on student lab switches and surveillance cameras.

### Phase 5: Controlled Exploitation & Privilege Escalation
- Strictly executing non-destructive Proof-of-Concept (PoC) exploits.
- Gaining initial unprivileged shell on an insecure student club web server; discovering cleartext database credentials in \`config.php\`; elevating to Domain Admin across the university Active Directory forest.

### Phase 6: Reporting and Remediation
- **Executive Summary:** High-level risk posture dashboard for the Dean, Registrar, and Board of Trustees.
- **Technical Vulnerability Remediation Table:** Step-by-step patching guidance, firewall segmentation recommendations, and network isolation rules for the campus IT security team.

---

## 3. Exam Summary
A university penetration testing framework systematically executes **Planning & Scoping** (RoE sign-off), **Reconnaissance** (OSINT), **Enumeration** (Active Directory / Wi-Fi), **Vulnerability Analysis** (CVSS scoring), **Controlled Exploitation** (non-destructive PoC), and **Reporting** (executive & technical deliverables).`
        };

      case 2:
        return {
          summary: "Comprehensive methodology for analyzing an organization's overall security posture and mapping internal/external attack surfaces prior to launching a penetration test.",
          keyPoints: [
            "Security Posture evaluates the holistic defensive strength across people, processes, and technology.",
            "Attack Surface represents the total sum of all accessible entry points through which an adversary can enter or extract data.",
            "External attack surface: Public IPs, DNS, cloud buckets, VPN gateways, web applications.",
            "Internal attack surface: Active Directory, workstations, unsegmented IoT devices, employee phishing susceptibility."
          ],
          content: `## 1. Defining Security Posture & Attack Surface
An organization's **Security Posture** is the collective technical, operational, and organizational strength of its defensive cybersecurity capabilities. 
The **Attack Surface** is the aggregate sum of all reachable vulnerabilities, communication channels, network ports, software interfaces, human endpoints, and physical access boundaries that an attacker can exploit.

\`\`\`
                               ENTERPRISE ATTACK SURFACE
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
External Attack Surface             Internal Attack Surface             Human / Physical Attack Surface
- Public IPv4/IPv6 blocks           - Active Directory Forest           - Spear-phishing targets
- Web apps & REST APIs              - Unpatched employee laptops        - Tailgating into server room
- Cloud storage buckets (S3)        - Unsegmented IoT / Printers        - Rogue USB drop attacks
- Exposed VPN & RDP gateways        - Cleartext network protocols       - Dumpster diving for sensitive docs
\`\`\`

---

## 2. Attack Surface Mapping Methodology

### 1. External Perimeter Analysis
- **Domain & Subdomain Enumeration:** Using \`sublist3r\`, \`amass\`, and Certificate Transparency logs (\`crt.sh\`) to uncover forgotten staging subdomains (\`dev.example.com\`, \`vpn-backup.example.com\`).
- **Cloud Perimeter Audit:** Scanning for publicly misconfigured AWS S3 buckets, Azure Blobs, or exposed GitHub access tokens.
- **Port & Service Fingerprinting:** Full TCP/UDP port mapping on public IP allocations, identifying dangerous exposed services (Telnet: 23, RDP: 3389, SMB: 445, MySQL: 3306).

### 2. Internal Network Attack Surface
- **Network Segmentation Analysis:** Testing whether unprivileged guest Wi-Fi users can route packets into the restricted financial database VLAN.
- **Identity & Privilege Hierarchy:** Mapping Active Directory trusts, nested groups, and stale service accounts possessing \`Domain Admin\` privileges using tools like **BloodHound**.

### 3. Human & Physical Surface
- **Social Engineering Susceptibility:** Evaluating employee susceptibility to credential-harvesting spear-phishing campaigns.
- **Badge Security & Physical Controls:** Auditing access control vestibules, CCTV coverage, and disposal procedures.

---

## 3. Security Posture Evaluation Matrix

| Domain | Metrics Evaluated | Red Flag Findings |
| :--- | :--- | :--- |
| **Network Security** | Firewall rules, port surface, IDS/IPS | Exposed database ports (3306) on public IPs |
| **Identity & Access** | MFA enforcement, password complexity | No MFA on corporate VPN gateways; NTLMv1 enabled |
| **Endpoint Security**| EDR deployment, patch latency | Unpatched endpoints (>60 days since CVE disclosure) |
| **Governance & Policy**| Incident response plan, employee audits | Stale employee accounts active post-termination |

---

## 4. Exam Summary
Analyzing security posture requires systematically measuring the **external attack surface** (exposed IPs, cloud storage, VPNs), **internal attack surface** (Active Directory trusts, network segmentation), and **human attack surface** (phishing vulnerability) before engaging in exploitation.`
        };

      case 3:
        return {
          summary: "Comprehensive ethical hacking strategy designed for an E-Commerce enterprise, rigorously addressing Confidentiality, Integrity, and Availability (The CIA Triad).",
          keyPoints: [
            "E-commerce platforms handle payment card data (PCI-DSS), customer PII, order pipelines, and inventory databases.",
            "Confidentiality: Protecting credit card numbers, passwords, and order histories from unauthorized data exfiltration.",
            "Integrity: Preventing tampering with prices, cart totals, database inventory records, and SSL transactions.",
            "Availability: Ensuring checkout uptime during high-volume sales (DDoS mitigation, load testing).",
            "Testing methodologies: OWASP Top 10 Web Application Pen Testing."
          ],
          content: `## 1. Executive Context: E-Commerce Security Architecture
An enterprise e-commerce platform integrates customer-facing web storefronts, mobile APIs, payment gateways (Stripe/PayPal), inventory databases, and logistics microservices. A single breach results in catastrophic regulatory fines (PCI-DSS non-compliance, GDPR sanctions) and loss of consumer trust.

\`\`\`
                                  THE CIA TRIAD STRATEGY
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
CONFIDENTIALITY                     INTEGRITY                           AVAILABILITY
- Payment Data Exfiltration         - Price Manipulation Attacks        - Layer 7 Application DDoS
- Session Hijacking & PII Leak      - SQLi / Database Tampering         - Inventory Starvation / Bots
- Insecure Direct Object Refs       - Man-in-the-Middle (MitM)          - Gateway Uptime Stress Tests
\`\`\`

---

## 2. Testing Strategy Structured by the CIA Triad

### 1. Confidentiality (Preventing Unauthorized Data Disclosure)
- **Payment Card Data Protection (PCI-DSS Testing):**
  - Verify that raw credit card Primary Account Numbers (PAN) and CVV codes are never stored on internal web servers or logged in plaintext server logs.
  - Test for **Cross-Site Scripting (XSS)** that could allow malicious injection of JavaScript "Magecart" credit card sniffers on the checkout page.
- **Insecure Direct Object References (IDOR):**
  - Test whether authenticated User A can inspect User B's order receipt and shipping address by simply mutating the URL: \`GET /api/orders/10492\` $\\rightarrow$ \`GET /api/orders/10493\`.
- **Database Exfiltration Testing:** Testing all search bars and category filters for Blind Boolean and Time-Based SQL Injections.

### 2. Integrity (Preventing Unauthorized Data Alteration)
- **Shopping Cart Price Manipulation:**
  - Intercepting HTTP POST requests using Burp Suite to alter parameter values before transmission:
    \`\`\`http
    POST /checkout/pay HTTP/1.1
    {"item_id": 8421, "quantity": 1, "unit_price": 999.00}  <-- MUTATED TO: 0.01
    \`\`\`
  - Verify that the backend server strictly recalculates order totals from internal authoritative databases, completely ignoring client-side price inputs.
- **Race Conditions:** Testing simultaneous multi-threaded checkout requests to redeem a single promotional coupon code multiple times.

### 3. Availability (Ensuring Continuous System Uptime)
- **Layer 7 Application-Level DDoS Resilience:** Auditing resource-intensive search endpoints (e.g., wildcard regex queries) that cause server CPU starvation (**ReDoS**).
- **Inventory Locking / Hoarding Attacks:** Auditing whether automated scalper bots can place 10,000 items in shopping carts to lock out genuine customers without executing payment.

---

## 3. Exam Summary
An e-commerce ethical hacking strategy secures the **CIA Triad**: **Confidentiality** protects payment cards and PII (PCI-DSS, IDOR, Magecart prevention); **Integrity** blocks price tampering and coupon race conditions; and **Availability** ensures checkout resilience against bots and DDoS attacks.`
        };

      case 4:
        return {
          summary: "Comprehensive comparative analysis of Computer Security, Network Security, Application Security, and Service Security with concrete enterprise examples.",
          keyPoints: [
            "Computer (Endpoint) Security protects individual operating systems, memory, and local host storage.",
            "Network Security protects communication channels, switches, routers, and traffic in transit.",
            "Application Security protects software source code, business logic, APIs, and databases.",
            "Service Security protects cloud, microservice, SaaS, and infrastructure provider availability.",
            "Defense-in-Depth requires interlocking protections across all four domains."
          ],
          content: `## 1. The Four Interconnected Security Domains
In enterprise defense, cybersecurity is partitioned into four distinct operational domains that together establish **Defense-in-Depth**. A vulnerability in any single domain can compromise the entire enterprise.

\`\`\`
┌────────────────────────────────────────────────────────┐
│ 1. Computer / Host Security (OS, Memory, Antivirus)    │
│    ┌───────────────────────────────────────────────────┤
│    │ 2. Network Security (Firewalls, IDS/IPS, VPN)     │
│    │    ┌──────────────────────────────────────────────┤
│    │    │ 3. Application Security (Code, Web, SQLi)    │
│    │    │    ┌─────────────────────────────────────────┤
│    │    │    │ 4. Service Security (Cloud, SaaS, APIs) │
└────┴────┴────┴─────────────────────────────────────────┘
\`\`\`

---

## 2. Detailed Domain Breakdown with Concrete Examples

### 1. Computer Security (Host / Endpoint Security)
- **Scope:** Protection of physical compute hardware, local operating systems (Windows, Linux, macOS), local memory structures, and attached storage.
- **Core Threats:** Malware, ransomware, buffer overflows, unauthorized local privilege escalation, lost laptops.
- **Defensive Technologies:** Endpoint Detection & Response (EDR), full-disk encryption (BitLocker), host-based intrusion prevention, OS hardening, patch management.
- **Example Scenario:** Preventing a malicious macro in an email attachment from executing unauthorized PowerShell commands in local RAM.

### 2. Network Security
- **Scope:** Protection of network transmission media, routers, switches, firewalls, and data-in-transit across local and wide-area networks.
- **Core Threats:** Man-in-the-Middle (MitM) sniffing, ARP spoofing, rogue access points, TCP SYN floods, lateral network movement.
- **Defensive Technologies:** Next-Generation Firewalls (NGFW), Virtual Private Networks (IPsec/WireGuard), Network Segmentation (VLANs), IDS/IPS, 802.1X port authentication.
- **Example Scenario:** Deploying an IDS that detects and blocks unauthorized network port scanning (\`nmap -sS\`) across internal subnets.

### 3. Application Security
- **Scope:** Securing the software development lifecycle (SDLC), application source code, API endpoints, and web application logic against exploitation.
- **Core Threats:** OWASP Top 10 vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), Insecure Deserialization, Broken Object Level Authorization (BOLA).
- **Defensive Technologies:** Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), Web Application Firewalls (WAF), parameterized queries.
- **Example Scenario:** Sanitizing user input to prevent SQL Injection in a login form: \`' OR '1'='1\`.

### 4. Service Security (Cloud & Infrastructure Security)
- **Scope:** Securing cloud providers, microservices, container orchestration (Kubernetes), Third-Party SaaS integrations, and cloud identity boundaries.
- **Core Threats:** Misconfigured cloud buckets (public S3), compromised API secret keys, server-side request forgery (SSRF) hitting cloud metadata services (\`169.254.169.254\`).
- **Defensive Technologies:** Cloud Security Posture Management (CSPM), Identity and Access Management (IAM) least-privilege policies, API Rate Limiting, mutual TLS (mTLS).
- **Example Scenario:** Restricting IAM roles on AWS Lambda functions to prevent them from reading unassociated customer databases.

---

## 3. Comparison Matrix

| Security Domain | Primary Focus | Typical Threat | Primary Countermeasure | Concrete Tool |
| :--- | :--- | :--- | :--- | :--- |
| **Computer** | Host OS & Endpoints | Ransomware / Local privilege escalation | EDR, BitLocker, AppLocker | CrowdStrike, Windows Defender |
| **Network** | Data in Transit & Infrastructure | Network eavesdropping / SYN Flood | Firewalls, VLAN segmentation, TLS | Cisco ASA, Snort, Wireshark |
| **Application** | Source code & Web Logic | SQL Injection, XSS, IDOR | Input sanitization, WAF, Code Review | Burp Suite, ModSecurity |
| **Service** | Cloud APIs & Microservices | SSRF, Exposed S3, Token theft | IAM least privilege, CSPM, mTLS | AWS IAM, Prisma Cloud |

---

## 4. Exam Summary
Complete cybersecurity requires **Defense-in-Depth**: **Computer Security** locks down host OS/RAM; **Network Security** safeguards transmission channels; **Application Security** hardens software code logic; and **Service Security** governs cloud microservices and IAM access.`
        };

      case 9:
        return {
          summary: "Comprehensive comparative evaluation between Vulnerability Assessment (VA) and Penetration Testing (PT), detailing methodologies, toolsets, deliverables, and enterprise scenarios.",
          keyPoints: [
            "Vulnerability Assessment (VA) is a broad, automated scan identifying and cataloging known vulnerabilities without exploiting them.",
            "Penetration Testing (PT) is an active, goal-oriented simulation of an adversary attempting to exploit vulnerabilities to achieve a specific objective.",
            "VA emphasizes breadth and inventory completeness; PT emphasizes depth, chaining exploits, and business impact.",
            "Combined in industry as VAPT (Vulnerability Assessment and Penetration Testing)."
          ],
          content: `## 1. Introduction: VA vs. PT
While frequently conflated in commercial discussions, **Vulnerability Assessment (VA)** and **Penetration Testing (PT)** represent two distinct security evaluation methodologies with contrasting objectives, operational depths, and risk profiles.

\`\`\`
VULNERABILITY ASSESSMENT (VA):
Broad, Automated, Non-Destructive Scanning ──► Comprehensive List of Potential Flaws (High Breadth)

PENETRATION TESTING (PT):
Targeted, Manual, Goal-Oriented Exploitation ──► Proof of Compromise & Business Impact (High Depth)
\`\`\`

---

## 2. In-Depth Technical Breakdown

### 1. Vulnerability Assessment (VA)
- **Primary Goal:** Identify, categorize, and prioritize as many security weaknesses and configuration flaws as possible across an entire network or asset inventory.
- **Methodology:** Highly automated, signature-based scanning using tools like **Nessus**, **OpenVAS**, and **Qualys**.
- **Nature:** Passive or non-invasive active scanning. It checks software banner versions and registry flags without attempting to execute payloads or bypass defenses.
- **Output:** A massive, comprehensive list of discovered CVEs with theoretical CVSS risk scores, often containing **false positives**.

### 2. Penetration Testing (PT)
- **Primary Goal:** Simulate an actual cyber adversary's attack path to determine whether defenses can withstand a skilled human attacker, proving real-world business impact.
- **Methodology:** Manual, creative, and systematic exploitation. The tester actively **chains multiple low-severity flaws** together to achieve an objective (e.g., exfiltrating customer records).
- **Nature:** Active exploitation using tools like **Metasploit**, **Burp Suite**, and custom exploit scripts. It verifies vulnerabilities and eliminates false positives.
- **Output:** A narrative Proof-of-Concept (PoC) demonstration showing step-by-step how the organization was compromised.

---

## 3. Comprehensive Comparison Table

| Attribute | Vulnerability Assessment (VA) | Penetration Testing (PT) |
| :--- | :--- | :--- |
| **Core Objective** | Catalog all potential vulnerabilities | Prove if vulnerabilities can be exploited |
| **Approach** | Automated scan (Breadth-oriented) | Manual & customized (Depth-oriented) |
| **Exploitation** | **Never exploits** vulnerabilities | **Actively exploits** vulnerabilities |
| **False Positives** | Common (flags unverified banner versions)| Very Rare (exploits verify real vulnerabilities)|
| **Frequency** | Continuous / Weekly / Monthly | Annual / Bi-annual or after major releases |
| **Typical Tools** | Nessus, Qualys, OpenVAS, Rapid7 | Burp Suite, Metasploit, Cobalt Strike, Mimikatz |
| **Staffing** | Can be executed by junior sysadmins | Requires skilled ethical hackers / Red Teamers |

---

## 4. Real-World Scenario Comparison

### Scenario: Hospital Patient Record System
- **The VA Finding:** Nessus scans the database server and outputs a report:
  > *"Server \`192.168.1.50\` is running an outdated Apache server with CVE-2021-41773 (CVSS 7.5 Medium). Patch immediately."*
- **The PT Execution:** The penetration tester notes the flaw, exploits it to read the server's \`/etc/shadow\` file, cracks a weak administrator password, logs into the internal Medical Imaging system, and displays live radiological scans of patients on their screen, presenting the Dean with visual evidence of systemic data compromise.

---

## 5. Exam Summary
**Vulnerability Assessment** is an **automated, non-invasive inventory of potential flaws** (breadth); **Penetration Testing** is a **manual, goal-driven simulation of real-world exploitation** (depth) that proves actual business impact.`
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
          summary: "Comprehensive explanation of Ethical Hacking, detailing objectives, core principles, legal boundaries, and business justification.",
          keyPoints: [
            "Ethical Hacking is authorized testing to identify and remediate security vulnerabilities before malicious attackers exploit them.",
            "Primary objectives: Identify vulnerabilities, evaluate defensive posture, ensure compliance, and protect business continuity.",
            "Operates under strict legal authorization (Rules of Engagement, non-disclosure agreements).",
            "Follows responsible disclosure and non-destructive testing methodologies."
          ],
          content: `## 1. Definition of Ethical Hacking
**Ethical Hacking** (often referred to as **White-Hat Hacking** or **Penetration Testing**) is the authorized, structured practice of employing the same tools, techniques, and mindsets as malicious cyber adversaries to probe, identify, exploit, and remediate security vulnerabilities in an organization's systems, with the explicit written permission of the system owners.

\`\`\`
       ┌────────────────────────┐
       │     System Owners      │
       └───────────┬────────────┘
                   │ Explicit Written Authorization (Rules of Engagement)
                   ▼
       ┌────────────────────────┐
       │     Ethical Hacker     │ ──► Probes Systems with Attacker Mindset
       └───────────┬────────────┘
                   │ Actionable Findings & Remediation Guidance
                   ▼
       ┌────────────────────────┐
       │ Enhanced Cyber Defense │ ──► Hardened Systems Immune to Malicious Hackers
       └────────────────────────┘
\`\`\`

---

## 2. Primary Objectives of Ethical Hacking

1. **Uncovering Unknown Vulnerabilities (Zero-Days & Misconfigurations):** Systematically testing attack paths that automated firewalls and compliance checklists overlook.
2. **Validating Real-World Defensive Readiness:** Testing whether the internal Security Operations Center (SOC) and Incident Response teams detect, alert, and contain active intrusions.
3. **Regulatory and Legal Compliance:** Satisfying mandatory industry cybersecurity mandates (PCI-DSS Requirement 11.3, HIPAA Security Rule, ISO/IEC 27001, SOC 2 Type II).
4. **Preventing Financial Catastrophe & Brand Damage:** A proactive penetration test costs thousands; a catastrophic ransomware attack or data breach costs millions in extortion, lawsuits, and regulatory penalties.

---

## 3. The Core Ethical Hacking Code of Conduct

- **Explicit Written Authorization:** Testing never begins without a signed Letter of Authorization and detailed Rules of Engagement (RoE).
- **Respect for Scope Boundaries:** Strictly adhering to IP ranges and systems authorized by the client, never touching out-of-scope assets.
- **Data Confidentiality & Non-Disclosure (NDA):** Any proprietary customer records or credentials discovered during testing are encrypted, safeguarded, and never disclosed externally.
- **Do No Harm (Non-Destructive Testing):** Exploits must be carefully controlled Proof-of-Concepts (PoCs) designed to avoid causing system crashes or data corruption.

---

## 4. Exam Summary
Ethical hacking is the **authorized simulation of adversary attacks** designed to identify and fix security flaws before malicious actors exploit them, governed by strict **legal authorization**, **scope adherence**, **non-destructive testing**, and **confidentiality**.`
        };

      case 2:
        return {
          summary: "Comprehensive technical exposition of the Hacker Framework, detailing all six sequential phases with an ASCII architectural diagram.",
          keyPoints: [
            "The 6 phases: 1) Reconnaissance, 2) Scanning & Enumeration, 3) Vulnerability Assessment, 4) Exploitation, 5) Post-Exploitation / Persistence, 6) Reporting / Covering Tracks.",
            "Reconnaissance gathers intelligence (OSINT).",
            "Scanning maps open ports, active hosts, and running services.",
            "Exploitation weaponizes flaws to gain initial unauthorized access.",
            "Ethical hackers generate reports; malicious hackers install persistence and clear event logs."
          ],
          content: `## 1. Introduction: The Universal Attack Lifecycle
Whether an attack is conducted by an advanced nation-state threat actor or an ethical penetration tester, the structured procedural execution follows the **Hacker Framework** (aligned with the **MITRE ATT&CK Framework** and **PTES standard**).

\`\`\`
                         THE HACKER FRAMEWORK
┌──────────────────┐
│ 1. Reconnaissance│ ──► Passive OSINT, WHOIS, DNS mapping, social engineering
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 2. Scanning &    │ ──► Nmap port scans, banner grabbing, SMB/SNMP enumeration
│    Enumeration   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 3. Vulnerability │ ──► Nessus, CVSS vulnerability prioritization, manual analysis
│    Analysis      │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 4. Exploitation  │ ──► Weaponization, Metasploit, buffer overflows, initial shell
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 5. Post-Exploit  │ ──► Privilege escalation, lateral movement, pivoting
└────────┬─────────┘
         ▼
┌──────────────────┐
│ 6. Reporting /   │ ──► Ethical: Deliver comprehensive remediation report
│    Cover Tracks  │ ──► Malicious: Clear audit event logs, install rootkits
└──────────────────┘
\`\`\`

---

## 2. In-Depth Phase Breakdown

### Phase 1: Reconnaissance (Footprinting)
- **Objective:** Gather as much intelligence about the target organization as possible without directly interacting with defensive firewalls.
- **Methods:** Search engine dorking, WHOIS records, DNS zone transfers, employee profiling on LinkedIn, harvesting leaked credentials on paste sites.

### Phase 2: Scanning & Enumeration
- **Objective:** Directly probe target network infrastructure to identify live hosts, open network ports, service versions, and system architecture.
- **Tools:** Nmap (\`-sS\`, \`-sV\`, \`-O\`), Masscan, Netcat, \`enum4linux\`.

### Phase 3: Vulnerability Analysis
- **Objective:** Correlate identified services against public vulnerability databases (NVD, Exploit-DB, CVE indices) to identify exploitable weaknesses.

### Phase 4: Exploitation (Gaining Access)
- **Objective:** Bypass security controls and gain unauthorized access to target systems by weaponizing identified vulnerabilities (e.g., executing remote code execution payloads, SQL injection, credential stuffing).

### Phase 5: Post-Exploitation (Maintaining Access & Lateral Movement)
- **Objective:** Maximize impact by:
  - *Privilege Escalation:* Elevating from unprivileged user (\`www-data\`) to \`root\` or \`NT AUTHORITY\\SYSTEM\`.
  - *Lateral Movement:* Pivoting through internal networks to compromise Domain Controllers.

### Phase 6: Reporting vs. Covering Tracks
- **Ethical Hacker:** Prepares a comprehensive technical and executive report detailing findings, risk ratings, and remediation steps.
- **Malicious Black-Hat Hacker:** Clears event logs (\`wevtutil\`, \`shred ~/.bash_history\`), hides processes with rootkits, and installs backdoor persistence.

---

## 3. Exam Summary
The Hacker Framework follows six sequential stages: **Reconnaissance** (intel gathering), **Scanning & Enumeration** (mapping targets), **Vulnerability Analysis** (locating flaws), **Exploitation** (breaching access), **Post-Exploitation** (privilege escalation & pivoting), and **Reporting / Covering Tracks**.`
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
          summary: "Formal definition of Ethical Hacking.",
          keyPoints: [
            "Authorized penetration testing using attacker techniques.",
            "Conducted with explicit permission to discover and remediate security flaws."
          ],
          content: `### Definition of Ethical Hacking
**Ethical Hacking** is the legal, authorized process of penetrating systems, networks, or applications using adversary techniques to evaluate defensive security posture, uncover exploitable vulnerabilities, and provide remediation guidance before malicious actors can exploit them.`
        };

      case 2:
        return {
          summary: "Formal definition of Penetration Testing.",
          keyPoints: [
            "Goal-oriented simulated cyberattack against an organization's systems.",
            "Verifies if theoretical vulnerabilities can be actively exploited."
          ],
          content: `### What is Penetration Testing?
**Penetration Testing (Pen Testing)** is an active, simulated cyberattack authorized by an organization to test the effectiveness of its security controls. Testers attempt to exploit known and unknown vulnerabilities to assess real-world business impact and data compromise.`
        };

      case 3:
        return {
          summary: "Formal definition of a Vulnerability in cybersecurity.",
          keyPoints: [
            "A flaw or weakness in software, hardware, or policy.",
            "Can be exploited by a threat actor to violate security controls."
          ],
          content: `### Definition of Vulnerability
In cybersecurity, a **Vulnerability** is a flaw, design bug, misconfiguration, or weakness in an information system, security procedure, internal control, or implementation that can be actively exploited by an adversary to violate system confidentiality, integrity, or availability.`
        };

      case 4:
        return {
          summary: "Formal definition of Reconnaissance in ethical hacking.",
          keyPoints: [
            "Preliminary intelligence-gathering phase.",
            "Split into Passive (OSINT) and Active (direct probing) reconnaissance."
          ],
          content: `### Definition of Reconnaissance
**Reconnaissance (Footprinting)** is the initial phase of ethical hacking dedicated to gathering preparatory intelligence about a target organization (IP ranges, domain names, employee emails, technologies):
- **Passive Reconnaissance:** Gathering intelligence via public sources (OSINT) without touching target infrastructure.
- **Active Reconnaissance:** Directly interacting with target systems (e.g., ping sweeps, port scans).`
        };

      case 5:
        return {
          summary: "Formal definition of Enumeration in ethical hacking.",
          keyPoints: [
            "Active probing phase to extract detailed system inventory.",
            "Extracts usernames, group memberships, shares, and services."
          ],
          content: `### Definition of Enumeration
**Enumeration** is the active phase of ethical hacking where a tester establishes direct connections with target systems to harvest specific, granular network inventory data, including user accounts, group memberships, network shares, routing tables, and service banners (e.g., via SMB, SNMP, LDAP, or RPC).`
        };
    }
  }

  return null;
}
