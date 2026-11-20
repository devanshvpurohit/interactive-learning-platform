# AI-Powered Interactive Learning & Exam Preparation Platform

A modern, responsive, full-stack educational web application architected for university engineering examinations (IARE Regulation BT-23). The platform delivers a centralized study workspace for **Language Modelling (ACAD40)** and **Ethical Hacking & Cyber Defence (ACSD53)**, featuring 465 verified exam questions, comprehensive syllabus-grounded model answers, dynamic React Flow algorithm diagrams, Three.js 3D concept visualizations, and a personal Gemini AI study tutor.

---

## 🌟 Key Features

### 1. Dual Subject Architecture & 465 Questions
- **Subject 1: Language Modelling (ACAD40)**
  - 250 Questions across 5 Modules (Part A: 10, Part B: 20, Part C: 20 per module).
  - Modules: Classical Approach to NLP, Regular Expressions & Text Normalization, N-Gram Language Models, Word Sense Disambiguation, Markov Models & POS Tagging.
- **Subject 2: Ethical Hacking and Cyber Defence (ACSD53)**
  - 215 Questions across 5 Modules.
  - Modules: Introduction to Ethical Hacking, The Business Perspective, Preparing for a Hack, Enumeration & Exploitation, Deliverables & Defense Planning.
- **Zero Discarded Questions**: 100% extraction accuracy with exact original wording, Bloom's taxonomies, marks (2M, 5M, 10M), and course outcomes preserved.

### 2. Dedicated Question Pages & Structured Answers
- Dedicated URL for every single question (`/questions/[id]`).
- Exam-oriented answers:
  - **2 Marks:** Concise definitions, key takeaways, formulas.
  - **5 / 10 Marks:** Multi-section explanations with theoretical background, ASCII architecture diagrams, KaTeX mathematical equations, comparison tables, and conclusion.
- Verified answer review statuses (`AI Generated`, `Reviewed`, `Needs Verification`).
- Question inaccuracy reporting workflow.
- Seamless previous and next question navigation with keyboard shortcuts (`ArrowLeft` / `ArrowRight`).

### 3. Interactive React Flow Diagrams (`/flowcharts`)
- Step-by-step algorithmic playback with Framer Motion.
- Pan, zoom, fit-to-view, fullscreen toggle, and vector SVG download.
- Interactive node click inspection.
- Flowcharts included:
  - *End-to-End NLP Pipeline Flowchart*
  - *Byte-Pair Encoding (BPE) Subword Tokenization*
  - *Minimum Edit Distance Dynamic Programming Matrix*
  - *Viterbi Decoding Algorithm for HMM POS Tagging*
  - *Yarowsky Bootstrapping WSD Algorithm*
  - *Complete Ethical Hacking & Penetration Testing Lifecycle*
  - *Vulnerability Assessment vs Penetration Testing Decision Tree*
  - *Incident Response & Remediation Lifecycle (NIST SP 800-61)*

### 4. Interactive Three.js 3D Concept Space (`/visualizations`)
- Built with React Three Fiber (`@react-three/fiber`), Drei, and Three.js.
- OrbitControls (rotate, zoom, pan), perspective lighting, raycast object selection, and exploded view layers.
- Visualizations included:
  - *Neural Word Embedding & Semantic Vector Space*
  - *Hidden Markov Model (HMM) Trellis & State Sphere*
  - *Defense-in-Depth Multi-Layer Security Shield (with Exploded Layer toggle)*
  - *Enterprise Network Attack Surface Topology*
  - *The CIA Triad & Non-Repudiation Crystalline Prism*

### 5. Google Gemini AI Study Assistant (`/tutor`)
- Powered by the official Google Gen AI SDK (`@google/genai`).
- User-provided API Key integration through Settings (`/settings`).
- **Enterprise-Grade Security:**
  - Stored API keys are encrypted at rest with AES-256-GCM using unique initialization vectors and authentication tags.
  - Keys are never leaked to client JavaScript or browser network tabs.
  - Complete data erasure option to permanently remove keys from the database.
- **5 Dedicated Tutor Modes:**
  1. *General Tutor*: Broad academic mentoring across both engineering disciplines.
  2. *Explain This Answer*: Step-by-step algorithmic breakdowns and formula explanations.
  3. *Simplify This Topic*: Feynman technique using intuitive real-world analogies.
  4. *Exam Preparation*: Marking rubrics, high-yield keywords, and examiner pitfalls.
  5. *Generate Practice Questions*: Self-testing quizzes and model keys.

### 6. Exam Prep & Practice Test Engine (`/exam-prep`)
- Randomized study sessions and practice tests.
- Instant Answer Reveal mode and flashcard self-evaluation.
- Confidence scoring (Need Review / Partially Knew / Mastered).

### 7. Document Management & Ingestion (`/admin`)
- Upload syllabi and question bank PDFs/Word documents.
- Real-time PDF parsing and structure extraction.
- Validation reports showing extraction counts, module breakdowns, and health status.
- Full question bank export to JSON and CSV.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS (Dark Charcoal / Navy Theme)
- **Animation:** Framer Motion
- **Diagrams:** React Flow (`@xyflow/react`)
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei
- **Mathematics:** KaTeX
- **Database & ORM:** SQLite with Prisma ORM
- **AI Engine:** Google Gemini (`@google/genai`)
- **Document Parsers:** `pdf-parse`, `mammoth` (no Python dependencies)
- **Icons:** Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node.js v22)
- npm or pnpm

### 2. Installation
```bash
cd interactive-learning-platform
npm install
```

### 3. Database Setup & Data Ingestion
Generate the Prisma client and run the automated data ingestion seed script:
```bash
npx prisma generate
npx tsx scripts/seed.ts
npx tsx scripts/link-visuals.ts
```

### 4. Running the Application
```bash
# Production Build & Start
npm run build
npm run start

# Or Development Mode
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚙️ Configuration & Gemini API Key
To enable the live AI Study Assistant:
1. Navigate to **Settings** (`/settings`) from the sidebar.
2. Paste your Google Gemini API key (obtainable free of charge from [Google AI Studio](https://aistudio.google.com/app/apikey)).
3. Click **Test Connection** to verify with Google's servers.
4. Click **Save & Encrypt Key** to encrypt it with AES-256-GCM.
