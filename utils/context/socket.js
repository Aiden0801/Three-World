import socketio from 'socket.io-client'
import { serverURL } from '../../config/urlcontrol'
import React from 'react'
const init = async () => {
   console.log('serverURL', `${serverURL}`)
   await fetch(`${serverURL}/api/socket`)
}
init()
export const socket = socketio()
export const SocketContext = React.createContext()
