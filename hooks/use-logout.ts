import { showNotification } from '@mantine/notifications'
import { signOut } from 'next-auth/react'
import { useCallback } from 'react'
import { serverURL } from '../config/urlcontrol'
import { useSocketContext } from '../utils/context/socket'

export function useLogout() {
  const socket = useSocketContext()

  return useCallback(() => {
    signOut({
      redirect: false,
      callbackUrl: serverURL,
    })
      .then(() => {
        socket.disconnect()
      })
      .catch((err) => {
        showNotification({
          title: 'Error',
          message: 'There was an error trying to log you out',
          color: 'red',
        })
      })
  }, [socket])
}
