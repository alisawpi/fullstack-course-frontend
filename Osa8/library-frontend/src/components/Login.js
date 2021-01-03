import React, { useState, useEffect } from 'react'
import {useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'

const Login = ({ show, setPage, setToken, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, result] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    loginUser({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }
  if (!show || result.loading) {
    return null
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login