import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog} from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user)


  console.log(blog)
  const handleLikeBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(likeBlog(updatedBlog))
  }

  const handleBlogDelete = async () => {
    const result = await window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      dispatch(deleteBlog(blog))
    }
  }


  return (
    <div className='Blog' style={blogStyle}>
      <div className='blogSummary'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
      <div className='blogDetails'>
        <p className='blogUrl'> {blog.url}</p>
        <p className='blogLikes'> Likes: {blog.likes} </p>
        <button className='like-button' onClick={handleLikeBlog}> Like </button>
        <p className='User'> Creator: {blog.user.name !== null ? blog.user.name : blog.user.username}</p>
        {blog.user.id === loggedInUser.id ? <button className='DeleteBlog' onClick={handleBlogDelete}> Delete </button> : null}
      </div>
    </div>
  )
}

export default Blog
