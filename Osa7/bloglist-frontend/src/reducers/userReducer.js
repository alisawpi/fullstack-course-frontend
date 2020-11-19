import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case ('LOGIN'):
            const user = action.data.user
            return user
        case ('LOGOUT'):
            return null
        default: return state
    }
}

/*ACTION CREATORS */

export const loginUser = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password,
        })
        window.localStorage.setItem('user', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({ type: 'LOGIN', data: { user } })
    }
}
/**use intializeUser to check if the window has the info stored */
export const initializeUser = () => {
    return async dispatch => {
        const localUser = JSON.parse(window.localStorage.getItem('user'))
        console.log(`Initializing user ${localUser}`)
        if (localUser !== null) {
            blogService.setToken(localUser.token)
            dispatch({ type: 'LOGIN', data: { user: localUser } })
        }
    }
}
export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('user')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default userReducer