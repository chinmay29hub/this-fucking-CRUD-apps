import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';

export default function Quiz() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center w-100">
        <Card className="mx-3 mx-md-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Quiz Application</Card.Title>
              <div className="text-center">
                <Button className='btn'>
                  Start Quiz
                </Button>
                <Button className='btn'>
                  Start Quiz
                </Button>
              </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
