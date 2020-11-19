import React from 'react'
import  '../styles/message.css'
import {useSelector} from 'react-redux'



const Message = () => {
const message = useSelector(state => state.notification)
console.log(message)
    return (
        message.msg ? 
        <div className={message.ok  ?  'ok' : 'error'}>
        {message.msg}
        </div > 
        : 
        null
    )
}
export default Message
