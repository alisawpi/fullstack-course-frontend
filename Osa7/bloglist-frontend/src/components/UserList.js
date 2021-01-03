import React from 'react'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'

const UserList = ({ users }) => {
    if (!users) {
        return null
    }
    return (
        <div>
            <h1>Users</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}> blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user =>
                        <TableRow key={user.id}>
                            <TableCell> <Link to={`/users/${user.id}`}>{user.name}</Link> </TableCell>
                            <TableCell> {user.blogs.length}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default UserList