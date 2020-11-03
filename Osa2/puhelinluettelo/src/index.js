import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import services from './services'
import './index.css'; 

const Notification = ({ message, status }) => {
  console.log(message === null)
  console.log(status)
  if (message === null) {
    return null
  } else {
  return (
    <div className={status ? 'succesess':'error'}>
      {message}
    </div>
  )}
}

const Person = ({ person, handleDelete }) => {
  return (
    <p> {person.name} {person.number}
      <button onClick={() => handleDelete(person.id, person.name)}> Delete </button>
    </p>
  )
}

const Phonebook = ({ people, handleDelete }) => {
  return (
    people.map(person =>
      <Person key={person.name} person={person} handleDelete={handleDelete} />
    ))
}

const NewPerson = (props) => {
  return (
    <><h2>Add new person</h2>
      <form onSubmit={props.addPerson}>
        <div>
          name:
          <input value={props.newName} onChange={props.changeName} />
        </div>
        <div>
          number:
          <input value={props.newNumber} onChange={props.changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const FilterPeople = (props) => {
  return (
    <>
      <p>filter shown with: </p>
      <input value={props.filterName} onChange={props.changeFilter} ></input>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [status,setStatus] = useState(false)

  React.useEffect(() =>
    services.getAll().then(people =>
      setPersons(people))
    , []);

  const shownPersons = persons.filter(p =>
    p.name.toLowerCase().includes(filterName.toLowerCase()));

  const changeName = (event) => {
    setNewName(event.target.value);
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const changeFilter = (event) => {
    setFilterName(event.target.value);
  }

  const addPerson = (event) => {
    const existingPerson = persons.filter(p => p.name === newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    console.log(existingPerson)
    event.preventDefault()
    if (newName.length === 0 || newNumber.length === 0) {
      setMessage(`Please, fill out all of the fields before submitting!`)
      setStatus(false)
      setTimeout(() => {
        setMessage(null,status=false)
      }, 5000)
    } else if (existingPerson.length > 0) {
      services.updatePerson(existingPerson[0].id, newPerson)
      .then(res => {
        setPersons(persons.map(p => p.name !== newName ? p : newPerson))
        setMessage(`Information of person ${newName} updated!`)
        setStatus(true)})
      .catch(err => {
        setMessage("Could not update the information, please try again.")
        setStatus(false)})
      setTimeout(() => {
        setMessage(null,false)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
    else {
      services.createNewPerson(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setMessage(`New person ${newName} added to your phonebook!`)
          setStatus(true)
        })
        .catch(err => {
          setMessage("Could not create a new person, please try again.")
        setStatus(false)})
        setTimeout(() => {
          setMessage(null,false)
        }, 5000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id, name) => {
    const result = window.confirm(`Delete ${name}`);
    if (result) {
      services.deletePerson(id).then(res =>
      {setPersons(persons.filter(p => p.id !== id))
      setMessage(`Person ${name} deleted from your phonebook!`)})
      .catch(err => setMessage("Could not delete the person, please try again."))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <Notification message={message} status={status}/>
      <h2>Phonebook</h2>
      <FilterPeople filterName={filterName} changeFilter={changeFilter} />
      <NewPerson addPerson={addPerson} newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} />
      <h2>Numbers</h2>
      <Phonebook people={shownPersons} handleDelete={handleDelete} />
    </div>
  )

}
ReactDOM.render(<App />, document.getElementById('root'))

export default App