import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login';
import blogService from './services/blogs'
import Message from './components/Message'
import Login from './components/Login'
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  console.log(msg)

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    setUser(JSON.parse(window.localStorage.getItem('user')))
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
      setNewMessage({ok: true, msg: `Logged in user ${user.username}`})
    } catch (exception) {
      setNewMessage({ok:false, msg: 'wrong credentials'})
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user')
    setUser(null)
    setNewMessage({ok:true, msg:'Logged out!'})
  }
  const setNewMessage = ({ok, msg}) => {
    setMsg({ok:ok, msg:msg})
    setTimeout(() => {
      setMsg(null)
    }, 5000)
  }

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
  const handleCreate = async (event) => {
    event.preventDefault()
    if (user){
      try {
      const savedBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: newLikes,
        id: user.id
      })
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNewLikes(0)
      setNewMessage({ok:true, msg:`Created a new blog with title ${savedBlog.title} by ${savedBlog.author}`})
    } catch (exception) {
      setNewMessage({ok:false, msg:'Please, fill out all of the fields!'})
    }
    } else {
      setNewMessage({ok:false, msg:'You must login first!'})
    }
    
  }
  const blogsList = () => {
    return (
      <>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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
          <BlogForm newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} newLikes={newLikes} 
          handleTitle={handleTitle} handleAuthor={handleAuthor} handleUrl={handleUrl} handleLikes={handleLikes} handleCreate={handleCreate} />
        </div>
        : <Login handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} username={username} password={password} />
      }

    </div>
  )
}

export default App