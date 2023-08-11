import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuestionArea from "../components/QuestionArea";
import { Question } from "@/models/Question";
import styles from "@/styles/exam.module.css";
import Image from "next/image";
import menu from "@/public/menu.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface QuestionResponse {
  questions: Question[];
}

export default function ExamPage () {
  const router = useRouter();
  const { id } = router.query;
  const [questionRes, setQuestionRes] = useState<QuestionResponse | null>(null)
  const [title, setTitle] = useState<string | null>(null);
  
  const [show, setShow] = useState(false);

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

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const currentExamId = Number(event.target.value);
    //refreshExam(currentExamId);
    router.push(`/exam/${currentExamId}`);
  }

  const handleNewQuestion = () => {
    handleShow();
  }

  return (
    <div>
      <div className={styles.examHeading}>
        {/*<button className={styles.menuButton}><Image src={menu} alt='menu-icon'></Image></button>*/}
        <DropdownButton variant='light' title={<Image src={menu} alt='menu-icon'></Image>}>
          <Dropdown.Item className={styles.menuItem} onClick={handleNewQuestion}>Create Question</Dropdown.Item>
          <Dropdown.Item className={styles.menuItem}>Delete Exam</Dropdown.Item>
        </DropdownButton>
        <h1>{title && title}</h1>
        <div className={styles.placeHolder}></div>
      </div>
      <hr />

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
                as="textarea"
                rows={2}
                autoFocus
              />
            </Form.Group>
            <br />
            <hr />

            <Form.Group>
              <Form.Label>Choice A</Form.Label>
              <Form.Control type="text" />

              <Form.Label>Choice B</Form.Label>
              <Form.Control type="text" />

              <Form.Label>Choice C</Form.Label>
              <Form.Control type="text" />

              <Form.Label>Choice D</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <br />
            <hr />
            <Form.Label>Answer</Form.Label>
            <Form.Group>
              <Form.Check name="answer" required inline label="A" type='radio' />
              <Form.Check name="answer" required inline label="B" type='radio' />
              <Form.Check name="answer" required inline label="C" type='radio' />
              <Form.Check name="answer" required inline label="D" type='radio' />
            </Form.Group>
            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>

      {questionRes !== null && <QuestionArea questions={ questionRes.questions }></QuestionArea>}
    </div>
  );
} 