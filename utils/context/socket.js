import socketio from 'socket.io-client'
import { serverURL } from '../../config/urlcontrol'
import React from 'react'
import { getSession } from 'next-auth/react'
const init = async () => {
   console.log('serverURL', `${serverURL}`)
   await fetch(`${serverURL}/api/socket`)
}
init()
export const socket = socketio()
const session = getSession()

export const SocketContext = React.createContext()
