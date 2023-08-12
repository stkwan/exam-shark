import styles from '@/pages/components/dashbord.module.css';
import { Exam, ExamResponse } from '@/models/Exam';
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
  const [filteredExams, setFilteredExams] = useState<Exam[] | null>(allExams);
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

  const handleExamClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    const currentExamDiv = event.target as HTMLDivElement;
    const currentExamId = currentExamDiv.id;
    router.push(`/exam/${currentExamId}`);
  }

  const handleNewExam = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('New clicked');
    router.push('/new');
  }

  const handleExamSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = allExams.filter(exam => {
      const globalRegex = new RegExp(`${(event.target.value).toLowerCase()}`, 'g');
      return globalRegex.test((exam.title).toLowerCase());
    });
    setFilteredExams(filtered);
  }

  return (
    <div className={styles.dashboard}>
        <div className={styles.examList}>
          <input className={styles.examSearchInput} placeholder='Search Exams' type="text" onChange={handleExamSearch} /> 
          {/*<select className={styles.selectExam} onChange={handleChange}>
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
          </select>*/}
          <button onClick={handleNewExam} className="btn btn-primary">+ New</button>
        </div>

        <hr />

        {filteredExams && filteredExams.map(exam => {
          return (
            <div key={`card_${exam.id}`} onClick={handleExamClick} className={`card ${styles.examTitleCard}`}>
              <div id={String(exam.id)} className="card-body">
                {exam.title}
              </div>
            </div>
          );
        })} 
        

      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
       
    </div>
  );
}