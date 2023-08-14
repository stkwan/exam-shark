import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import addQuestionChoices from '@/controllers/questionChoices';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  questionCount: number;
  examId: string;
  refreshExam: (examId: string) => void;
}

export default function CreateQuestionModal( {show, handleClose, questionCount, examId, refreshExam}: ModalProps) {
  // Get next question number
  const nextQuestionNumber = questionCount + 1;
  const [question, setQuestion] = useState<string>('');
  const [choiceA, setChoiceA] = useState<string>('');
  const [choiceB, setChoiceB] = useState<string>('');
  const [choiceC, setChoiceC] = useState<string>('');
  const [choiceD, setChoiceD] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  
  const handleAddQuestion = async() => {
    const anyBlank = [question, choiceA, choiceB, choiceC, choiceD, answer].some(input => {
      return input === null || input.length < 1;
    });
    
    if (anyBlank) {
      alert('You must complete all feilds');
      return;
    } else {
      handleClose();
    }

    const questionObject = {
      prompt: question,
      number: nextQuestionNumber
    }

    const choicesArray = [choiceA, choiceB, choiceC, choiceD].map((choice, index) => {
      if (index === Number(answer)) {
        return { statement: choice, correct: true }
      } else {
        return { statement: choice, correct: false}
      }
    });
    
    await addQuestionChoices( Number(examId), questionObject, choicesArray );
    refreshExam(examId);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Create Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Question</Form.Label>
              <Form.Control
                onChange={(e) => {setQuestion(e.target.value)}}
                as="textarea"
                rows={2}
                autoFocus
                required
              />
            </Form.Group>

            <br />
            <hr />

            <Form.Group>
              <Form.Label>Choice A</Form.Label>
              <Form.Control required type="text" onChange={(e) => {setChoiceA(e.target.value)}}/>

              <Form.Label>Choice B</Form.Label>
              <Form.Control required type="text" onChange={(e) => {setChoiceB(e.target.value)}}/>

              <Form.Label>Choice C</Form.Label>
              <Form.Control required type="text" onChange={(e) => {setChoiceC(e.target.value)}}/>

              <Form.Label>Choice D</Form.Label>
              <Form.Control required type="text" onChange={(e) => {setChoiceD(e.target.value)}}/>
            </Form.Group>

            <br />
            <hr />

            <Form.Label>Answer</Form.Label>
            <Form.Group>
              <Form.Check onChange={(e) => setAnswer(e.target.value)} value={0} name="answer" required inline label="A" type='radio' />
              <Form.Check onChange={(e) => setAnswer(e.target.value)} value={1} name="answer" required inline label="B" type='radio' />
              <Form.Check onChange={(e) => setAnswer(e.target.value)} value={2} name="answer" required inline label="C" type='radio' />
              <Form.Check onChange={(e) => setAnswer(e.target.value)} value={3} name="answer" required inline label="D" type='radio' />
            </Form.Group>

          </Form>  
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            Save
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}
