import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export interface ParsedQuestion {
  qNo: number;
  part: "PART A" | "PART B" | "PART C";
  partName: string;
  marks: number;
  question: string;
  taxonomy: string;
  subsumeLevel: string;
  courseOutcome: string;
  moduleNumber: number;
  moduleRoman: string;
  moduleTitle: string;
}

export interface ParseResult {
  subjectName: string;
  subjectCode: string;
  department: string;
  regulation: string;
  semester: string;
  modules: Array<{
    number: number;
    roman: string;
    title: string;
    questionCount: number;
  }>;
  totalQuestions: number;
  questions: ParsedQuestion[];
  validationReport: {
    extractedCount: number;
    expectedCount: number;
    status: "success" | "partial" | "failed";
    issues: string[];
    breakdown: Record<string, { partA: number; partB: number; partC: number; total: number }>;
  };
}

const ROMAN_NUMERALS: Record<number, string> = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
};

export async function parseQuestionBankPdf(buffer: Buffer, fileName: string): Promise<ParseResult> {
  const parser: any = new (PDFParse as any)(new Uint8Array(buffer));
  await parser.load();
  const textObj = await parser.getText();
  const rawText = textObj.text;

  // Detect subject metadata
  let subjectName = "Subject";
  let subjectCode = "SUB01";
  let department = "Computer Science and Engineering";
  let regulation = "IARE - BT23";
  let semester = "VII";

  if (rawText.includes("LANGUAGE MODELLING") || fileName.toUpperCase().includes("ACAD40") || fileName.toUpperCase().includes("LM")) {
    subjectName = "Language Modelling";
    subjectCode = "ACAD40";
    department = "CSE (Artificial Intelligence & Machine Learning)";
    regulation = "IARE - BT23";
    semester = "VII";
  } else if (rawText.includes("ETHICAL HACKING") || fileName.toUpperCase().includes("ACSD53") || fileName.toUpperCase().includes("EH")) {
    subjectName = "Ethical Hacking and Cyber Defence";
    subjectCode = "ACSD53";
    department = "CSE(DS)/CSE(CS)/CSE(AIML)";
    regulation = "BT-23";
    semester = "VII";
  } else {
    const codeMatch = rawText.match(/Course Code\s+([A-Z0-9]+)/i);
    if (codeMatch) subjectCode = codeMatch[1].trim();
    const titleMatch = rawText.match(/Course Title\s+([^\n\r]+)/i);
    if (titleMatch) subjectName = titleMatch[1].trim();
  }

  // Split into modules
  const moduleBlocks = rawText.split(/MODULE\s+([I|V|X]+)/i);
  const questions: ParsedQuestion[] = [];
  const breakdown: Record<string, { partA: number; partB: number; partC: number; total: number }> = {};
  const issues: string[] = [];

  const moduleTitles: Record<number, string> =
    subjectCode === "ACAD40"
      ? {
          1: "Classical Approach to NLP",
          2: "Regular Expressions, Text Normalization",
          3: "N-Gram Language Models",
          4: "Word Sense Disambiguation",
          5: "Markov Model and POS Tagging",
        }
      : {
          1: "Introduction to Ethical Hacking",
          2: "The Business Perspective",
          3: "Preparing for a Hack",
          4: "Enumeration and Exploitation",
          5: "Deliverable",
        };

  // Modules start after index 1 in split array (each match produces roman + block)
  let currentModNum = 0;
  for (let i = 1; i < moduleBlocks.length; i += 2) {
    currentModNum++;
    const roman = moduleBlocks[i].trim();
    const blockContent = moduleBlocks[i + 1] || "";

    const title = moduleTitles[currentModNum] || `Module ${roman}`;
    breakdown[`Module ${currentModNum}`] = { partA: 0, partB: 0, partC: 0, total: 0 };

    // Part A, Part B, Part C extraction
    const partASplit = blockContent.split(/PART\s*-?\s*B/i);
    const partAText = partASplit[0] || "";
    const partBCSplit = (partASplit[1] || "").split(/PART\s*-?\s*C/i);
    const partBText = partBCSplit[0] || "";
    const partCText = partBCSplit[1] || "";

    const extractPartQuestions = (
      pText: string,
      partKey: "PART A" | "PART B" | "PART C",
      partName: string,
      marks: number
    ) => {
      // Regex pattern to extract (qNo)(questionText)(Taxonomy)(subsumeLevel)(CO)
      const regex =
        /\n\s*(\d+)\s+([a-zA-Z][\s\S]+?)(?=(Understand|Remember|Apply|Analyze|Evaluate|Create)\b)\s*(Understand|Remember|Apply|Analyze|Evaluate|Create)\b([\s\S]+?)(?=(CO\s*\d|CO\d)\b)\s*(CO\s*\d|CO\d)/g;

      let match;
      let count = 0;
      while ((match = regex.exec(pText)) !== null) {
        count++;
        const qNum = parseInt(match[1], 10);
        const qText = match[2].replace(/\s+/g, " ").trim();
        const taxonomy = match[3].trim();
        const subsume = match[4].replace(/\s+/g, " ").trim();
        const co = match[5].replace(/\s+/g, "").trim();

        questions.push({
          qNo: qNum,
          part: partKey,
          partName,
          marks,
          question: qText,
          taxonomy,
          subsumeLevel: subsume,
          courseOutcome: co,
          moduleNumber: currentModNum,
          moduleRoman: roman,
          moduleTitle: title,
        });
      }

      return count;
    };

    const cntA = extractPartQuestions(
      partAText,
      "PART A",
      "Problem Solving and Critical Thinking Questions",
      subjectCode === "ACAD40" ? 10 : 10
    );
    const cntB = extractPartQuestions(
      partBText,
      "PART B",
      "Long Answer Questions",
      10
    );
    const cntC = extractPartQuestions(
      partCText,
      "PART C",
      "Short Answer Questions",
      2
    );

    breakdown[`Module ${currentModNum}`] = {
      partA: cntA,
      partB: cntB,
      partC: cntC,
      total: cntA + cntB + cntC,
    };
  }

  const expectedCount = subjectCode === "ACAD40" ? 250 : 215;
  const extractedCount = questions.length;

  return {
    subjectName,
    subjectCode,
    department,
    regulation,
    semester,
    modules: Object.keys(breakdown).map((k, idx) => ({
      number: idx + 1,
      roman: ROMAN_NUMERALS[idx + 1] || `${idx + 1}`,
      title: moduleTitles[idx + 1] || `Unit ${idx + 1}`,
      questionCount: breakdown[k].total,
    })),
    totalQuestions: extractedCount,
    questions,
    validationReport: {
      extractedCount,
      expectedCount,
      status: extractedCount === expectedCount ? "success" : extractedCount > 0 ? "partial" : "failed",
      issues,
      breakdown,
    },
  };
}

export async function parseDocumentFile(
  buffer: Buffer,
  fileName: string,
  fileType: string
): Promise<{ rawText: string; isDocx: boolean }> {
  if (fileType.includes("word") || fileName.endsWith(".docx")) {
    const res = await mammoth.extractRawText({ buffer });
    return { rawText: res.value, isDocx: true };
  } else {
    const parser: any = new (PDFParse as any)(new Uint8Array(buffer));
    await parser.load();
    const textObj = await parser.getText();
    return { rawText: textObj.text, isDocx: false };
  }
}
