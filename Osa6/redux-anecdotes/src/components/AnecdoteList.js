import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createMsg } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const orderedAnecdotes = anecdotes.sort((a, b) => a.votes > b.votes ? -1 : (b.votes > a.votes ? 1 : 0))


  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.createMsg('Added a vote for anecodote!', 3)
  }
  return (
    <>
      {orderedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}</>
  )
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter))
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  createMsg
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)