import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/Main.css"

export default function Main() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center w-100">
        <Card className="mx-3 mx-md-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Quiz Application</Card.Title>

            <ListGroup as="ol" style={{ cursor : "pointer" }} numbered className="mb-4">
              <ListGroup.Item action variant="success" as="li">
                There are 10 questions in this Quiz.
              </ListGroup.Item>
              <ListGroup.Item action variant="success" as="li">
                10 points for each correct answer.
              </ListGroup.Item>
              <ListGroup.Item action variant="success" as="li">
                Each question has three options. You need to choose only one option.
              </ListGroup.Item>
              <ListGroup.Item action variant="success" as="li">
                You can review previously answered questions and change it.
              </ListGroup.Item>
              <ListGroup.Item action variant="success" as="li">
                The result will be displayed once you submit the quiz.
              </ListGroup.Item>
            </ListGroup>

            <form id="form">
              <InputGroup size="lg" className="mb-4">
                <Form.Control
                  ref={inputRef}
                  placeholder="Username"
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>

              <div className="text-center">
                <Button className='btn' onClick={() => navigate('/quiz')}>
                  Start Quiz
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
