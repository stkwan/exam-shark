import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import QuestionArea from "../components/QuestionArea";
import { Question } from "@/models/Question";

interface QuestionResponse {
  questions: Question[];
}

export default function ExamPage () {
  const router = useRouter();
  const { id } = router.query;
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null)

  useEffect(() => {
    refreshExam(Number(id));
  }, [id])

  const refreshExam = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}/question`);
    const questionObject = await response.json();
    setQuestionRes(questionObject);
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const currentExamId = Number(event.target.value);
    //refreshExam(currentExamId);
    router.push(`/exam/${currentExamId}`);
  }

  return (
    <div>
      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
    </div>
  );
} 