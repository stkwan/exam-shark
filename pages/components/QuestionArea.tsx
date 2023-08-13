import { Question } from '@/models/Question'
import styles from '@/pages/components/QuestionArea.module.css';
import React, { MouseEvent, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Choice from '@/models/Choice';
import Image from 'next/image';
import correctSVG from '@/public/correct.svg';
import incorrectSVG from '@/public/incorrect.svg';
import EditQuestionModal from './editModal';
import deleteQuestion from '@/controllers/questionDelete';
import { useRouter } from 'next/router';

interface QuestionResponse {
  questions: Question[]
  refreshExam: (id: string) => void; 
}

// { props: {questions: [ { q1 }, { q2 }, { q3 } ] } }

export default function QuestionArea ( { questions, refreshExam }: QuestionResponse ) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [questionToEdit, setQuestionToEdit] = useState<Question>();

  const router = useRouter();
  const examId = router.query.id as string;

  const handleClick = function (event: MouseEvent<HTMLParagraphElement>, choice: Choice) {
    event.preventDefault();
    const { correct } = choice;
    const target = event.target as HTMLParagraphElement;

    switch (target.tagName) {
      case 'P':
        target.firstElementChild!.classList.toggle(styles.correct);
        break;
      case 'IMG':
        target.parentElement!.classList.toggle(styles.correct);
        break;
      case 'SPAN':
        target.classList.toggle(styles.correct);
        break;
    }
  }

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked EDIT!');
    handleShow();
    
    const button = event.target as HTMLButtonElement;
    const targetQuestionId = button.getAttribute('data-question-id');
    const targetQuestion = questions.filter(question => question.id === Number(targetQuestionId));
    setQuestionToEdit(targetQuestion[0]);
  };

  const sortQuestions = function(questions: Question[]):Question[] {
    return questions.sort((a: Question, b: Question) => {
      const numberA = a.id;
      const numberB = b.id;
      if (numberA < numberB) {
        return -1;
      }
      if (numberA > numberB) {
        return 1;
      }
      return 0;
    }); 
  }

  const sortChoices = function(choices: Choice[]):Choice[] {
    return choices.sort((a: Choice, b: Choice) => {
      const numberA = Number(a.id);
      const numberB = Number(b.id);
      if (numberA < numberB) {
        return -1;
      }
      if (numberA > numberB) {
        return 1;
      }
      return 0;
    }); 
  }

  const handleDeleteQuestion = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('delete question!');

    const button = event.target as HTMLButtonElement;
    const targetQuestionId = button.getAttribute('data-question-id') as string;

    const response = window.confirm('Are you sure you want to delete this question?');
    if (response === true) {
        await deleteQuestion(examId, targetQuestionId);
        //const accordianItem = document.querySelector(`.card_${targetQuestionId}`);
        //accordianItem?.remove();
        router.reload();
        alert('Successfully deleted question');
    }
  }

  return (
    <div>
      <Accordion>
      {sortQuestions(questions).map((question, index) => {
        return (
          <Accordion.Item className={`card_${question.id}`} key={question.id} eventKey={`${question.id}`}>
            <Accordion.Header>
              {`${index + 1}. ${question.prompt}`}
            </Accordion.Header>
            <Accordion.Body>
              {sortChoices(question.choices).map(choice => {
                return (
                  <p 
                    className={styles.choice}
                    key={choice.id}
                    onClick={(e) => handleClick(e, choice)}
                  >{choice.statement}
                    <span
                      className={styles.correct}
                    >
                      {choice.correct ? 
                        <Image src={correctSVG} alt='correct mark'></Image> : 
                        <Image src={incorrectSVG} alt='wrong mark'></Image>}
                    </span>
                  </p>
                );
              })}
              <button onClick={handleEdit} data-question-id={question.id} className={`${styles.hide} ${styles.editButton} editButton btn btn-primary`}>Edit</button>
              <button onClick={handleDeleteQuestion} data-question-id={question.id} className={`${styles.hide} ${styles.deleteButton} deleteButton btn btn-primary`}>Delete</button>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
      </Accordion>

      {questionToEdit && <EditQuestionModal show={show} handleClose={handleClose} questionToEdit={questionToEdit} refreshExam={refreshExam}></EditQuestionModal>}
    </div>
  );
}
