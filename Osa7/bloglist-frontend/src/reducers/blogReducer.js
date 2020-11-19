
import blogService from '../services/blogs'
import { createMessage } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const id = action.data.id
      return state.map(b => b.id !== id ? b : { ...b, likes: b.likes + 1 })
    case 'CREATE':
      const newBlog = action.data
      return [...state, newBlog]
    case 'DELETEBLOG':
      console.log('here to delete')
      const idToDelete = action.data.id
      console.log(idToDelete)
      return state.filter(b => b.id !== idToDelete)
    case 'COMMENT_BLOG': 
      const idToComment = action.data.id
      const newComment = action.data.comment
      return state.map(b => b.id !== idToComment ? b : {...b, comments: b.comments.concat(newComment)})
    case 'INIT_BLOGS':
      return action.data
    default: return state
  }
}

/**author: "joku"
id: "5fa2e47abded3229c0e1fa8a"
likes: 25
title: "Blogi 2"
url: "jokuosote"
user:
id: "5fa2e3c9bded3229c0e1fa87"
name: "newuser2"
username: "newuser2" */

/**ACTION CREATORS */
export const createBlog = (blog, creator) => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: {
        ...createdBlog,
        user: {
          id: creator.id,
          name: creator.name,
          username: creator.username
        }
      }
    })
  }
}
/*The parameter is the blog with new info */
export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.update(blog.id, blog)
      dispatch({
        type: 'LIKE',
        data: { id: blog.id }
      })
      dispatch(createMessage({ ok: true, msg: `Liked blog ${blog.title} by ${blog.author}` }))
    } catch {
      dispatch(createMessage({ ok: false, msg: `Failed to like blog ${blog.title} by ${blog.author}` }))
    }
  }
}

export const commentBlog = (blog, newComment) => {
  return async dispatch => {
    try {
      await blogService.comment(blog.id, newComment)
      dispatch({
        type: 'COMMENT_BLOG',
        data: { id: blog.id , comment: newComment}
      })
      dispatch(createMessage({ ok: true, msg: `Commented on blog ${blog.title} by ${blog.author}` }))
    } catch {
      dispatch(createMessage({ ok: false, msg: `Failed to comment blog ${blog.title} by ${blog.author}` }))
    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog.id)
      dispatch({
        type: 'DELETEBLOG',
        data: { id: blog.id }
      })
      dispatch(createMessage({ ok: true, msg: `Deleted blog ${blog.title} by ${blog.author}` }))
    } catch {
      dispatch(createMessage({ ok: false, msg: `Failed to delete ${blog.title} by ${blog.author}!` }))
    }
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer