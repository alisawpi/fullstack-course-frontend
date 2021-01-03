
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR} from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState(undefined)
  const [birthYear, setBirthYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ], 
    //pollInterval: 2000
  })

  if (!props.show || result.loading) {
    return null
  }
 
  const handleBirthYear = (event) => {
    event.preventDefault()
    const year = Number(birthYear)
    editAuthor({ variables: { name, setBornTo: year } })
    setBirthYear('')
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name} >
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={handleBirthYear}>
        <div>Name of the author
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {result.data.allAuthors.map(a=> 
          <option key={a.name} value={a.name}>{a.name}</option>
            )}
        </select>
        </div>
        <div>Set birthyear to
        <input type='number' value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors
