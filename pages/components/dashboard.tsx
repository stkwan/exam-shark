import styles from '@/pages/components/dashbord.module.css';
import { ExamResponse } from '@/models/Exam';
import { ChangeEvent, useEffect, useState } from 'react';
import { Question } from '@/models/Question';
import QuestionArea from './QuestionArea';
import { useRouter } from 'next/router';

interface QuestionResponse {
  questions: Question[];
}

export default function DashBoard({ allExams }: ExamResponse ) {
  const [examId, setExamId] = useState<number | null>(null);
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null);
  const router = useRouter();

  const refreshExam = async (id: number) => {
    setExamId( id );
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}/question`);
    const questionObject = await response.json();
    setQuestionRes(questionObject);
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const currentExamId = Number(event.target.value);
    //refreshExam(currentExamId);
    router.push(`/exam/${currentExamId}`);
  }

  const handleNewExam = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('New clicked');
    router.push('/new');
  }

  return (
    <div className={styles.dashboard}>
        <div className={styles.examList}>
          <select className={styles.selectExam} onChange={handleChange}>
            <option value="" hidden>My Exams</option>
            {allExams.map(exam => {
              return (
                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.title}  
                </option>
              )
            })}
          </select>
          <button onClick={handleNewExam} className="btn btn-primary">+ New</button>
        </div>

        <hr />

      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
       
    </div>
  );
}