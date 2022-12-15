import { useSocketContext } from './SocketContext'

export function useSocket() {
  const { socket } = useSocketContext()
  return socket
}
