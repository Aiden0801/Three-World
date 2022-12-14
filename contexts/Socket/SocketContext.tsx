import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import socketio from 'socket.io-client'
import { serverURL } from '@/config/urlcontrol'
import { useSession } from 'next-auth/react'
import { useSetRecoilState } from 'recoil'
import { currentUser } from '@/utils/recoil/browser'
import { NextRouter, useRouter } from 'next/router'

const init = async () => {
  await fetch(`${serverURL}/api/socket`)
}
init()

type Session = ReturnType<typeof useSession>
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
export function SocketContextProvider({ children }: PropsWithChildren) {
  const socket = useRef(socketio())
  const session = useSession()
  const setCurrentUser = useSetRecoilState(currentUser)
  const router = useRouter()

  useEffect(() => {
    socket.current.on('connect', () => {
      console.info('connected to socket')
    })
    socket.current.connect()
    return () => {
      console.info('disconnecting from socket')
      socket.current.disconnect()
    }
  },[])

  const user = useMemo(() => session?.data?.user ?? {}, [session])

  useEffect(() => {
    if (!session || !fn.session.isAuth(session) || !user) return

    setCurrentUser(user.email)
    socket.current.emit('signIn', { email: user.email })
  }, [session.status, user, setCurrentUser, socket.current])

  // if we are on the login page or home page, we check if the user is not authenticated
  // or is still loading.
  if (fn.router.isHomeOrLogin(router)) {
    // if we're loading we don't want to show anything
    // TODO: show sometning like a loading screen
    if (fn.session.isLoading(session)) {
      return <></>
    }
    // if we're not authenticated, we redirect to the login page
    // TODO: improve denied page + timed redirect
    if (fn.session.isNotAuth(session)) {
      router.push('./')
      return <p>Access Denied</p>
    }
  }

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  )
}

/** helpers */
const fn = {
  session: {
    isAuth(session: Session) {
      return session.status === 'authenticated'
    },
    isLoading(session: Session) {
      return session.status === 'loading'
    },
    isNotAuth(session: Session) {
      return session.status === 'unauthenticated'
    },
  },
  router: {
    isHomeOrLogin(router: NextRouter) {
      return router.pathname === '/' || router.pathname === '/login'
    },
  },
}
