import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Question } from '@/models/Question';
import updateQuestionChoices from '@/controllers/updateQuestionChoices';
import { useRouter } from 'next/router';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  refreshExam: (examId: string) => void;
  questionToEdit: Question;
}

export default function EditQuestionModal( {show, handleClose, refreshExam, questionToEdit}: ModalProps) {
  const router = useRouter();
  const examId = router.query.id;
  //console.log(examId);
  //console.log(questionToEdit);

  const [question, setQuestion] = useState<string | null>(null);
  const [choiceA, setChoiceA] = useState<string | null>(null);
  const [choiceB, setChoiceB] = useState<string | null>(null);
  const [choiceC, setChoiceC] = useState<string | null>(null);
  const [choiceD, setChoiceD] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  
  const handleAddQuestion = async() => {
    // if anything is null, then we know it didn't change.
    console.log([question, choiceA, choiceB, choiceC, choiceD, answer]);
    
    // but if it's not null, then we know it changed
    // if they are saving it, then they must always re-confirm the answer.
    if (answer === null) {
      alert('Please confirm the answer choice');
    }

    // Take the question and put it in the correct structure
    const questionArgument = { prompt: question }

    // Take the choices and put it in the correct structure. For this, we need all the choices
    const choicesArray: any = [choiceA, choiceB, choiceC, choiceD]
    const choicesArgument = questionToEdit.choices.map((choice, index) => {

      const isCorrect = (idx: number) => {
        return idx === Number(answer)
      };

      if (choicesArray[index] === null) {
        isCorrect(index) ? choice.correct = true : choice.correct = false;
        return choice;
      } else {
        isCorrect(index) ? choice.correct = true : choice.correct = false;
        choice.statement = choicesArray[index];
        return choice;
      }
    });

    const questionId = questionToEdit.id;
    
    await updateQuestionChoices( Number(examId), questionId, questionArgument, choicesArgument );
    handleClose();
    refreshExam(String(examId));
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Question</Form.Label>
              <Form.Control
                onChange={(e) => {setQuestion(e.target.value); console.log(e.target.value)}}
                as="textarea"
                rows={2}
                autoFocus
                required
                defaultValue={questionToEdit ? questionToEdit.prompt : ''}
              />
            </Form.Group>

            <br />
            <hr />

            <Form.Group>
              <Form.Label>Choice A</Form.Label>
              <Form.Control required defaultValue={questionToEdit ? questionToEdit.choices[0].statement : ''} type="text" onChange={(e) => {setChoiceA(e.target.value); console.log(e.target.value)}}/>

              <Form.Label>Choice B</Form.Label>
              <Form.Control required defaultValue={questionToEdit ? questionToEdit.choices[1].statement : ''} type="text" onChange={(e) => {setChoiceB(e.target.value)}}/>

              <Form.Label>Choice C</Form.Label>
              <Form.Control required defaultValue={questionToEdit ? questionToEdit.choices[2].statement : ''} type="text" onChange={(e) => {setChoiceC(e.target.value)}}/>

              <Form.Label>Choice D</Form.Label>
              <Form.Control required defaultValue={questionToEdit ? questionToEdit.choices[3].statement : ''} type="text" onChange={(e) => {setChoiceD(e.target.value)}}/>
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
