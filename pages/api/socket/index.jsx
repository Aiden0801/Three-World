import { Server } from 'socket.io'
import MessageHandler from '../../../utils/socket/messagehandler'
const SocketHandler = (req, res) => {
   if (res.socket.server.io) {
      console.log('Socket is already running')
   } else {
      console.log('Socket is initializing')

      const io = new Server(res.socket.server)
      res.socket.server.io = io
      const onConnection = (socket) => {
         MessageHandler(io, socket)
      }
      io.on('connection', onConnection)
      console.log('Setting up socket')
      res.status(200).send('Created Server')
   }
   res.end()
}
export default SocketHandler
