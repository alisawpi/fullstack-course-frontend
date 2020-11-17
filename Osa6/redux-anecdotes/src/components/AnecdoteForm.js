import { createAnecdote } from '../reducers/anecdoteReducer'
import { createMsg } from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteForm = (props) => {

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {
      content: content, 
      votes: 0
    }
    props.createAnecdote(newAnecdote)
    props.createMsg('Created a new anecdote!', 3)
  }
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input type='text' name='anecdote' />
          <button type='submit'>create</button>
        </div>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  createMsg
}
export default connect(null,mapDispatchToProps)(AnecdoteForm)