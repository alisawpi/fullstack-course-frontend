import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  blog: {
    margin: '10px 10px',
    minWidth: '20%',
    maxWidth: '100%'
  },
  blogLikes: {
    display: 'flex',
    flexDirection: 'row',
  },
  blogSummary: {
    whiteSpace: 'nowrap'
  }, 
  user: {
    display: 'flex',
    flexDirection: 'row',
  }
}));

const Blog = ({ blog }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user)

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
    <Paper >
      <div className={classes.blog}>
        <Typography variant='h5' className={classes.blogSummary}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </Typography>
        <div className={classes.blogInfo}>
          <p className='blogUrl'> Read here: {blog.url}</p>
          <div className={classes.blogLikes}>
            <p>{blog.likes}</p>
            <Button className='like-button' startIcon={< ThumbUpAltIcon />} onClick={handleLikeBlog}> Like </Button>
          </div>
          <p className={classes.user}>
            Creator: {blog.user.name !== null ? blog.user.name : blog.user.username}
            {blog.user.id === loggedInUser.id ?
              <Button className='DeleteBlog' startIcon={<DeleteOutlineIcon />}
                onClick={handleBlogDelete}> Delete
            </Button> : null}
          </p>
        </div>
      </div>
    </Paper>
  )
}

export default Blog
