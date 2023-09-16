import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import PatientAccountModal from "../patients/PatientAccountModal";
import PatientAccountDetailsModal from "../patients/PatientAccountDetailsModal";
import { getTokenBalance } from "../../utils/web3";
import { FaRegSun } from "react-icons/fa";
// import { PangeaConfig, EmbargoService, PangeaErrors } from "pangea-node-sdk";
import axios from "axios";
import { cipherParse, decryptWithPrivateKey, sign } from "../../utils/crypto";
import { getPatientData } from "../../api/patients";
import PatientData from "../patients/PatientData";



const PatientPageForm = (props) => {
//     const token = "pts_3iddp33e5a4mmxbs2bw6g6zxirj3aflu" //process.env.PANGEA_EMBARGO_TOKEN;
// const config = new PangeaConfig({ domain: "aws.us.pangea.cloud" }) //process.env.PANGEA_DOMAIN });
// const embargo = new EmbargoService(token, config);
  const { patient, heading, handleChange, handleSubmit, msgAlert, account } = props;
  const [newAccountModalShow, setNewAccountModalShow] = useState(false);
  const [accountDetailsModalShow, setAccountDetailsModalShow] = useState(false);
  const [patientAccount, setPatientAccount] = useState(patient.account);
  const [balance, setBalance] = useState(0);
  const [balance1, setBalance1] = useState(0);
  const [patientData, setPatientData] = useState(null)
  const [ip, setIP] = useState("");
  const [error, setError] = useState(null)
  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: ""
  });
 
  useEffect(() => {
    if (account.address) {
      (async () => {
        const bal = await getTokenBalance(account.address);
        const bal1 = await getTokenBalance(
          "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );
        const res = await axios.get("https://ipapi.co/json/");
        console.log("🚀 ~ file: PatientPageForm.js:41 ~ res:", res)
        let data = res.data;
        setState({
            ...state,
            ip:   data.ip, // "213.24.238.26", //
            countryName: data.country_name,
            countryCode: data.country_calling_code,
            city: data.city,
            timezone: data.timezone
          });
    // console.log(res.data);
    // setIP(res.data.ip);
//     const ip = "213.24.238.26";
//   console.log("Checking Embargo IP : '%s'", ip);

//   try {
//     const response = await embargo.ipCheck(ip);
//     console.log("Response: ", response.result);
//   } catch (e) {
//     if (e instanceof PangeaErrors.APIError) {
//       console.log("Error", e.summary, e.errors);
//     } else {
//       console.log("Error: ", e);
//     }
//   }
        setBalance1(bal1);
        setBalance(bal);
      })();
    }
  }, [account]);

  const handlePatientData = async () => {
    const signedHash = sign(state.ip, account.privateKey)
  
    const res = await getPatientData(signedHash, state.ip)
    if(res.error) {
      setError(res.error)
    } else {

      console.log("🚀 ~ file: PatientPageForm.js:80 ~ handlePatientData ~ res:", res)
      console.log("🚀 ~ file: PatientPageForm.js:78 ~ handlePatientData ~ res:", res.data.cypher)
      const parsedCipher = cipherParse(res.data.cypher)
      const decodedPatientData = await decryptWithPrivateKey(account.privateKey, parsedCipher)
      setPatientData({...decodedPatientData.patient})
    }
}

  return (
    <Container className="justify-content-center">
      <h1>{heading}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {error && <h2   style={{ 
                  color: "red"
                }}>{error}</h2>}
        {patientData && <PatientData patientData={patientData}  msgAlert={msgAlert}/>}
        
        <Form
          //onSubmit={handlePatientData}
          style={{
            width: "40%",
          }}
        >
          <Form.Group>
            <Form.Label htmlFor="account">Account</Form.Label>
            <Form.Control
              required
              type="text"
              name="account"
              value={patient.account}
              placeholder="Enter ETH account"
              onChange={handleChange}
            />
            <Button onClick={() => setNewAccountModalShow(true)}>{`${
              patient.account ? "Change" : "Generate"
            } address`}</Button>
            {patient.account ? (
              <FaRegSun
                onClick={() => setAccountDetailsModalShow(true)}
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "red"
                }}
              />
            ) : (
              <></>
            )}

            <PatientAccountModal
              patient={patient}
              msgAlert={msgAlert}
              show={newAccountModalShow}
              handleClose={() => setNewAccountModalShow(false)}
              setPatientAccount={setPatientAccount}
            />
            <PatientAccountDetailsModal
              msgAlert={msgAlert}
              show={accountDetailsModalShow}
              handleClose={() => setAccountDetailsModalShow(false)}
            />
          </Form.Group>
          <Button className="my-3" variant="primary" onClick={() => handlePatientData()}>
            Get my data
          </Button>
        </Form>
        <div>
          <div>Account info</div>
          <div>balance: {balance}</div>
          <div>Total</div>
          <div>{balance1}</div>
          {/* <h2>Your IP Address is</h2>
          <h4>{ip}</h4> */}
          <p>IP: {state.ip}</p>
      <p>Country Name: {state.countryName}</p>
      <p>Country Code: {state.countryCode}</p>
      <p>City: {state.city}</p>
      <p>Timezone: {state.timezone}</p>
        </div>
      </div>
    </Container>
  );
};

export default PatientPageForm;
