import { createContext, PropsWithChildren, useContext } from 'react'
import socketio from 'socket.io-client'
import { serverURL } from '@/config/urlcontrol'

const init = async () => {
  await fetch(`${serverURL}/api/socket`)
}
init()

export const socket = socketio()

export interface SocketContextValue {
  socket: ReturnType<typeof socketio>
}

export const SocketContext = createContext({} as SocketContextValue)
export const useSocketContext = () => useContext(SocketContext)

/**
 * Context provider for socket-io.
 * Needs to be wrapped around NextAuthProvider since it uses the user token.
 */
export function SocketContextProvider({ children }: PropsWithChildren) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
