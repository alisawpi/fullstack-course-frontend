import React from 'react'
import {Link} from 'react-router-dom'

const User = ({user}) => {
    if (!user) {
        return null
    }
    return (
    <div>   <h3>{user.name}</h3>
               <h4>Added blogs</h4>
               <ul> {user.blogs.map(b => 
               <li><Link to={`/blogs/${b.id}`}>{b.title} by {b.author}</Link></li>)}</ul>
              
        </div>
    )
}

export default User