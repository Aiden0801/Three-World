import { isEmptyBindingElement } from 'typescript'

let allClients = []
const MessageHandler = (io, socket) => {
   console.log('connected', allClients)
   allClients.push({
      id: socket.id,
      email: '',
   })
   const createdMessage = (msg) => {
      console.log('Message Received', msg)
      socket.broadcast.emit('newIncomingMessage', msg)
   }
   const getParticipants = async (msg) => {
      const clientList = io.sockets.clients(msg.sessionName)
      const result = []
      clientList.forEach((client) => {
         const item = allClients.find((obj) => obj.email == client)
         result.push(item.email)
      })
      socket.emit('getParticipants', result)
      //msg.
   }
   const participantsAdded = (msg) => {
      console.log('Participants Added Received', msg)
      const socket_id = allClients.find((obj) => obj.email == msg.email).id
      io.sockets.sockets.get(socket_id).join(msg.sessionName)

      io.sockets.sockets
         .get(socket_id)
         .to(msg.sessionName)
         .emit('participantsAdded', msg)
   }
   const disconnecting = () => {
      let item = allClients.find((obj) => obj.id == socket.id)
      console.log(socket.id)
      console.log('disconnecting', allClients, index)
      allClients.splice(index, 1)

      const roomset = socket.rooms
      roomset.forEach((room) => {
         socket.to(room).emit({
            email: item.email,
            sessionName: room,
         })
      })
   }
   const participantsRemoved = (msg) => {
      console.log('Participants Removed Message ')
      const socket_id = allClients.find((obj) => obj.email == msg.email).id
      io.sockets.sockets
         .get(socket_id)
         .to(msg.sessionName)
         .emit('participantsRemoved', msg)
      io.sockets.sockets.get(socket_id).leave(msg.sessionName)
   }
   const signIn = (msg) => {
      allClients.forEach((obj, index) => {
         if (obj.id == socket.id) {
            obj.email = msg.email
         } else if (obj.email == msg.email) {
            allClients.splice(index, 1)
         } else;
      })
      console.log(allClients)
   }
   socket.on('getParticipants', getParticipants)
   socket.on('signIn', signIn)
   socket.on('participantsAdded', participantsAdded)
   socket.on('participantsRemoved', participantsRemoved)
   socket.on('createdMessage', createdMessage)
   socket.on('disconnecting', disconnecting)
}
export default MessageHandler
