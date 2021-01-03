import React from 'react'
import { Typography } from '@material-ui/core'

const Header = ({ user }) => {
    console.log(user)
    return (
        <div>
            <Typography variant='h4'>Blogs</Typography>
            <Typography variant='subtitle1'>{user.name} logged in</Typography>
        </div>
    )
}

export default Header