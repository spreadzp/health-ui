import PatientForm from "../shared/PatientForm";
import { createPatient, getSelectedPatients } from "../../api/patients";
import { Form, useLocation, useNavigate, useParams, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import messages from "../shared/AutoDismissAlert/messages";
import HandlePatientsForm from "../shared/HandlePatientsForm";
import { Button, Container, Row } from "react-bootstrap";
import { createPaymentToPatients } from "../../utils/web3";
import { createResearch } from "../../api/research";

const Board = (props) => {
  // console.log('these are the props in NewPatient', props)
  const navigate = useNavigate() 
  const { msgAlert, user } = props; 
//   const { data } = useParams();
//   console.log("🚀 ~ file: board.js:15 ~ Board ~ data:", data);
  const location = useLocation(); 
  const [selectedPatients, setSelectedPatients] = useState(location.state.data);
  const patientsWithAddress = selectedPatients.filter(item => item.account)
  const numberAddresses = patientsWithAddress.length
  const [study, setStudy] = useState({
    name: "",
    tokenAddress: "",
    numberPatients: selectedPatients.length,
    numberAddresses: numberAddresses,
    patientAddresses: patientsWithAddress.map(item => item.account),
    sumForStudy: 0,
    sumToOneAddress: 0,
    transaction: ""
  });

  //  const navigate = useNavigate()
  const [patientData, setPatientData] = useState({
    maxAge: "",
    minAge: "",
    bloodTypes: [],
    currCon: [],
  });

  useEffect(() => {
const s = study

    s.sumToOneAddress = numberAddresses !== 0 ? study.sumForStudy / numberAddresses: 0
    setStudy(s)
  }, [study.sumForStudy]);
  // console.log('this is patient in CreatePatient', patient)

  const handleChange = (e) => {
    setStudy((prevPatient) => {
      let value = e.target.value;
      const name = e.target.name;

      const updatedPatientData = {
        [name]: value,
      };

      return {
        ...prevPatient,
        ...updatedPatientData,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("info was submitted study", study);
    const tx = await createPaymentToPatients(study.patientAddresses, study.sumForStudy)
    if(tx) {
        const updatedStudy = study;
        updatedStudy.transaction = tx;
        updatedStudy.idPatients = patientsWithAddress.map(item => item._id)
        setStudy(updatedStudy)
        const res = await createResearch(user, updatedStudy)
        console.log("🚀 ~ file: board.js:73 ~ handleSubmit ~ res:", res)
        if(res.data.research._id) {
            msgAlert({
                            heading: 'Success',
                            message: messages.createResearchSuccess,
                            variant: 'success'
                        })

        }
        navigate(`/`)
    }
  

    //navigate(`/patients/`)
    // const { data } = await getSelectedPatients(user, patientData);
    // console.log("🚀 ~ file: HandlePatient.js:41 ~ handleSubmit ~ data:", data);
    // createPatient(user, patientData)
    //     .then(res => navigate(`/patients/${res.data.patient._id}`))
    //     .then(() => {
    //         msgAlert({
    //             heading: 'Success',
    //             message: messages.createPatientSuccess,
    //             variant: 'success'
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //         msgAlert({
    //             heading: 'Warning',
    //             message: messages.createPatientFailure,
    //             variant: 'danger'
    //         })
    //     })
  };

  return (
    <Container
      className="justify-content-center"
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          width: "40%",
        }}
      >
        {selectedPatients && selectedPatients.length > 0 ? (
          selectedPatients.map((patient, ind) => {
            return (
              <Row className="justify-content-center" key={ind}>
                <hr />
                <div>Name: {patient.name}</div>
                <div>ETH address: {patient.account}</div>
                <div>Age: {patient.age}</div>
                <div>Blood Type: {patient.bloodType}</div>
                <div>Current condition: {patient.currCon}</div>
                <br />
              </Row>
            );
          })
        ) : (
          <h2>No patients for selected values</h2>
        )}
      </div>
      <div
        style={{
          width: "100%",
          marginLeft: "10px",
        }}
      >

<Row className="justify-content-center" >
                <hr />
                <div>Name: {study.name}</div>
                <div>Token ETH address: {study.tokenAddress}</div>
                <div>numberPatients: {selectedPatients.length}</div> 
                <div>numberAddresses: {study.numberAddresses}</div>
                <div>sumForStudy: {study.sumForStudy}</div>
                <div>sumToOneAddress: {study.sumToOneAddress}</div>
                <br />
              </Row>
               <form onSubmit={handleSubmit}>
                <label htmlFor="name">Title of medical study
                <input type="text" name="name" value={study.name}
              placeholder="Enter study name"
              onChange={handleChange}/>
              </label>
              <hr/>
              <label htmlFor="sumForStudy">Total sum in tokens for study
                <input  type="number"
              name="sumForStudy"
              value={study.sumForStudy}
              placeholder="Enter sum"
              onChange={handleChange}/>
              </label>
              <Button type="submit" style={{
                cursor: "pointer"
              }} >Create payment for the study</Button>
               </form>
        {/* <Form   onChange={(event) => {
        submit(event.currentTarget);
      }}> */}
          {/* <Form.Group>
            <Form.Label htmlFor="study">Title of medical study</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={study.name}
              placeholder="Enter study name"
              onChange={handleChange}
            />  
             <Form.Label htmlFor="tokenAddress">Token address</Form.Label>
            <Form.Control
              required
              type="text"
              name="tokenAddress"
              value={study.tokenAddress}
              placeholder="Enter token address"
              onChange={handleChange}
            />
            <Form.Label htmlFor="numberPatients">
              Number of ETH addresses of patients
            </Form.Label>
            <Form.Control
              required
              type="number"
              name="numberPatients"
              value={0}
              placeholder="Enter number of ETH addresses"
              onChange={handleChange}
            />
            <Form.Label htmlFor="sumForStudy">
              Total sum in tokens for study
            </Form.Label>
            <Form.Control
              required
              type="number"
              name="sumForStudy"
              value={study.sumForStudy}
              placeholder="Enter sum"
              onChange={handleChange}
            />
          </Form.Group>
          <Button className='my-3' variant='primary' type='submit'>
                    Submit
                </Button>
         */}
      </div>
    </Container>
  );
};

export default Board;
