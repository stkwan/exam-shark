import Choice from '@/models/Choice';

export interface Question {
  id: number;
  number: number;
  prompt: string;
  snippet: string | null;
  choices: Choice[];
  examId: number;
}
