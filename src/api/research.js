import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllResearches = (user) => {
    return axios({
		url: apiUrl + '/researches',
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// READ => Selected
export const getSelectedResearches = (user, selected) => {
    const urlParams = `?bloodTypes=${selected.bloodTypes.join(',')}&currCon=${selected.currCon}&minAge=${selected.minAge}&maxAge=${selected.maxAge}`
    return axios({
		url: apiUrl + '/researches/selected' + urlParams,
		method: 'GET',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}

// READ => SHOW
export const getOneResearch = (user, id) => {
    // return axios(`${apiUrl}/researches/${id}`)
    return axios({
        url: `${apiUrl}/researches/${id}`,
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

// CREATE research
export const createResearch = (user, newResearch) => {
    // console.log('this is the data being sent in the axios post request', newResearch)
    return axios({
        url: apiUrl + '/researches',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            research: newResearch
        },
    })
}

// PATCH research
export const updateResearch = (user, updatedResearch) => { 
    return axios({
        url: `${apiUrl}/researches/${updatedResearch._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {
            research: updatedResearch
        },
    })
}

// PATCH for attend research
export const attendResearch = (user, research) => {
    return axios({
        url: `${apiUrl}/researches/${research._id}/attend`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

// DELETE research
export const deleteResearch = (user, researchId) => {
    return axios({
        url: `${apiUrl}/researches/${researchId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}