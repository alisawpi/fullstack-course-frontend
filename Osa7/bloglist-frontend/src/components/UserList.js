import React from 'react'
import {Link} from 'react-router-dom'

const UserList = ({users}) => {
    if (!users) {
        return null
    }
    return (
        <div>
            <h1>Users</h1>
            <table>
                <tr>
                    <td></td>
                    <td style={{ fontWeight: 'bold' }}> blogs created</td>
                </tr>
                {users.map(user =>
                    <tr key={user.id}>
                        <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                        <td> {user.blogs.length}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default UserList