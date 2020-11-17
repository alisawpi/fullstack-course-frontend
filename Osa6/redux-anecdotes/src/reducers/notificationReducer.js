
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case ('CREATEMESSAGE'):
            const msg = action.data.msg
            return msg
        case ('RESET'):
            return ''
        default: return state
    }
}

let timeoutIDs = []

export const createMsg = (msg, seconds) => {
    console.log(timeoutIDs)
    return async dispatch => {
        dispatch({
            type: 'CREATEMESSAGE',
            data: { msg }
        })
        if (timeoutIDs.length === 0) {
            const newID = setTimeout(function () {
                dispatch(deleteMsg())
                timeoutIDs.filter(i => i !== newID)
            }, seconds * 1000);
            timeoutIDs.push(newID)
        } else {
            for (let id in timeoutIDs){
                window.clearTimeout(id)
            }
            timeoutIDs = []
            console.log(timeoutIDs)
            const newID = setTimeout(function () {
                dispatch(deleteMsg())
                timeoutIDs.filter(i => i !== newID)
            }, 5 * 1000);
            timeoutIDs.push(newID)
        }
    }
}

export const deleteMsg = () => {
    return {
        type: 'RESET'
    }
}

export default notificationReducer