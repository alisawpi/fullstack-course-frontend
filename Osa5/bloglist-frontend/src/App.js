import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Message from './components/Message'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const blogFormRef = useRef()
  const sortedByLikes = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0))

  console.log(msg)
  console.log(blogs)
  console.log(user)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    const localUser = JSON.parse(window.localStorage.getItem('user'))
    if (localUser !== null) {
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])
  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }
  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNewMessage({ ok: true, msg: `Logged in user ${user.username}` })
    } catch (exception) {
      setNewMessage({ ok: false, msg: 'wrong credentials' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
    setNewMessage({ ok: true, msg: 'Logged out!' })
  }
  const setNewMessage = ({ ok, msg }) => {
    setMsg({ ok: ok, msg: msg })
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    if (user) {
      try {
        const savedBlog = await blogService.create({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          likes: newBlog.likes,
          user: user.id
        })
        blogFormRef.current.toggleVisibility()
        setBlogs(blogs.concat({
          ...savedBlog,
          user: {
            id: user.id,
            name: user.name,
            username: user.username
          }
        }))
        setNewMessage({ ok: true, msg: `Created a new blog with title ${savedBlog.title} by ${savedBlog.author}` })
      } catch (exception) {
        setNewMessage({ ok: false, msg: 'Please, fill out all of the fields!' })
      }
    } else {
      setNewMessage({ ok: false, msg: 'You must login first!' })
    }

  }

  const likeBlog = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes +1,
      user: blog.user.id
    }
    console.log(updatedBlog)
    console.log(blog)
    try {
      blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...updatedBlog, user: blog.user }))
      setNewMessage({ ok:true, msg:`Liked blog ${blog.title} by ${blog.author}` })
    } catch {
      setNewMessage({ ok:false, msg: `Failed to like blog ${blog.title} by ${blog.author}` })
    }

  }
  const deleteBlog = (blog) => {
    try {
      blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNewMessage({ ok:true, msg: `Deleted blog ${blog.title} by ${blog.author}` })
    } catch {
      setNewMessage({ ok:false, msg: `Failed to delete ${blog.title} by ${blog.author}!` })
    }
  }

  const blogsList = () => {
    return (
      <>
        <h2>Blogs</h2>
        {sortedByLikes.map(blog =>
          <Blog key={blog.id} blog={blog} loggedInUser={user.id} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        )} </>
    )
  }

  return (
    <div>
      { msg ? <Message ok={msg.ok} message={msg.msg} /> : null}
      {user ?
        <div>
          <p>{user.username} logged in </p>
          <button onClick={handleLogout} > Logout </button>
          {blogsList()}
          <Togglable buttonLabel='Add a  new blog'  ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

        </div>
        : <Login handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} username={username} password={password} />
      }

    </div>
  )
}

export default App