export interface Exam {
  id: number;
  title: string;
}

export interface ExamResponse {
  allExams: Exam[];
}