import PatientForm from "../shared/PatientForm"
import { createPatient, getSelectedPatients } from "../../api/patients"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import messages from "../shared/AutoDismissAlert/messages"
import HandlePatientsForm from "../shared/HandlePatientsForm"
import { Link } from 'react-router-dom';

const HandlePatient = (props) => {
    // console.log('these are the props in NewPatient', props)
    const { msgAlert, user } = props
    const [selectedPatients, setSelectedPatients] = useState([])
    const navigate = useNavigate()
    const [patientData, setPatientData] = useState({ 
        maxAge: '',
        minAge: '',
        bloodTypes: [],  
        currCon: [], 
    })
   
    // console.log('this is patient in CreatePatient', patient)

    const handleChange = (e) => {
        setPatientData(prevPatient => {
            let value = e.target.value
            const name = e.target.name

            const updatedPatientData = {
                [name]: value
            }

            return {
                ...prevPatient,
                ...updatedPatientData
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('info was submitted', patientData)
        const {data} = await getSelectedPatients(user, patientData)
        navigate('/market-board', { state: { data } });
        // setSelectedPatients(data)
        //navigate(`/market-board`, { state: { data: data } }) // <=== need pass data to component  in path market-board
    }

        return (
            <HandlePatientsForm 
                    patient={patientData}
                    heading="Select patients data"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    msgAlert={msgAlert}
                />
        )

}

export default HandlePatient