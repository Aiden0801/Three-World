import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef } from 'react'
import socketio from 'socket.io-client'
import { BASE_URL } from '@/config/constants'
// import { useSession } from 'next-auth/react'
import { useAuth, useSession, useUser } from '@clerk/nextjs'
import { useSetRecoilState } from 'recoil'
import { currentUser } from '@/utils/recoil/browser'
import { NextRouter, useRouter } from 'next/router'
import logger from '@/utils/logger'

/**
 * TODO: Complete cleanup of this component.
 * All the commented stuff around is from the "old" implementation with next-auth
 * and will be removed once we're sure clerk is working properly.
 */

const init = async () => {
  await fetch(`${BASE_URL.SERVER}/api/socket`)
}
init()

// type AuthObject = ReturnType<typeof useAuth>
// const socket = socketio()

export interface SocketContextValue {
  socket: ReturnType<typeof socketio>
}

export const SocketContext = createContext({} as SocketContextValue)
export const useSocketContext = () => useContext(SocketContext)

/**
 * Context provider for socket-io.
 * Needs to be wrapped around NextAuthProvider since it uses the user token.
 */
const globalSocket = socketio()
export function SocketContextProvider({ children }: PropsWithChildren) {
  // Auth validation state -- clerk refactor
  const auth = useAuth();       // { getToken, isLoaded, isSignedIn }
  const session = useSession()  // { isLoaded, session,isSignedIn }
  const user = useUser();       // { isSignedIn, user, isLoaded }
  
  const setCurrentUser = useSetRecoilState(currentUser)
  const router = useRouter()

  // manage socket connection when component mounts/unmounts through a globally
  // available socket
  const socket = useRef(globalSocket)
  useEffect(() => {
    socket.current.on('connect', () => {
      logger.info('connected to socket')
    })
    socket.current.connect()
    return () => {
      logger.info('disconnecting from socket')
      socket.current.disconnect()
    }
  }, [])

  // const user: any = useMemo(() => session?.data?.user ?? {}, [session])

  useEffect(() => {
    // user is not signed in. do nothing
    if (!user || !user.isSignedIn) return

    // if (!session || !fn.session.isAuth(session) || !user) return
    setCurrentUser(user.user)
    // TODO: @vlad - please check that this actually does what we need. why do
    // we need the email field for the signin? can't we use the userId directly?
    socket.current.emit('signIn', { email: user.user.emailAddresses[0].emailAddress })
  }, [user])

  // if we are not on the login page or home page, we check if the user is not authenticated
  // or is still loading.
  if (isNotHomeOrLogin(router)) {
    // if we're loading we don't want to show anything
    // TODO: show sometning like a loading screen
    // if (fn.session.isLoading(auth)) {
    if (!user.isLoaded) {
      return <></>
    }

    // if we're not authenticated, we redirect to the login page
    // TODO: improve denied page + timed redirect
    // if (fn.session.isNotAuth(session)) {
    if (!user.isSignedIn) {
      router.push('./login')
      return <p>Access Denied</p>
    }
  }

  return <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>
}


function isNotHomeOrLogin(router: NextRouter) {
  return !(router.pathname === '/' || router.pathname === '/login')
}

/**
 * useContext
 * @returns
 */
export function useSocket() {
  const { socket } = useSocketContext()
  return socket
}


// /** helpers */
// const fn = {
//   session: {
//     isAuth(session: AuthObject) {
//       return session.status === 'authenticated'
//     },
//     isLoading(session: AuthObject) {
//       return session.status === 'loading'
//     },
//     isNotAuth(session: AuthObject) {
//       return session.status === 'unauthenticated'
//     },
//   },
//   router: {
//     isNotHomeOrLogin(router: NextRouter) {
//       return !(router.pathname === '/' || router.pathname === '/login')
//     },
//   },
// }
