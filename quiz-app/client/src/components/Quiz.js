import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import Questions from './Questions';

export default function Quiz() {

  function onNext () {
    console.log("Next Button")
  }

  function onPrevious () {
    console.log("Previous Button")
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <div className="d-flex justify-content-center w-100">
        <Card className="mx-3 mx-md-auto" style={{ maxWidth: '600px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Quiz Application</Card.Title>
            <Questions />
              <div className="text-center">
                <Button className='btn' onClick={onPrevious}>
                  Previous
                </Button>
                <Button className='btn' onClick={onNext}>
                  Next
                </Button>
              </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
