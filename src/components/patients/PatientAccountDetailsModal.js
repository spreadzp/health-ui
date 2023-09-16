import React, { useEffect, useState } from "react";
import { FaRegCopy } from 'react-icons/fa'; 

import Form from "react-bootstrap/Form";
 
import { Modal } from "react-bootstrap";

const PatientAccountDetailsModal = (props) => {
 
  const {  show, handleClose, msgAlert,  } =
  props;
  const [address, setAddress] = useState(""); 
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  function useCopyToClipboard() {
    const [result, setResult] = useState("");
  
    const copy = async (text ) => {
      try {
        await navigator.clipboard.writeText(text);
        setResult({ state: 'success' });
      } catch (e) {
        setResult({ state: 'error', message: e.message });
        throw e;
      } finally {
        // 👇 Show the result feedback for 2 seconds
        setTimeout(() => {
          setResult(null);
        }, 2000);
      }
    };
 
    return [copy, result] ;
  }
  const [copyToClipboard, copyResult] = useCopyToClipboard();
 

  useEffect(() => {
    const accountUser = localStorage.getItem("userWallet");
    if (accountUser && accountUser !== "null") {
      const parsedAccount = JSON.parse(accountUser);
      setAddress(parsedAccount.address); 
      setPublicKey(parsedAccount.publicKey)
      setPrivateKey(parsedAccount.privateKey)
    }
  }, []);
 
const handleClickCopy = (inputText, tag) => {
    // Copy the text from the input field into the clipboard
    copyToClipboard(inputText);
        msgAlert({
      heading: 'Oh Yeah!',
      message: `Great! ${tag} copied successfully`,
      variant: 'success'
  }) 
  };
  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header style={{ background: "lightBlue"}} closeButton />
      <Modal.Body style={{ background: "grey"}}>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Account</h3> 
              <div> 
                <div>
                <hr/>
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <FaRegCopy onClick={() => handleClickCopy(address, 'Address')} style={{
                        marginLeft: "10px",
                        cursor: "pointer"
                    }}/> 
                    <Form.Control
                      required
                      type="text"
                      name='address'
                      value={address} 
                    />
                    
                    <hr/>
                  </Form.Group>
                  <Form.Group controlId="privateKey">
                    <Form.Label>Private key</Form.Label>
                    <FaRegCopy onClick={() => handleClickCopy(privateKey, 'Private key')} style={{
                        marginLeft: "10px",
                        cursor: "pointer"
                    }}/> 
                    <Form.Control
                      required
                      name="privateKey"
                      value={privateKey} 
                    />
                   
                  </Form.Group>
                  <hr/>
                  <Form.Group controlId="publicKey">
                    <Form.Label>Public Key</Form.Label>
                    <FaRegCopy onClick={() => handleClickCopy(publicKey, 'Public Key')} style={{
                        marginLeft: "10px",
                        cursor: "pointer"
                    }}/>
                    <Form.Control
                      required
                      name="publicKey"
                      value={publicKey} 
                    /> 
                    
                  </Form.Group> 
                </div>
              </div>
            
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PatientAccountDetailsModal;
