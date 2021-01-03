import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { List, ListItem, Typography } from '@material-ui/core'

const User = ({ user }) => {
    if (!user) {
        return null
    }
    return (
        <div style={{padding: '10px 10px'}}>
            <Typography variant='subtitle1'>{user.name}</Typography>
            <Typography variant='subtitle2'>Added blogs</Typography>
            <List> {user.blogs.map(b =>
                <ListItem>
                    <Typography variant='body' component={RouterLink} to={`/blogs/${b.id}`}> {b.title} by {b.author} </Typography>
                </ListItem>)}</List>

        </div>
    )
}

export default User