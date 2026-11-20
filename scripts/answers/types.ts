export interface QuestionData {
  id: string;
  qNo: number;
  part: string;
  marks: number;
  question: string;
  taxonomy: string;
  courseOutcome: string;
  subsumeLevel: string | null;
  unitNumber: number;
  subjectCode: string;
}

export interface GeneratedAnswer {
  content: string;
  summary: string;
  keyPoints: string[];
}
