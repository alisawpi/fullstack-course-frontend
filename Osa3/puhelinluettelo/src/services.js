/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'; 

const baseurl = '/api/persons'; 

const getAll = () => {
const req = axios.get(baseurl)
return req.then(res => res.data)
}

const createNewPerson = (newPerson) => {
const req = axios.post(baseurl, newPerson)
return req.then(res => res.data)
}

const deletePerson = (id) => {
    console.log(`${baseurl}/${id}`)
    const req = axios.delete(`${baseurl}/${id}`)
    return req.then()
}

const updatePerson = (id, newPerson) => {
    console.log(newPerson)
    const req = axios.put(`${baseurl}/${id}`, newPerson)
    return req.then(res => res.data)
}

export default {getAll, createNewPerson, deletePerson, updatePerson};