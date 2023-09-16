import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Modal } from 'react-bootstrap'
import AccountModal from '../patients/AccountModal'
import { useEffect, useState } from 'react'

const PatientForm = (props) => {
    const { patient, heading, handleChange, handleSubmit, msgAlert } = props
    const [newAccountModalShow, setNewAccountModalShow] = useState(false)
    const [patientAccount, setPatientAccount] = useState(patient.account)
 useEffect(() => {
    if( patient.account !== patientAccount) {
        patient.account = patientAccount
    }
 }, [patientAccount]);
 
    return (
        <Container className='justify-content-center'>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='name'>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='name'
                        value={patient.name}
                        placeholder='Enter name'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='age'>Age</Form.Label>
                    <Form.Control
                        required
                        name='age'
                        value={patient.age}
                        type='number'
                        placeholder='Enter age'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='bloodType'>Blood Type</Form.Label>
                    <Form.Select
                        required
                        name='bloodType'
                        defaultValue={patient.bloodType}
                        onChange={handleChange}
                    >
                        <option>Choose Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </Form.Select>
                    <Form.Label htmlFor='emergencyContact'>Emergency Contact Tel.</Form.Label>
                    <Form.Control
                        name='emergencyContact'
                        value={patient.emergencyContact}
                        type='text'
                        placeholder='Enter telephone number'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='preCon'>Pre-existing Conditions</Form.Label>
                    <Form.Control
                        name='preCon'
                        value={patient.preCon}
                        type='text'
                        placeholder='Describe any conditions'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='currCon'>Current Condition</Form.Label>
                    <Form.Select
                        required
                        name='currCon'
                        value={patient.currCon}
                        onChange={handleChange}
                    >
                        <option>Choose condition</option>
                        <option value="stable">stable</option>
                        <option value="serious">serious</option>
                        <option value="critical">critical</option>
                    </Form.Select>
                    <Form.Label htmlFor='account'>Account</Form.Label>
                  <Form.Control
                        required
                        type='text'
                        name='account'
                        value={patient.account}
                        placeholder='Enter ETH account'
                        onChange={handleChange}
                    />  
                    <Button onClick={() => setNewAccountModalShow(true)}>{`${patient.account ? 'Change': 'Generate'} address`}</Button>
                    <AccountModal
                        patient={patient} 
                        msgAlert={msgAlert}
                        show={newAccountModalShow}
                        handleClose={() => setNewAccountModalShow(false)} 
                        setPatientAccount={setPatientAccount}
                    />
                    {/* <Form.Label htmlFor='treatment'>Treatment</Form.Label>
                    <Form.Control
                        name='treatment'
                        value={patient.treatment}
                        type='text'
                        placeholder='Describe treatment plan'
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor='comments'>Comments</Form.Label>
                    <Form.Control
                        name='comments'
                        value={patient.comments}
                        type='text'
                        placeholder='Describe comments'
                        onChange={handleChange}
                    /> */}
                </Form.Group>
                <Button className='my-3' variant='primary' type='submit'>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default PatientForm