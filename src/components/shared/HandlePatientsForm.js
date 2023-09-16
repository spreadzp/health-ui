import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Modal } from 'react-bootstrap'
import AccountModal from '../patients/AccountModal'
import { useEffect, useState } from 'react'

const HandlePatientsForm = (props) => {
    const { patient, heading, handleChange, handleSubmit, msgAlert } = props
 
    const bloodTypes = ["A+","A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const [checked, setChecked] = useState({})
    

    const conditionTypes = ["stable","serious", "critical",];
    const handleChangeCb = (bloodType, ind, event) => {
        console.log("🚀 ~ file: HandlePatientsForm.js:16 ~ handleChangecb ~ event:", event)
    
        if( event.target.checked ) {
            
                patient.bloodTypes.push(bloodType)
            
        } else {
            patient.bloodTypes  = patient.bloodTypes.filter(type => type !== bloodType)
        }
       
        console.log("🚀 ~ file: HandlePatientsForm.js:12 ~ HandlePatientsForm ~ patient.bloodTypes:", patient.bloodTypes)
      }

      const handleChangeCc = (conditionType, ind, event) => {
        console.log("🚀 ~ file: HandlePatientsForm.js:16 ~ handleChangecb ~ event:", event)
    
        if( event.target.checked ) {
            
                patient.currCon.push(conditionType)
            
        } else {
            patient.currCon  = patient.currCon.filter(type => type !== conditionType)
        }
       
        console.log("🚀 ~ file: HandlePatientsForm.js:40 ~ HandlePatientsForm ~ patient.currCon:", patient.currCon)
      }
    return (
        <Container className='justify-content-center'>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                
                    <Form.Label htmlFor='maxAge'>Max Age: {patient.maxAge}</Form.Label>
                    <Form.Range
                        required
                        name='maxAge'
                        value={ patient.maxAge}
                        type='number'
                        max={100}
                        min={11}
                        placeholder='Enter age'
                        onChange={handleChange}
                    />
                     <br/>
                     <Form.Label htmlFor='minAge'>Min Age: {patient.minAge}</Form.Label>
                    <Form.Range
                        required
                        name='minAge'
                        value={ patient.minAge }
                        type='number'
                        max={patient.maxAge}
                        min={10}
                        placeholder='Enter age'
                        onChange={handleChange}
                    />
                     <br/>
                    <Form.Label htmlFor='bloodTypes'>Select blood Types: &nbsp; </Form.Label>
                    {bloodTypes.map((type, index) => {
                       return (<Form.Check
                       key={index}
                        inline
                        label={type}
                        onChange={(e) => handleChangeCb(type, index, e)} 
                        name="bloodTypes"
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-${type}`}
                        />)
                    })}  
                <br/>
                   <Form.Label htmlFor='currCon'>Select current Condition: &nbsp; </Form.Label>
                    {conditionTypes.map((type, index) => {
                       return (<Form.Check
                       key={index}
                        inline
                        label={type}
                        onChange={(e) => handleChangeCc(type, index, e)} 
                        name="currCon"
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-${type}`}
                        />)
                    })} 
                     <br/>
                {  patient.maxAge !== '' &&  patient.mixAge !== ''&& <Button className='my-3' variant='primary' type='submit'>
                    Submit
                </Button>}
            </Form>
        </Container>
    )
}

export default HandlePatientsForm