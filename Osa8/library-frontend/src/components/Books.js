import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_GENRE } from '../queries'
import _ from 'lodash'

const Books = (props) => {
  let result = useQuery(ALL_BOOKS, {
    //pollInterval: 2000
  })
  let [getGenre, resultGenre] = useLazyQuery(ALL_BOOKS_GENRE)
  const [genre, setGenre] = useState('all')
  const [showBooks, setshowBooks] = useState(null)

  useEffect(() => {
    if (genre === 'all' && result.data){
      setshowBooks(result.data.allBooks)
    }
    if (genre !== 'all' && resultGenre.data){
      setshowBooks(resultGenre.data.allBooks)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data,resultGenre.data])

  if (!props.show || !showBooks || result.loading || resultGenre.loading) {
    return null
  }

  let allGenres = _.uniq(result.data.allBooks.map(b => b.genres).flat())
  allGenres.push('all')
  
  const handleSelect = (e) => {
    const genre = e.target.value
    if (genre !== 'all') {
      setGenre(genre)
      getGenre({ variables: { genre } })
    } else {
      setshowBooks(result.data.allBooks)
    }
  }
  return (
    <div>
      <h2>books</h2>
      <div>Select a preferred genre
        <select value={genre} onChange={handleSelect}>
          {allGenres.map(g =>
            <option key={g} value={g}>{g}</option>
          )}
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {showBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books