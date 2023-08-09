import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import QuestionArea from "../components/QuestionArea";
import { Question } from "@/models/Question";
import styles from "@/styles/exam.module.css";

interface QuestionResponse {
  questions: Question[];
}

export default function ExamPage () {
  const router = useRouter();
  const { id } = router.query;
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null)
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === 'string') {
      getExamTitle(id);
      refreshExam(id);
    }
  }, [id])

  const refreshExam = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}/question`);
    const questionObject = await response.json();
    setQuestionRes(questionObject);
  }

  const getExamTitle = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}`);
    const examObject = await response.json();
    setTitle(examObject.title);
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const currentExamId = Number(event.target.value);
    //refreshExam(currentExamId);
    router.push(`/exam/${currentExamId}`);
  }

  return (
    <div>
      <h1 className={styles.examHeading}>{title && title}</h1>
      <hr />
      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
    </div>
  );
} 