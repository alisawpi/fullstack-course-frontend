/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'; 


const getAll = () => {
const req = axios.get('http://localhost:3001/persons')
return req.then(res => res.data)
}

const createNewPerson = (newPerson) => {
const req = axios.post(' http://localhost:3001/persons', newPerson)
return req.then(res => res.data).catch(err => console.log(err.message))
}

const deletePerson = (id) => {
    const req = axios.delete(`http://localhost:3001/persons/${id}`)
    return req.then()
}

const updatePerson = (id, newPerson) => {
    console.log(newPerson)
    const req = axios.put(`http://localhost:3001/persons/${id}`, newPerson)
    return req.then(res => res.data)
}

export default {getAll, createNewPerson, deletePerson, updatePerson};