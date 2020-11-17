import React, {useEffect} from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <div style={{padding: 10}}><AnecdoteForm /></div>
      <div style={{padding: 10}}><Filter/></div>
      <AnecdoteList />
    </div>
  )
}

export default App