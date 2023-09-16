import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// // useParams will allow us to see our parameters
// // useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'

//EXTRA THINGS TO THE SHOW PATIENT
import LoadingScreen from '../shared/LoadingScreen'
import EditPatientModal from './EditPatientModal'
import DeletePatientModal from './DeletePatientModal'
import ShowMedicine from '../medicine/ShowMedicine'
import NewMedicineModal from '../medicine/NewMedicineModal'
import { getOnePatient, attendPatient } from '../../api/patients'
import { updatePatient } from '../../api/patients'


//IMPORTING STYLES 
import imgProfile from '../../imgs/profile.jpeg' 

//FLEX GRID
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';



const PatientData = (props) => {
    //just on  Patient
    const [patient, setPatient] = useState(null) //null because dont wanna show nothing now
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [treatmentModalShow, setTreatmentModalShow] = useState(false)
    const [newMedicinesModalShow, setNewMedicinesModalShow] = useState(false)
    const [doctorList, setDoctorList] = useState([])

    
    const [updated, setUpdated] = useState(false)

    const {  msgAlert, patientData} = props
    // console.log('this is the patient in ShowPatient', patient)
    const { id } = useParams()
    const navigate = useNavigate()
    //get the i value from our route paramaters

    useEffect(() => {
       if (patientData) {
        setPatient(patientData)
        const dList = patientData.doctors.map(doctor => {
            return doctor.email
        })
        setDoctorList([...doctorList, ...dList ])
       }
       
    // eslint-disable-next-line
    }, [patientData])

    if(!patient) {
        return <LoadingScreen  />
    }

    let medCards
    if (patient) {
        // console.log('these are the medicines in patient', patient.medicines)
        if (patient.medicines && patient.medicines.length > 0) {
            medCards = patient.medicines.map(medicine => (
                <ShowMedicine
                    key={medicine._id}
                    medicine={medicine} 
                    patient={patient}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

 

  
    // console.log('params in show Patient', params)
    return (
        <>
            {/*Patient CARD  */}
            <Container>
                <div className='row'>
                    <div className='col-md-5' style={{textAlign: 'center', marginTop:10}}>
                        <Card style={{margin: 5}}>
                            <div className='div-profile-IMG'>
                                <img className='image' style={{maxWidth: '45%',margin: "5"}} src={imgProfile} alt="the patient's face"/>
                            </div>
                                
                            <Card.Header><h2 >{ patient.name }</h2></Card.Header>
                            <Card.Body>
                                <p className='p-info'>Age:</p><p>{patient.age}</p>
                                <p className='p-info'>Blood Type:</p><p>{patient.bloodType}</p>
                                <p className='p-info'>Emergency Contact:</p><p>{patient.emergencyContact}</p>
                                <p className='p-info'>Pre-existing Conditions:</p><p>{patient.preCon}</p>
                                <p className='p-info'>Current Condition:</p><p>{patient.currCon}</p>
                                <p className='p-info'>Doctors:</p><p>{doctorList}</p>
                                <p className='p-info'>Account:</p><p>{patient.account }</p>
                                
                            </Card.Body>
                            {/* <Card.Footer>
                                    <Button size='sm' className='mx-2' variant='info' onClick={() => setEditModalShow(true)}>
                                        Edit Patient
                                    </Button>
                                    <Button size='sm' className='mx-2' variant='outline-danger' onClick={() => setDeleteModalShow(true)}>
                                        Discharge Patient
                                    </Button>
                            </Card.Footer> */}
                        </Card> 
                    </div>
                    <div className='col-md-7' style={{textAlign: 'center', marginTop:10}}>
                        <Card className='cards-patient-treat treatment-card' style={{margin: 5}}>
                            {/* <div  class="col" > */}
                            <Card.Header><h4>Treatment</h4></Card.Header>
                            <Card.Body>
                                <p className='p-info'>Treatment:</p><p>{patient.treatment}</p>
                                <p className='p-info'>Comments:</p><p>{patient.comments}</p>
                                {medCards}
                            </Card.Body>
                            <Card.Footer>
                           
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </Container>

        
           
         
            
        </>
    )
}

export default PatientData