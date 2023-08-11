import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
}

export default function CreateQuestionModal( {show, handleClose}: ModalProps) {
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
  );
}
