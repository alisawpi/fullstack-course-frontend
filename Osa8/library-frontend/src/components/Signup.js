import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries'

const Signup = (props) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [ createUser ] = useMutation(CREATE_USER)
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    createUser({  variables: { username, favoriteGenre } })
    setUsername('')
    setFavoriteGenre('')
  }
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h1> Sign up</h1>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          favorite genre
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavoriteGenre(target.value)}
          />
        </div>
        <button type='submit'>Sign up!</button>
      </form>
    </div>
  )
}

export default Signup