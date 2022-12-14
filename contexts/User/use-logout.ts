import { showNotification } from '@mantine/notifications'
import { signOut } from 'next-auth/react'
import { useCallback } from 'react'
import { BASE_URL } from '@/config/constants'
import { useSocketContext } from '@/contexts/socket'

/**
 * Custom hook that returns a function that logs the user out, disconnects and
 * notifies the user if something went wrong.
 *
 * This can be used from anywhere in the app and doesn't actually relies on the
 * user context.
 *
 * @returns A function that logs the user out and disconnects the socket
 */
export function useLogout(): () => Promise<void> {
  const { socket } = useSocketContext()

  return useCallback(async () => {
    return signOut({
      redirect: false,
      callbackUrl: BASE_URL.SERVER,
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
