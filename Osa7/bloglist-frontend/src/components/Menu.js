import React from 'react'
import {Link} from 'react-router-dom'
const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link to='/' style={padding}>Blogs</Link>
        <Link to='/create' style={padding}>create new</Link>
        <Link to='/users' style={padding}>users</Link>
      </div>
    )
  }

  export default Menu