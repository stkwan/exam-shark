import { Question } from '@/models/Question'
import styles from '@/pages/components/QuestionArea.module.css';
import { MouseEvent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Choice from '@/models/Choice';
import Image from 'next/image';
import correctSVG from '@/public/correct.svg';
import incorrectSVG from '@/public/incorrect.svg';
import editSVG from '@/public/editSVG.svg';

interface QuestionResponse {
  questions: Question[]
}

// { props: {questions: [ { q1 }, { q2 }, { q3 } ] } }

export default function QuestionArea ( { questions }: QuestionResponse ) {

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

  const handleEdit = () => {
    console.log('Clicked EDIT!');
  };

  return (
    <div>
      <Accordion defaultActiveKey="1">
      {questions.map(question => {
        return (
          <Accordion.Item key={question.id} eventKey={`${question.number}`}>
            <Accordion.Header>
              {`${question.number}. ${question.prompt}`}
            </Accordion.Header>
            <Accordion.Body>
              {question.choices.map(choice => {
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
              <button onClick={handleEdit} className={`${styles.hide} editButton btn btn-primary`}>Edit Question</button>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
      </Accordion>
    </div>
  );
}
