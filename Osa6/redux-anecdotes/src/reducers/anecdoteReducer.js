/*export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/
import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(a => a.id !== id ? a : { ...a, votes: a.votes + 1 })
    case 'CREATE':
      const newAnecdote = action.data
      return [...state, newAnecdote]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

/*Anecdote is an object with content and 0 votes */
export const createAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.createNew(anecdote)
     dispatch({type: 'CREATE', data: anecdote})
    }
}
export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote({...anecdote, votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id }
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer