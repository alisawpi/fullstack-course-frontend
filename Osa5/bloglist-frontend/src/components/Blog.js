import React, {useState} from 'react'

const Blog = ({ blog, loggedInUser, deleteBlog, likeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const handleBlogLike = () => {
    likeBlog(blog)
  }

  const handleBlogDelete = async () => {
    const result = await window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
    deleteBlog(blog)
    }
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  
  return (
    <div className='Blog' style={blogStyle}>
      <div className='blogSummary'>
        {blog.title} {blog.author}
        {visible ? null : <button className='viewButton'onClick={toggleVisibility}>view</button>}
      </div>
    {visible ? 
    <div className='blogDetails'>
    <p className='blogUrl'> {blog.url}</p>
      <p className='blogLikes'> Likes: {blog.likes} </p>
        <button className='like-button' onClick={handleBlogLike}> Like </button>
      <p className='User'> Creator: {blog.user.name !== null ? blog.user.name : blog.user.username}</p>
      {blog.user.id === loggedInUser ? <button className='DeleteBlog' onClick={handleBlogDelete}> Delete </button> : null}
      <button className='hideButton'onClick={toggleVisibility}>Hide</button>
    </div> 
    : null }
        
 
    </div>
  )
}

export default Blog
