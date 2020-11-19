
const notificationReducer = (state = {msg: null, ok:true}, action) => {
    switch (action.type) {
        case ('CREATEMESSAGE'):
            const msg = action.data.message
            return msg
        case ('RESET'):
            return {msg: null, ok:true}
        default: return state
    }
}

let timeoutIDs = []
/**message = {msg: text, ok: true/false} */
export const createMessage = (message, seconds = 3) => {
    console.log(timeoutIDs)
    return async dispatch => {
        dispatch({
            type: 'CREATEMESSAGE',
            data: { message }
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
                dispatch(deleteMsg())}, 5 * 1000);
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