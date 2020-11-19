import React, { useState } from 'react'
import propTypes from 'prop-types'
import {useHistory} from 'react-router-dom'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  const history = useHistory()

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
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }
    createBlog(newBlog)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes(0)
    history.push('/')
  }
  return (
    <><h2>Add a new blog</h2>
      <form id='createBlog' onSubmit={handleCreate}>
        <div>
          Title
              <input
              id='title'
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitle}
          />
        </div>
        <div>
          Author
              <input
              id='author'
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthor}
          />
        </div>
        <div>
          Url
              <input
              id='url'
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrl}
          />
        </div>
        <div>
          Likes
              <input
              id='likes'
            type="number"
            value={newLikes}
            name="Likes"
            onChange={handleLikes}
          />
        </div>
        <button id='submit-blog' type="submit">Add</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  createBlog: propTypes.func.isRequired
}
export default BlogForm
