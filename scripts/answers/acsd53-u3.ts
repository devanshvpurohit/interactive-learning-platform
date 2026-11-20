import { QuestionData, GeneratedAnswer } from "./types";

export function getAcsd53Unit3Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
        return {
          summary: "Comprehensive penetration testing plan for a corporate network defining scope, legal authorization, objectives, communication channels, and Rules of Engagement (RoE).",
          keyPoints: [
            "Formal written authorization (Letter of Authorization / 'Get Out of Jail Free' card) is legally mandatory.",
            "Defines explicit IP ranges, domains, exclusions, and cloud hosting third-party notifications.",
            "Rules of Engagement (RoE) specify testing windows, emergency contacts, and escalation criteria.",
            "Defines success criteria, reporting milestones, and non-disclosure agreements (NDAs)."
          ],
          content: `## 1. Executive Summary: The Corporate Preparation Blueprint
Before touching a client network, an ethical hacking team must establish formal contractual, legal, and operational boundaries. In the absence of a signed, legally binding **Rules of Engagement (RoE)** and **Letter of Authorization**, any scanning or exploitation is classified as a severe criminal felony under international law (e.g., Computer Fraud and Abuse Act - 18 U.S.C. § 1030 in the US; Section 43/66 of the Information Technology Act 2000 in India).

\`\`\`
                         PRE-ENGAGEMENT WORKFLOW
[1. Executive Scoping Meeting] ──► [2. Technical Target Identification]
                                                │
                                                ▼
[4. Signed Authorization & RoE] ◄── [3. Legal Review & NDAs]
              │
              ▼
    Active Testing Commences
\`\`\`

---

## 2. In-Depth Components of the Pre-Engagement Plan

### 1. Legal Authorization & Contracts
- **Non-Disclosure Agreement (NDA):** Legally binds the testing firm to protect all proprietary intellectual property, employee records, and discovered vulnerabilities under high-grade encryption.
- **Letter of Authorization (LoA):** An executive-signed document explicitly authorizing named penetration testers to probe specific corporate infrastructure, carried by testers during physical or active network engagements.

### 2. Rigorous Scope Delineation
- **In-Scope Assets:**
  - Corporate Public Subnets: \`198.51.100.0/24\`
  - Domain Names: \`*.example.com\`
  - Internal Headquarters LAN: Building 4, VLANs 10, 20, 30.
- **Out-of-Scope Assets (Strictly Prohibited):**
  - Third-party SaaS providers (e.g., Salesforce, Workday).
  - Production industrial control systems (SCADA / HVAC).
  - Executive personal email accounts and home Wi-Fi networks.

### 3. Rules of Engagement (RoE) Parameters
- **Testing Windows:** Active scans permitted only between **20:00 and 06:00 EST** Monday through Friday to prevent customer-facing performance degradation.
- **Prohibited Methodologies:** Volumetric Denial-of-Service (DDoS), physical violence, social engineering of low-tier customer support call centers.
- **Emergency De-Escalation Channel:** Immediate direct telephone line to the Chief Information Security Officer (CISO) if an active, real-world third-party attacker or critical data leak is uncovered during testing.

---

## 3. Exam Summary
A corporate penetration testing plan establishes **legal authorization (Letter of Authorization, NDA)**, defines unambiguous **scope boundaries** (in-scope vs out-of-scope assets), and enforces **Rules of Engagement (RoE)** parameters (testing hours, escalation contacts, banned attack vectors).`
        };

      case 2:
        return {
          summary: "Comprehensive comparative evaluation between Passive Reconnaissance (OSINT) and Active Reconnaissance in penetration testing engagements.",
          keyPoints: [
            "Passive Reconnaissance gathers intelligence from third-party and public sources without sending packets to target infrastructure.",
            "Active Reconnaissance directly probes target systems with network packets, creating logs on target firewalls and IDS/IPS.",
            "Passive tools: WHOIS, DNSDumpster, Shodan, Google Dorking, Maltego, LinkedIn.",
            "Active tools: Nmap port scans, banner grabbing, ping sweeps, web vulnerability scanners."
          ],
          content: `## 1. Introduction: The Two Modes of Intelligence Gathering
Reconnaissance is the foundational phase of ethical hacking. The methodologies are divided into **Passive Reconnaissance** (silent, indirect observation) and **Active Reconnaissance** (direct network interaction).

\`\`\`
PASSIVE RECONNAISSANCE (Zero Contact with Target):
Ethical Hacker ──► [Third-Party Services: Shodan, DNS, OSINT, Google] ──► Target Info
(Target Firewall Logs: ZERO ALERTS)

ACTIVE RECONNAISSANCE (Direct Network Packets):
Ethical Hacker ──► [Direct TCP/UDP Probes, SYN Scans, Banner Grabs] ──► Target Server
(Target Firewall & IDS/IPS: LOGS IP & TRIGGERS ALERTS)
\`\`\`

---

## 2. In-Depth Technical Breakdown

### 1. Passive Reconnaissance (OSINT)
- **Mechanism:** Information is harvested exclusively from public registries, search engine caches, social media, and third-party scanning repositories. The tester **never sends a single IP packet directly to the client's network**.
- **Detection Risk:** **Zero**. It is impossible for target intrusion detection systems (IDS) or firewalls to detect passive reconnaissance because no traffic hits their perimeter.
- **Techniques:**
  - *Certificate Transparency Logs (\`crt.sh\`):* Uncovering unlinked corporate subdomains.
  - *Internet Scanners (Shodan, Censys):* Querying previously indexed open ports and banners without scanning the target directly.
  - *Search Engine Dorking:* Using Google operators (\`site:example.com filetype:pdf "internal use only"\`).
  - *Social Engineering OSINT:* Mapping corporate organizational charts and executive names via LinkedIn.

### 2. Active Reconnaissance
- **Mechanism:** The tester transmits network packets directly to target IP addresses and ports to elicit active responses.
- **Detection Risk:** **High**. Traffic is recorded in target firewall logs, SIEMs, and triggers IDS/IPS signature alerts.
- **Techniques:**
  - *Network Port Scanning:* Sending TCP SYN packets (\`nmap -sS\`) to discover listening services.
  - *Banner Grabbing:* Connecting via Netcat/Telnet to read software version banners from ports 21 (FTP), 22 (SSH), 25 (SMTP), 80 (HTTP).
  - *DNS Zone Transfers:* Querying authoritative name servers with AXFR queries.

---

## 3. Comparison Matrix

| Attribute | Passive Reconnaissance | Active Reconnaissance |
| :--- | :--- | :--- |
| **Contact with Target** | Zero direct contact | Direct packet transmission |
| **Detection Probability**| 0% (Completely invisible to target) | High (Logged by firewalls, IDS/IPS) |
| **Information Yield** | High-level (domains, emails, tech stack)| Low-level / Granular (ports, OS, banners)|
| **Legality** | 100% legal (public open-source data) | Requires explicit written authorization |
| **Typical Tools** | Google Dorks, Shodan, Maltego, WHOIS | Nmap, Masscan, Netcat, Nikto |

---

## 4. Exam Summary
**Passive Reconnaissance** gathers intelligence from third parties (OSINT, Shodan, WHOIS) with zero target contact and zero detection risk; **Active Reconnaissance** directly probes target infrastructure (Nmap, banner grabbing), providing granular technical detail at the cost of generating firewall logs.`
        };

      case 3:
        return {
          summary: "Comprehensive Open Source Intelligence (OSINT) strategy for mapping enterprise digital footprints, technologies, credentials, and organizational structures.",
          keyPoints: [
            "OSINT collects, correlates, and analyzes publicly available information across surface, deep, and dark web sources.",
            "Domain & Infrastructure: WHOIS, DNS records, BGP Autonomous System Numbers (ASN), Shodan, Censys.",
            "Credential & Code Leakage: GitHub commit histories, Pastebin, breached credential databases (HaveIBeenPwned).",
            "Human & Social Footprint: LinkedIn organization mapping, corporate email harvesting (theHarvester)."
          ],
          content: `## 1. Introduction: The Power of OSINT
**Open Source Intelligence (OSINT)** is the systematic collection and analysis of publicly accessible information to discover vulnerabilities, employee credentials, software stacks, and attack surfaces without ever launching an offensive attack against target infrastructure.

\`\`\`
                                  THE OSINT PIPELINE
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
Infrastructure OSINT                Code & Credential OSINT             Human & Organizational OSINT
- WHOIS & ASN IP ranges             - GitHub / GitLab leaked secrets    - LinkedIn corporate hierarchy
- Shodan / Censys open ports        - HaveIBeenPwned breach databases   - theHarvester email addresses
- crt.sh Certificate Logs           - Pastebin configuration dumps      - Metadata in public PDFs (exiftool)
\`\`\`

---

## 2. In-Depth OSINT Technical Strategy

### 1. Infrastructure Footprinting
- **BGP Autonomous System Number (ASN) Mapping:** Uncovering the organization's total global IP allocations using \`amass intel -org "Example Corp"\`.
- **Subdomain Discovery via Certificate Transparency:** Reading public SSL/TLS certificates on \`crt.sh\` to find hidden development servers (\`staging-api.example.com\`, \`internal-vpn.example.com\`).
- **Passive Device Search Engines:** Using **Shodan** and **Censys** queries:
  \`\`\`
  org:"Example Corp" port:"3389"  # Finds exposed remote desktop endpoints
  ssl:"example.com" product:"Apache"
  \`\`\`

### 2. Secret and Credential Leakage Discovery
- **Public Git Repository Mining:** Using automated tools (\`trufflehog\`, \`gitleaks\`) to scan public GitHub/GitLab repositories belonging to target employees for accidentally committed AWS secret keys, database passwords, and API tokens.
- **Breached Credential Auditing:** Correlating company domain emails across de-hashed historical breach dumps to identify re-used corporate passwords.

### 3. Document Metadata Extraction
- Harvesting public PDF, DOCX, and PPTX files from the client's corporate website using Google Dorks (\`site:example.com filetype:pdf\`) and extracting author metadata using **ExifTool**:
  - Reveals internal usernames, workstation hostnames, operating system versions, and printer models.

---

## 3. Exam Summary
A robust OSINT strategy correlates **infrastructure footprinting** (BGP, Shodan, Certificate Transparency), **secret leakage audits** (GitHub scanning for API keys), and **human reconnaissance** (email harvesting, document metadata) to map the entire corporate attack surface passively.`
        };

      case 6:
        return {
          summary: "Comprehensive technical analysis of Social Engineering methodologies: Phishing, Spear-Phishing, Whaling, Vishing, Smishing, Pretexting, and Physical Audits.",
          keyPoints: [
            "Social engineering targets the human element—the weakest link in cybersecurity.",
            "Phishing: Broad untargeted email lures.",
            "Spear-Phishing & Whaling: Highly customized targeting of specific employees or C-level executives.",
            "Pretexting & Vishing: Creating fabricated scenarios over the telephone to elicit credentials.",
            "Defenses: Continuous employee security awareness training, phishing simulations, and multi-factor authentication (MFA)."
          ],
          content: `## 1. Introduction: Exploiting the Human Vulnerability
No matter how advanced an organization's firewalls or encryption algorithms may be, **the human element remains the single most vulnerable vector** in the cybersecurity perimeter. Social engineering is the psychological manipulation of individuals into divulging confidential information or executing unauthorized actions.

\`\`\`
                               SOCIAL ENGINEERING TAXONOMY
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
Email & Messaging Attacks           Voice & Mobile Attacks              Physical & Scenario Attacks
- Mass Phishing (Broad)             - Vishing (Voice Pretexting)        - Pretexting (Impersonation)
- Spear-Phishing (Targeted)         - Smishing (SMS phishing)           - Tailgating / Piggybacking
- Whaling (C-Suite Executives)      - SIM Swapping                      - Baiting (Dropping malicious USBs)
\`\`\`

---

## 2. In-Depth Methodology Breakdown

### 1. Phishing Variants
- **Mass Phishing:** Broad, untargeted emails blasted to millions of addresses imitating reputable banks or services (*"Your account is suspended, click here to verify"*).
- **Spear-Phishing:** Highly customized, researched attacks targeting a specific individual. The attacker utilizes OSINT (from LinkedIn, social media) to reference real colleagues, ongoing corporate projects, and genuine vendor invoices.
- **Whaling:** Spear-phishing directed exclusively at high-profile C-suite executives (CEOs, CFOs) to authorize massive fraudulent wire transfers (**Business Email Compromise - BEC**).

### 2. Vishing (Voice Phishing) & Pretexting
- **Pretexting:** Creating an elaborate, plausible fabricated scenario. The attacker impersonates an internal IT support technician calling an employee:
  > *"Hi John, this is Mike from internal IT infrastructure. We're detecting anomalous login attempts on your workstation. I need you to confirm the 6-digit MFA prompt appearing on your phone to lock the attacker out."*
- **Vishing:** Using VoIP spoofing software to fake the caller ID so the call appears to originate from the company's internal headquarters switchboard.

### 3. Physical Social Engineering
- **Tailgating (Piggybacking):** Following an authorized employee through a secure RFID badge door while holding a box of coffee or pretending to look distracted on a phone call.
- **Baiting (USB Drop Attack):** Scattering infected USB thumb drives labeled *"Q4 Executive Salaries"* or *"Company Layoffs.xlsx"* in the target company's parking lot. Curios employees plug them into internal workstations, executing embedded payloads.

---

## 3. Psychological Triggers Exploited by Social Engineers
1. **Authority:** Impersonating executives, police, or IT administrators.
2. **Urgency:** Creating artificial deadlines (*"Account will be deleted in 15 minutes"*).
3. **Fear:** Threatening legal action or employment termination.
4. **Greed / Curiosity:** Offering unexpected gift cards or confidential salary disclosures.

---

## 4. Exam Summary
Social engineering bypasses technical controls by exploiting human psychology (authority, urgency, fear). Major vectors include **Spear-Phishing** (targeted emails), **Whaling** (C-suite BEC), **Vishing** (voice pretexting), and **Tailgating / USB Drops** (physical breaches).`
        };
    }
  }

  // ==========================================
  // PART B (10 MARKS)
  // ==========================================
  if (part === "PART B") {
    switch (qNo) {
      case 4:
        return {
          summary: "Comprehensive analysis of Rules of Engagement (RoE) in ethical hacking, detailing legal authority, testing boundaries, risk mitigation, and de-escalation protocols.",
          keyPoints: [
            "The RoE is the formal contractual document governing the technical execution of a penetration test.",
            "Specifies exact IP targets, test windows, permitted methodologies, and third-party cloud coordination.",
            "Establishes emergency contact channels and immediate escalation thresholds.",
            "Protects both the client from operational outage and the tester from criminal prosecution."
          ],
          content: `## 1. What are Rules of Engagement (RoE)?
The **Rules of Engagement (RoE)** is the formal, legally binding technical contract negotiated between the client organization and the penetration testing firm. It establishes the exact operational parameters, ethical boundaries, schedule, and safety guidelines that govern how the controlled attack is conducted.

---

## 2. Mandatory Sections of an Enterprise RoE Document

\`\`\`
                               RULES OF ENGAGEMENT (RoE)
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Explicit Target Scope (Authorized IP subnets, domains, exclusions)  │
│ 2. Testing Schedule (Authorized testing dates, off-peak hour windows)  │
│ 3. Attack Methodology Constraints (Prohibitions on DoS, Ransomware)    │
│ 4. Communication & Escalation Protocols (Daily debriefs, primary POCs) │
│ 5. Handling of Critical Data (Storage of PII, encrypted reporting)     │
│ 6. "Get Out of Jail Free" Letter of Authorization Sign-Off             │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

1. **Target Specification:** Exhaustive listing of IP ranges, URLs, physical buildings, and accounts in scope, paired with an explicit list of prohibited exclusions.
2. **Operational Schedule:** Dictates when high-impact scanning can occur (e.g., weekends only).
3. **Banned Methodologies:** Explicitly forbidding techniques that introduce high operational risk:
   - No Denial of Service (DoS) attacks.
   - No modification of financial ledger balances.
   - No physical violence or damage to corporate property.
4. **Incident Escalation Procedures:** Defines immediate action if:
   - A critical Remote Code Execution (RCE) flaw is discovered.
   - Evidence of prior compromise by an actual foreign threat actor is detected on client servers.

---

## 3. Exam Summary
The **Rules of Engagement (RoE)** is the essential operational contract that defines **authorized targets**, **permitted hours**, **banned attack vectors (DoS)**, and **emergency communication protocols**, ensuring security testing remains safe and legally protected.`
        };

      case 8:
        return {
          summary: "Technical examination of DNS Interrogation and Zone Transfer (AXFR) vulnerabilities in penetration testing reconnaissance.",
          keyPoints: [
            "DNS translates human domain names into IP addresses; misconfigurations leak internal architecture.",
            "DNS Zone Transfer (AXFR) copies an entire zone database from primary to secondary name servers.",
            "If AXFR is left publicly open, an attacker downloads the complete list of corporate subdomains in one second.",
            "Mitigation: Restrict AXFR queries strictly to trusted secondary name server IP addresses."
          ],
          content: `## 1. Role of DNS in Reconnaissance
The **Domain Name System (DNS)** is the address book of the internet. For an ethical hacker, DNS interrogation provides an unprecedented map of an organization's internal and external network topology, server roles, mail exchangers, and cloud infrastructure.

---

## 2. In-Depth DNS Record Enumeration

\`\`\`
Target Domain: example.com
      │
      ├──► A / AAAA Records:  Resolves server IPv4 and IPv6 addresses
      ├──► MX Records:        Maps corporate email gateways (e.g., mail.example.com)
      ├──► TXT Records:       Leaks SPF, DKIM, DMARC, and domain verification tokens
      ├──► NS Records:        Identifies authoritative nameservers
      └──► CNAME Records:     Maps alias hostnames pointing to cloud buckets
\`\`\`

---

## 3. The DNS Zone Transfer Vulnerability (AXFR)

### The Mechanism
DNS Zone Transfers utilize the **AXFR protocol (TCP Port 53)** to synchronize DNS databases between a primary master nameserver and secondary slave nameservers.
- **The Misconfiguration:** If the master nameserver is misconfigured to allow AXFR requests from **any arbitrary IP address**, an attacker can download the entire internal DNS zone file in a single transaction.

### Executing a Zone Transfer via \`dig\`
\`\`\`bash
# 1. Identify authoritative name servers:
dig ns example.com +short

# 2. Attempt AXFR zone transfer against the target nameserver:
dig axfr @ns1.example.com example.com
\`\`\`

### The Impact
If vulnerable, the target server returns every single registered DNS record, exposing hidden development environments, staging portals, internal database servers, and private VPN endpoints (\`dev-db.example.com\`, \`internal-payroll.example.com\`).

---

## 4. Remediation: Hardening DNS
In the BIND configuration (\`named.conf\`), restrict zone transfers strictly to known secondary server IPs:
\`\`\`text
zone "example.com" {
    type master;
    file "example.com.zone";
    allow-transfer { 198.51.100.2; 198.51.100.3; }; // STUB ONLY TRUSTED SECONDARIES
};
\`\`\`

---

## 5. Exam Summary
DNS interrogation maps corporate infrastructure. A **DNS Zone Transfer (AXFR)** misconfiguration allows testers to download the organization's entire DNS directory in one command, instantly exposing all hidden staging and internal subdomains.`
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
          summary: "Formal definition of Reconnaissance in ethical hacking.",
          keyPoints: [
            "Initial intelligence-gathering stage.",
            "Collects domains, IP ranges, employee emails, and software stacks."
          ],
          content: `### Definition of Reconnaissance
**Reconnaissance (Footprinting)** is the foundational phase of ethical hacking dedicated to gathering intelligence about a target organization's technical infrastructure, employee profiles, and network boundaries prior to active scanning or exploitation.`
        };

      case 2:
        return {
          summary: "Definition of Technical Preparation before a penetration test.",
          keyPoints: [
            "Configuring testing platforms, Kali Linux, proxy servers, and attack infrastructure.",
            "Ensuring logging, secure channels, and verified connectivity."
          ],
          content: `### Technical Preparation in Penetration Testing
**Technical Preparation** is the operational phase prior to engagement execution where testers set up and harden their testing infrastructure: configuring Kali Linux environments, verifying specialized proxy routing (e.g., Burp Suite), provisioning static public IP addresses for client whitelisting, and establishing encrypted evidence logging systems.`
        };

      case 3:
        return {
          summary: "Formal definition of Rules of Engagement (RoE).",
          keyPoints: [
            "Contractual agreement defining testing scope, boundaries, schedule, and safety guidelines.",
            "Protects against operational disruption and legal liability."
          ],
          content: `### Definition of Rules of Engagement (RoE)
The **Rules of Engagement (RoE)** is a formal legal and technical contract that defines the precise operational constraints of a penetration test: specifying in-scope targets, excluded systems, approved testing hours, prohibited attack vectors (e.g., no DoS), and emergency escalation contacts.`
        };

      case 4:
      case 5:
        return {
          summary: "Definitions of Passive Reconnaissance and Active Reconnaissance.",
          keyPoints: [
            "Passive Recon: Zero direct contact; utilizes OSINT and public sources.",
            "Active Recon: Sends packets directly to target; generates firewall logs."
          ],
          content: `### Passive vs. Active Reconnaissance
- **Passive Reconnaissance:** Gathering target information from public third-party sources (OSINT, Shodan, WHOIS) with zero direct packet transmission to target infrastructure (completely undetectable).
- **Active Reconnaissance:** Probing target systems directly with network packets (port scans, banner grabs, ping sweeps), which creates connection traces in target firewall and IDS/IPS logs.`
        };

      case 6:
        return {
          summary: "Formal definition of Open Source Intelligence (OSINT).",
          keyPoints: [
            "Gathering and analyzing publicly available data.",
            "Discovers leaked credentials, subdomains, and organizational charts."
          ],
          content: `### Open Source Intelligence (OSINT)
**Open Source Intelligence (OSINT)** is the systematic collection and analysis of information obtained from publicly accessible, open data sources (surface web, public records, search engine caches, leaked code repositories, social media) to map an organization's attack surface without engaging in active hacking.`
        };

      case 8:
        return {
          summary: "Definition of DNS Interrogation.",
          keyPoints: [
            "Querying DNS servers for A, MX, NS, TXT, and CNAME records.",
            "Tests for AXFR zone transfer vulnerabilities."
          ],
          content: `### Definition of DNS Interrogation
**DNS Interrogation** is the process of probing a target's Domain Name System (DNS) servers to harvest registered hostnames, IP allocations, mail servers (MX), and aliases, as well as testing for unauthorized DNS Zone Transfers (AXFR) that expose the entire domain topology.`
        };

      case 9:
        return {
          summary: "Definition and role of WHOIS querying.",
          keyPoints: [
            "Public query protocol providing domain registration records.",
            "Reveals domain owner, technical contacts, registrar, and nameservers."
          ],
          content: `### What is WHOIS?
**WHOIS** is a standard query-response protocol used to search public databases that store registered users or assignees of internet domain names and IP address blocks, revealing the registrant's name, email, physical address, registrar, creation dates, and authoritative nameservers.`
        };

      case 10:
        return {
          summary: "Formal definition of Social Engineering in cybersecurity.",
          keyPoints: [
            "Manipulating people into breaking security procedures or divulging confidential data.",
            "Exploits human psychology rather than software bugs."
          ],
          content: `### Definition of Social Engineering
**Social Engineering** is the psychological manipulation of individuals into performing actions or divulging confidential credentials, sensitive documents, or unauthorized access, exploiting human trust, authority, fear, or urgency rather than technical software vulnerabilities.`
        };
    }
  }

  return null;
}
