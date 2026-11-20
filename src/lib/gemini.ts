import { GoogleGenAI } from "@google/genai";

export type TutorMode =
  | "general_tutor"
  | "explain_answer"
  | "simplify_topic"
  | "exam_prep"
  | "practice_questions";

export interface TutorContext {
  subjectName?: string;
  subjectCode?: string;
  unitName?: string;
  questionText?: string;
  answerText?: string;
  history?: Array<{ sender: "user" | "assistant"; content: string }>;
}

export async function testApiKey(apiKey: string): Promise<{ valid: boolean; error?: string }> {
  try {
    const ai = new GoogleGenAI({ apiKey });
    // Quick lightweight call to verify authorization
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Reply with the single word 'OK'.",
    });
    if (response && response.text) {
      return { valid: true };
    }
    return { valid: false, error: "Empty response from Gemini API" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { valid: false, error: errorMessage };
  }
}

export async function callGeminiTutor({
  apiKey,
  mode,
  userMessage,
  context,
}: {
  apiKey: string;
  mode: TutorMode;
  userMessage: string;
  context?: TutorContext;
}): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });

  let modeInstruction = "";
  switch (mode) {
    case "explain_answer":
      modeInstruction = `You are in "Explain This Answer" mode. Provide a deep, intuitive explanation of the provided answer. Break down complex terminology into relatable examples, emphasize high-yield exam takeaways, and explain the intuition behind the mathematical or algorithmic steps.`;
      break;
    case "simplify_topic":
      modeInstruction = `You are in "Simplify This Topic" mode. Explain the concept using the Feynman technique—use simple everyday analogies, clear step-by-step logic, zero unnecessary jargon, and clear diagrams in ASCII or Mermaid where helpful.`;
      break;
    case "exam_prep":
      modeInstruction = `You are in "Exam Preparation" mode. Help the student prepare for university examinations (e.g. 2 marks, 5 marks, 10 marks format). Point out typical trap questions, crucial keywords that evaluators look for, standard definitions, and exact marking criteria according to Bloom's taxonomy.`;
      break;
    case "practice_questions":
      modeInstruction = `You are in "Generate Practice Questions" mode. Formulate high-yield practice questions (including short answer 2-mark definitions, numericals/derivations, and 10-mark essay problems) with model solutions and self-assessment criteria based on the syllabus.`;
      break;
    case "general_tutor":
    default:
      modeInstruction = `You are an expert, encouraging university professor and AI Tutor for Computer Science and Engineering courses (specifically Language Modelling and Ethical Hacking & Cyber Defence). Help the student understand core principles, write clean exam answers, and master algorithms.`;
      break;
  }

  let contextualInfo = "";
  if (context?.subjectName) contextualInfo += `\nSubject: ${context.subjectName} (${context.subjectCode || ""})`;
  if (context?.unitName) contextualInfo += `\nModule/Unit: ${context.unitName}`;
  if (context?.questionText) contextualInfo += `\nReferenced Question: ${context.questionText}`;
  if (context?.answerText) contextualInfo += `\nReferenced Model Answer:\n${context.answerText}`;

  const systemInstruction = `${modeInstruction}
${contextualInfo}

Guidelines:
- Format math formulas using LaTeX (e.g., $P(w_i|w_{i-1})$ or display math $$...$$).
- Use structured Markdown with clear headings, bullet points, and tables when comparing.
- Be accurate and align with the university syllabus and textbooks (Manning & Schütze, Jurafsky & Martin for NLP; EC-Council, CEH, and NIST frameworks for Ethical Hacking).
- Maintain an encouraging and clear academic tone.`;

  // Format conversation history
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

  if (context?.history && context.history.length > 0) {
    for (const h of context.history) {
      contents.push({
        role: h.sender === "assistant" ? "model" : "user",
        parts: [{ text: h.content }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text || "No response received from tutor.";
}
