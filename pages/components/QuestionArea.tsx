import { Question } from '@/models/Question'
import styles from '@/pages/components/QuestionArea.module.css';
import { MouseEvent } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Choice from '@/models/Choice';

interface QuestionResponse {
  questions: Question[]
}

// { props: {questions: [ { q1 }, { q2 }, { q3 } ] } }

export default function QuestionArea ( { questions }: QuestionResponse ) {

  const handleClick = function (event: MouseEvent<HTMLParagraphElement>, choice: Choice) {
    event.preventDefault();
    const { correct } = choice;
    const target = event.target as HTMLParagraphElement;
    if (target.tagName === 'P') {
      target.firstElementChild!.classList.toggle(styles.correct);
    } else if (target.tagName === 'SPAN') {
      target.classList.toggle(styles.correct);
    }
  }

  return (
    <div>

      <Accordion>
      {questions.map(question => {
        return (
          <Accordion.Item key={question.id} eventKey={`${question.number}`}>
            <Accordion.Header>{`${question.number}. ${question.prompt}`}</Accordion.Header>
            <Accordion.Body>
              {question.choices.map(choice => {
                return (
                  <p 
                    className={styles.choice}
                    key={choice.id}
                    onClick={(e) => handleClick(e, choice)}
                  >{choice.statement}
                    <span className={styles.correct}>{choice.correct ? "correct" : "incorrect"}</span>
                  </p>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>

        );
      })}

      {/*
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

      {questions.map(question => {
        return (
            <div 
              key={`${question.id}`}
              className={styles.sideQuestion}
            >
              <span className={styles.bigNumber}>{question.number}</span>
            {question.prompt}
              <button type="button" className="btn btn-primary" onClick={handleClick}>View</button>
            </div>
        )
      })}
    */}
    </Accordion>
    </div>
  );
}