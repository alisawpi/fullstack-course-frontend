import React, { useState } from 'react'
import propTypes from 'prop-types'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {createMessage} from '../reducers/notificationReducer'
import {createBlog} from '../reducers/blogReducer'
import { FormControl, Input, InputLabel, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  createBlog: {
    display: 'flex', 
    flexDirection: 'column',
    maxWidth: '20%', 
   
  }
}));


const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const classes = useStyles()
  const handleTitle = ({ target }) => {
    setNewTitle(target.value)
  }
  const handleAuthor = ({ target }) => {
    setNewAuthor(target.value)
  }
  const handleUrl = ({ target }) => {
    setNewUrl(target.value)
  }
  const handleLikes = ({ target }) => {
    setNewLikes(target.value)
  }
  const handleCreate = (event) => {
    event.preventDefault()
    if (!newTitle || !newAuthor || !newUrl){
      dispatch(createMessage({ok:false, msg:'Please fill out all of the fields!'}))
      return 
    }
    if (!user) {
      dispatch(createMessage({ok:false, msg:'You must login to create blogs!'}))
      return 
    }
    const blogToCreate = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      user: user.id
    }
    console.log('here')
    dispatch(createBlog(blogToCreate, user))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
    history.push('/')
  }
  return (
    <Paper>
      <h2>Add a new blog</h2>
      <form className={classes.createBlog} onSubmit={handleCreate}>
        <FormControl>
          <InputLabel>Title</InputLabel>
              <Input
              id='title'
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitle}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Author</InputLabel>
              <Input
              id='author'
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthor}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Url</InputLabel>
              <Input
              id='url'
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrl}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Likes</InputLabel>
              <Input
              id='likes'
            type="number"
            value={newLikes}
            name="Likes"
            onChange={handleLikes}
          />
        </FormControl>
        <FormControl>
        <Button id='submit-blog' type="submit">Add</Button>
        </FormControl>
      </form>
    </Paper>
  )
}
BlogForm.propTypes = {
  createBlog: propTypes.func.isRequired
}
export default BlogForm
