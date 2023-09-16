import React, { useState } from "react";
import { Table, Modal, Card, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NewPatient from "../patients/NewPatient";
const doctors = [
  {
    avatar: "asdfsda",
    name: "sadfasdf",
    graduate: "zxfsd",
    rating: "3",
    specialization: "sdfd",
    rate: "34",
    doctorPubKey: "0x123"
  },
  {
    avatar: "sdfd",
    name: "",
    graduate: "",
    rating: "",
    specialization: "",
    rate: "",
    doctorPubKey: "0x123"
  },
  {
    avatar: "",
    name: "",
    graduate: "",
    rating: "",
    specialization: "",
    rate: "",
    doctorPubKey: "0x123"
  },
];
const MedicalBoard = (props) => {
  const {msgAlert} = props
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showSendDataModal, setShowSendDataModal] = useState(false);
  const [showAskDoctorModal, setShowAskDoctorModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const handleSendDataClick = () => {
    setShowSendDataModal(true);
  };

  const handleAskDoctorClick = () => {
    setShowAskDoctorModal(true);
  };
  const handleSendMessage = () => {
    console.log("Sending message:", message);

    // Clear the message input
    setMessage("");

    // Close the modal
    setShowAskDoctorModal(false);
  };

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Graduate</th>
            <th>Rating</th>
            <th>Specialization</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {doctors &&
            doctors.map((doctor, index) => (
              <tr key={index} onClick={() => handleDoctorClick(doctor)}>
                <td>{doctor.avatar}</td>
                <td>{doctor.name}</td>
                <td>{doctor.graduate}</td>
                <td>{doctor.rating}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.rate}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={showDoctorModal} onHide={() => setShowDoctorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{selectedDoctor?.name}</Card.Title>
              <Card.Text>
                Graduate: {selectedDoctor?.graduate}
                <br />
                Rating: {selectedDoctor?.rating}
                <br />
                Specialization: {selectedDoctor?.specialization}
                <br />
                Rate: {selectedDoctor?.rate}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={handleSendDataClick}>Send My Data</Button>
              <Button onClick={handleAskDoctorClick}>Ask Doctor</Button>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSendDataModal}
        onHide={() => setShowSendDataModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send My Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <NewPatient  msgAlert={msgAlert} doctorPubKey={selectedDoctor.doctorPubKey} />
        </Modal.Body>
      </Modal>

      <Modal
        show={showAskDoctorModal}
        onHide={() => setShowAskDoctorModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ask Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{selectedDoctor?.name}</Card.Title>
              <Card.Text>
                Graduate: {selectedDoctor?.graduate}
                <br />
                Rating: {selectedDoctor?.rating}
                <br />
                Specialization: {selectedDoctor?.specialization}
                <br />
                Rate: {selectedDoctor?.rate}
              </Card.Text>
            </Card.Body>
          </Card>

          <Form>
            <Form.Group controlId="messageTextArea">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your message here..."
                value={message} // Bind the input value to the message state
                onChange={(e) => setMessage(e.target.value)} // Update the message state on input change
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAskDoctorModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MedicalBoard;
