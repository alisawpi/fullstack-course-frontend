/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Weather = (props) => {
  const [weatherInfo, setWeatherInfo] = useState({
    temp: '', 
    feelslike: '', 
    humidity: '',
    wind: ''
  })
  const APIkey = process.env.REACT_APP_API_KEY

  useEffect(() =>
  {
    const capitalName = props.countryName;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${APIkey}`
    axios.get(url)
    .then(res => {
      const loadedWeather = {
        temp: String(res.data.main.temp), 
        feelslike: String(res.data.main.feels_like),
        humidity: String(res.data.main.humidity),  
        wind: String(res.data.wind.speed)
      }
      setWeatherInfo(loadedWeather)})
  }, []); 

  return (
    <div>
      <p>Temperature: {weatherInfo.temp} F</p>
      <p>Feels like: {weatherInfo.feelslike} F</p>
      <p>Humidity: {weatherInfo.humidity}</p>
      <p>Wind: {weatherInfo.wind}</p>
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1> {country.name}</h1>
      <h4>Capital: {country.capital}</h4>
      <h4>Population: {country.population}</h4>
      <h4>Languages: </h4>
      <ul> {country.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
      <img src={country.flag} alt='Country flag' width="15%" height="15%" />
      <h4>Weather in {country.capital}</h4>
      <Weather countryName={country.capital} />
    </div>
  )
}
const App = () => {

  const [searchName, setSearchName] = useState('')
  const countryURL = "https://restcountries.eu/rest/v2/all"
  const [allCountries, setAllCountries] = useState([]);
  const [display, setDisplay] = useState([])

  useEffect(() =>
    axios.get(countryURL)
      .then(res =>
        setAllCountries(res.data))
      .catch(err =>
        alert('something went wrong when loading country data'))
    , [])

  const handleSearch = (event) => {
    const countryName = event.target.value.toLowerCase()
    setSearchName(countryName)
    setDisplay(allCountries.filter(country =>
      country.name.toLowerCase().includes(countryName)))
  }

  const showCountry = (country) => {
    setDisplay([country])
  }

  return (
    <div>
      <p>Search for a country:  </p>
      <input value={searchName} onChange={handleSearch} />
      {display.length > 10 ?
        <p> Too many countries, specify another filter</p> : <></>
      }

      {display.length <= 10 && display.length > 1 ?
        display.map(c =>
          <li key={c.name}>
            {c.name}
            <button onClick={() => showCountry(c)}>show</button>
          </li>)
        : <></>}

      {display.length === 1 ?
        <Country country={display[0]} />
        : <></>}
    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

