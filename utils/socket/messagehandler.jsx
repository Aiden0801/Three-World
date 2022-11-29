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
   const getParticipants = (msg) => {
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
      var clientSocket = io.sockets.sockets.get(socket_id)
      clientSocket.join(msg.sessionName)
      console.log(clientSocket.id)
      clientSocket.to(msg.sessionName).emit('participantsAdded', msg)
   }
   const disconnecting = () => {
      let index = allClients.find((obj) => obj.id == socket.id)
      var item = allClients[index]
      const roomset = socket.rooms
      roomset.forEach((room) => {
         socket.to(room).emit({
            email: item.email,
            sessionName: room,
         })
      })
      console.log('disconnecting', allClients)
      allClients.splice(index, 1)
   }
   const participantsRemoved = (msg) => {
      console.log('Participants Removed Message ')
      const socket_id = allClients.find((obj) => obj.email == msg.email).id
      var clientSocket = io.sockets.sockets.get(socket_id)
      console.log(clientSocket.id)
      clientSocket.to(msg.sessionName).emit('participantsRemoved', msg)
      clientSocket.leave(msg.sessionName)
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
