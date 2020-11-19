  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return [{
    type,
    value,
    onChange}, {reset}
  ]
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  useEffect(() => {
    if (baseUrl){
        axios.get(baseUrl)
    .then(res => setResources(res.data))
    .catch(res => console.log(`error status: ${res.status}`))
    }}, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
    .then(res => setResources(resources.concat(res.data)))
    .catch("ei onnistunut")
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content[0].value })
    content[1].reset()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name[0].value, number: number[0].value})
    name[1].reset()
    number[1].reset()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content[0]} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name[0]} /> <br/>
        number <input {...number[0]} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App