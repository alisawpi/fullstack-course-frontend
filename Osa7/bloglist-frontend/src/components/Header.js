import React from 'react'
import {logoutUser} from '../reducers/userReducer'
import {useDispatch} from 'react-redux'

const Header = ({user}) => {
    
const dispatch = useDispatch()
    console.log(user)
    return (
        <div>
            <h1>Blogs</h1>
            <p>{user.name} logged in</p>
            <button onClick={() => dispatch(logoutUser())}>Log out</button>
        </div>
    )
}

export default Header