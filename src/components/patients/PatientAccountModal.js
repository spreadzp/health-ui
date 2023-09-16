import React, { useEffect, useState } from "react";
 
import messages from "../shared/AutoDismissAlert/messages";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  createAccountFromPrivateKey,
  createHashForPrivateKeyFromString,
  createIdentity,
  createPrivateKeyFromHash,
  fromStringToHash,
} from "../../utils/crypto";
import { Modal } from "react-bootstrap";

const PatientAccountModal = (props) => {
 
  const { patient, show, handleClose, msgAlert, setPatientAccount  } =
  props;
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [password, setPassword] = useState("");

  //const navigate = useNavigate();

  // handleChange = (event) =>
  // 	this.setState({
  // 		[event.target.name]: event.target.value,
  // 	})

  const generateAddress = (event) => {
    event.preventDefault();
    // console.log('the props', props)
  

    // const credentials = { email, password };
    const seed = `${emergencyContact}, ${password}`;
 
    const identity = createIdentity(seed)
    console.log("🚀 ~ file: PatientAccountModal.js:40 ~ generateAddress ~ identity:", identity)
    // const hashForPrivateKey = createHashForPrivateKeyFromString(seed);
    // console.log("🚀 ~ file: PatientAccountModal.js:37 ~ generateAddress ~ seed:", seed)
    // const wallet = createPrivateKeyFromHash(hashForPrivateKey);
    // const account = createAccountFromPrivateKey(wallet);
    patient.account = identity.address
    setPatientAccount(identity.address)
    localStorage.setItem(
      "userWallet",
      JSON.stringify({
        address: identity.address,
        privateKey: identity.privateKey,
        publicKey: identity.publicKey,
      })
    );
    setAddress(identity.address);
    msgAlert({
      heading: 'Oh Yeah!',
      message: 'Great! Here\'s get patient address!',
      variant: 'success'
  }) 
}

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header style={{ background: "lightBlue"}} closeButton />
      <Modal.Body style={{ background: "grey"}}>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Account</h3>
            
              <div>
                <div>{address !== "" ? 'Create own' : 'Change current'}  address</div>
                <div>
                  <Form.Group controlId="emergencyContact">
                    <Form.Label>Emergency Contact</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name='emergencyContact'
                      value={emergencyContact}
                      placeholder="Enter patient emergencyContact"
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      name="password"
                      value={password}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    className="my-2"
                    variant="primary"
                    onClick={(e) => generateAddress(e)}
                  >
                    Generate Account
                  </Button>
                </div>
              </div>
            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PatientAccountModal;
