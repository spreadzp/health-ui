import PatientForm from "../shared/PatientForm"
import { createPatient } from "../../api/patients"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import messages from "../shared/AutoDismissAlert/messages"
import PatientPageForm from "../shared/PatientPageForm"

const PatientPage = (props) => {
    // console.log('these are the props in NewPatient', props)
    const { msgAlert, user } = props

    const [account, setAccount] = useState({
        address: "",
        publicKey: "",
        privateKey: ""
    });
    const [emergencyContact, setEmergencyContact] = useState("");
    const [password, setPassword] = useState("");
 
    const navigate = useNavigate()
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        bloodType: '',
        emergencyContact: '',
        preCon: '',
        currCon: '',
        treatment: '',
        comments: '',
        account: ''
    })

    useEffect(() => {
        const accountUser = localStorage.getItem("userWallet");
        if (accountUser && accountUser !== "null") {
          const parsedAccount = JSON.parse(accountUser);
          setAccount(parsedAccount);
          const tmpPatient = patient;
          tmpPatient.account = parsedAccount.address
          setPatient(tmpPatient)
        }
      }, []);
    // console.log('this is patient in CreatePatient', patient)

    const handleChange = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        setPatient(prevPatient => {
            let value = e.target.value
            const name = e.target.name

            const updatedPatient = {
                [name]: value
            }

            return {
                ...prevPatient,
                ...updatedPatient
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log('info was submitted', patient)
        createPatient(user, patient)
            .then(res => navigate(`/patients/${res.data.patient._id}`))
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.createPatientSuccess,
                    variant: 'success'
                })
            })
            .catch((err) => {
                console.log(err)
                msgAlert({
                    heading: 'Warning',
                    message: messages.createPatientFailure,
                    variant: 'danger'
                })
            })
        }

        return (
                <PatientPageForm 
                    account={account}
                    patient={patient}
                    heading="Patient page"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    msgAlert={msgAlert}
                />
        )

}

export default PatientPage