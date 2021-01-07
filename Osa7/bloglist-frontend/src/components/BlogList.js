import React from 'react'
import Blog from './Blog'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }, 
  blogList: {
    display: 'flex',
    flexDirection: 'row', 
    flexWrap: 'wrap'
  }, 
}));

const BlogList = ({ blogs }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 >Blogs</h2>
      <List className={classes.blogList}>
        {blogs.map(blog =>
          <ListItem className={classes.blogItem}>
            <Blog key={blog.id} blog={blog} />
          </ListItem>
        )} </List></div>
  )
}

export default BlogList