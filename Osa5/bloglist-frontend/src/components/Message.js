import React from 'react'
import  '../styles/message.css'



const Message = ({ message, ok }) => {
  console.log(ok)
  return (
    < div className={ok  ?  'ok' : 'error'}>
      {message}
    </div >
  )
}
export default Message
