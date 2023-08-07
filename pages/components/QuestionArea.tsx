import { Question } from '@/models/Question'
import styles from '@/pages/components/QuestionArea.module.css';

interface QuestionResponse {
  questions: Question[]
}

// { props: {questions: [ { q1 }, { q2 }, { q3 } ] } }

export default function QuestionArea ( { questions }: QuestionResponse ) {
  return (
    <div>
      <h1>Question Area</h1>
      {questions.map(question => {
        return (
            <div 
              key={`${question.id}`}
              className={styles.sideQuestion}
            >
              <span className={styles.bigNumber}>{question.number}</span>
            {question.prompt}
            </div>
        )
      })}
    </div>
  );
}