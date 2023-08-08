import styles from '@/pages/components/dashbord.module.css';
import { ExamResponse } from '@/models/Exam';
import { ChangeEvent, useEffect, useState } from 'react';
import { Question } from '@/models/Question';
import QuestionArea from './QuestionArea';

interface QuestionResponse {
  questions: Question[];
}

export default function DashBoard({ allExams }: ExamResponse ) {
  const [examId, setExamId] = useState<number | null>(null);
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null);

  const refreshExam = async (id: number) => {
    setExamId( id );
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY}/api/exam/${id}/question`);
    const questionObject = await response.json();
    setQuestionRes(questionObject);
  }

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const currentExamId = Number(event.target.value);
    refreshExam(currentExamId);
  }

  return (
    <div className="dashboard">


        <div className="examList">
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
        </div>

        <hr />

      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
       
    </div>
  );
}