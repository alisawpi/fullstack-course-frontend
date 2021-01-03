
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Signup from './components/Signup'
import Notify from './components/Notify'
import { useSubscription,useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'
import {BOOK_ADDED, ALL_BOOKS} from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)
    console.log(addedBook)
    console.log(!includedIn(dataInStore.allBooks, addedBook))
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('here')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  useEffect(() => {
    if (!token) {
      const token = localStorage.getItem('library-user-token');
      if (token) setToken(token)
    }
  }, [token]) // eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('signup')}> sign up </button>
        <button onClick={() => setPage('login')}> login </button>
        <Notify errorMessage={errorMessage} />
        <Login
          setToken={setToken}
          setError={notify}
          show={page === 'login'}
          setPage={setPage}
        />
        <Signup
          show={page === 'signup'}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}> recommendations </button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}> log out</button>

      </div>
      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />
      <Recommended
        show={page === 'recommendations'}
      />
      <NewBook
        show={page === 'add'}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />

    </div>
  )
}

export default App