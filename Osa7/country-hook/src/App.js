import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  useEffect(
    () => {
      if (name) {
        console.log(`requesting country ${name}`)
        axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
          .then(res => setCountry({...res.data, found: true}))
          .catch(setCountry({found: false}))
      }

    }, [name]
  )

  return country
}

const Country = ({ country }) => {
  console.log(`country: ${country}`)
  if (!country) {
    return null
  }

  if (!country[0]) {
    return (
      <div>
        not found...
      </div>
    )
  }
  const countryData = country[0]
  console.log(country)
  return (
    <div>
      <h3>{countryData.name} </h3>
      <div>capital {countryData.capital} </div>
      <div>population {countryData.population}</div>
      <img src={countryData.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  console.log(name)
  const fetch = (e) => {
    e.preventDefault()
    console.log('here')
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App