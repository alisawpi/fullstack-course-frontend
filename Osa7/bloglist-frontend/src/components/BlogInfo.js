import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog,commentBlog } from '../reducers/blogReducer'

const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  console.log(blog)

  const handleLikeBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(likeBlog(updatedBlog))
  }
  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  const handleBlogDelete = async () => {
    const result = await window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      dispatch(deleteBlog(blog))
    }
  }
  if (!blog) {
    return null
  }
  return (
    <div className='BlogInfo'>
      <h1>{blog.title} by {blog.author}</h1>
      <p className='blogUrl'> {blog.url}</p>
      <p className='blogLikes'> {blog.likes} Likes
        <button className='like-button' onClick={handleLikeBlog}> Like </button></p>
      <p>Added by {blog.user.id === loggedInUser.id ? 'you' : blog.user.name}</p>
      {blog.user.id === loggedInUser.id ? <button className='DeleteBlog' onClick={handleBlogDelete}> Delete </button> : null}
      <div className='comment-section'>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map(c => 
            <li>{c}</li>
            )}
        </ul>
        <form onSubmit={handleComment}>
        <input type='text' name='comment'value={comment} onChange={(e) => setComment(e.target.value)}></input>
        <button type='submit' >Add comment</button>
        </form>
      </div>
    </div>

  )
}

export default BlogInfo
