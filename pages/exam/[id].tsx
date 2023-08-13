import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionArea from "../components/QuestionArea";
import { Question } from "@/models/Question";
import styles from "@/styles/exam.module.css";
import Image from "next/image";
import menu from "@/public/menu.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CreateQuestionModal from '@/pages/components/modal';
import questionAreaStyles from '@/pages/components/QuestionArea.module.css';

interface QuestionResponse {
  questions: Question[];
}

export default function ExamPage () {
  const router = useRouter();
  const id = router.query.id as string;
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null)
  const [title, setTitle] = useState<string | null>(null);  
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleTestModeOn = () => {
    const allChoices = document.querySelectorAll('p');
    allChoices.forEach(choice => {
      if (!choice.firstElementChild?.classList.contains(questionAreaStyles.correct)) {
        choice.click();
      }
    });
    const allEditButtons = document.querySelectorAll('button.editButton');
    allEditButtons.forEach(button => button.classList.add(questionAreaStyles.hide));
  }

  const handleEditModeOn = () => {
    const allChoices = document.querySelectorAll('p');
    allChoices.forEach(choice => {
      if (choice.firstElementChild?.classList.contains(questionAreaStyles.correct)) {
        choice.click();
      }
    });
    const allEditButtons = document.querySelectorAll('button.editButton');
    allEditButtons.forEach(button => button.classList.remove(questionAreaStyles.hide));
  } 

  return (
    <div>
      <div className={styles.examHeading}>
        <DropdownButton variant='light' title={<Image src={menu} alt='menu-icon'></Image>}>
          <Dropdown.Item className={styles.menuItem} onClick={handleShow}>Create Question</Dropdown.Item>
          <Dropdown.Item className={styles.menuItem} onClick={handleEditModeOn}>Edit Mode</Dropdown.Item>
          <Dropdown.Item className={styles.menuItem} onClick={handleTestModeOn}>Test Mode</Dropdown.Item>
          <Dropdown.Item className={styles.menuItem}>Delete Exam</Dropdown.Item>
        </DropdownButton>
        <h1>{title && title}</h1>
        <div className={styles.placeHolder}></div>
      </div>
      <hr />

      {questionRes !== null && <CreateQuestionModal show={show} handleClose={handleClose} questionCount={questionRes?.questions.length} examId={id} refreshExam={refreshExam}></CreateQuestionModal>}

      {questionRes !== null && <QuestionArea questions={ questionRes.questions } refreshExam={refreshExam}></QuestionArea>}

    </div>
  );
}
