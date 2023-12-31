import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllPatients = (user) => {
    return axios({
		url: apiUrl + '/patients',
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// READ => Selected
export const getSelectedPatients = (user, selected) => {
    const urlParams = `?bloodTypes=${selected.bloodTypes.join(',')}&currCon=${selected.currCon}&minAge=${selected.minAge}&maxAge=${selected.maxAge}`
    return axios({
		url: apiUrl + '/patients/selected' + urlParams,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}


// READ => Selected
export const getPatientData = (signature,  message) => { 
        return axios({
            url: apiUrl + '/patients/data',
            method: 'POST',
            data: {
                signature: signature,
                message: message
            },
        }).catch(err => {
             console.log("🚀 ~ file: patients.js:38 ~ getPatientData ~ err:", err)
             
                return {error: 'Access Forbidden: You do not have permission to access this resource from current country.'};
              
        }) 
     
}
// READ => SHOW
export const getOnePatient = (user, id) => {
    // return axios(`${apiUrl}/patients/${id}`)
    return axios({
        url: `${apiUrl}/patients/${id}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// // READ => SHOW
// export const getOnePatient = (id) => {
//     return axios(`${apiUrl}/patients/${id}`)
//     // return axios({
//     //     url: apiUrl + `/patients/${id}`,
//     //     method: 'GET',
//     //     headers: {
//     //         Authorization: `Token token=${user.token}`
//     //     }
    
//     // })
// }

// CREATE patient
export const createPatient = (user, newPatient) => {
    // console.log('this is the data being sent in the axios post request', newPatient)
    return axios({
        url: apiUrl + '/patients',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            patient: newPatient
        },
    })
}

// PATCH patient
export const updatePatient = (user, updatedPatient) => { 
    return axios({
        url: `${apiUrl}/patients/${updatedPatient._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            patient: updatedPatient
        },
    })
}

// PATCH for attend patient
export const attendPatient = (user, patient) => {
    return axios({
        url: `${apiUrl}/patients/${patient._id}/attend`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// DELETE patient
export const deletePatient = (user, patientId) => {
    return axios({
        url: `${apiUrl}/patients/${patientId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}