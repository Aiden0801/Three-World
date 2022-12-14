import socketio from 'socket.io-client'
import { serverURL } from '../../config/urlcontrol'
import React from 'react'
import { getSession } from 'next-auth/react'
const init = async () => {
   await fetch(`${serverURL}/api/socket`)
}
init()
export const socket = socketio()

export const SocketContext = React.createContext()

export function useSocketContext() {
   return React.useContext(SocketContext)
}
