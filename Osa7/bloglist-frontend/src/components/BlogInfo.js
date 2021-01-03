import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'
import { Paper,Typography, List, ListItem, FormControl, Button, Input, InputLabel } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
      <Typography variant='h5'>{blog.title} by {blog.author}</Typography>
      <Typography variant='p' className='blogUrl'> {blog.url}</Typography>
      <br/>
      <Typography variant='p' className='blogLikes'> {blog.likes} Likes
        <Button ctartIcon={<ThumbUpAltIcon />} className='like-button' onClick={handleLikeBlog}> Like </Button>
        </Typography>
        <br/>
      <Typography variant='p'>Added by {blog.user.id === loggedInUser.id ? 'you' : blog.user.name}</Typography>
      {blog.user.id === loggedInUser.id ? <Button startIcon={<DeleteOutlineIcon />} className='DeleteBlog' onClick={handleBlogDelete}> Delete </Button> : null}
      <Paper className='comment-section' style={{margin:'10px 10px', padding: '0px 10px', maxWidth: '30%', height: '20%'}}>
        <Typography variant='subtitle1'>Comments</Typography>
        <List style={{maxHeight:'10%'}}>
          {blog.comments.map(c =>
            <ListItem>{c}</ListItem>
          )}
        </List>
        <form onSubmit={handleComment} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
          <FormControl>
            <InputLabel> Comment </InputLabel>
            <Input type='text' name='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
          </FormControl>
          <FormControl>
            <Button type='submit' >Add comment</Button>
          </FormControl>
        </form>
      </Paper>
    </div>

  )
}

export default BlogInfo
