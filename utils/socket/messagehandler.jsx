import { isEmptyBindingElement } from 'typescript'

let allClients = []
const MessageHandler = (io, socket) => {
   allClients.push({
      id: socket.id,
      email: '',
   })
   console.log('connected', allClients)
   const createdMessage = (msg) => {
      console.log('Message Received', msg)
      socket.broadcast.emit('newIncomingMessage', msg)
   }
   const getParticipants = (msg) => {
      console.log('getParticipants Recieved', msg)
      const clientList = io.sockets.clients(msg.sessionName)
      const result = []
      clientList.forEach((client) => {
         const item = allClients.find((obj) => obj.id == client.id)
         result.push(item.email)
      })
      console.log('getParticipants Recieved', msg)
      socket.emit('getParticipants', result)
      //msg.
   }
   const participantsAdded = (msg) => {
      console.log('Participants Added Received', msg)
      const socket_id = allClients.find((obj) => obj.email == msg.email).id
      io.sockets.sockets.get(socket_id).join(msg.sessionName)
      socket.emit('messageReceived')
      io.to(msg.sessionName).emit('participantsAdded', msg)
      // io.sockets.sockets
      //    .get(socket_id)
      //    .to(msg.sessionName)
      //    .emit('participantsAdded', msg)
   }
   const disconnecting = () => {
      console.log('onDisconnection', socket.id, allClients)
      let index = allClients.findIndex((obj) => obj.id == socket.id)
      var item = allClients[index]
      console.log(index)
      allClients.splice(index, 1)
      if (item.email == '') return
      const roomset = socket.rooms
      roomset.forEach((room) => {
         socket.to(room).emit({
            email: item.email,
            sessionName: room,
         })
      })
      console.log('disconnecting', allClients)
   }
   const participantsRemoved = (msg) => {
      console.log('Participants Removed Message ')
      const socket_id = allClients.find((obj) => obj.email == msg.email).id
      socket.emit('messageReceived')
      io.sockets.sockets
         .get(socket_id)
         .to(msg.sessionName)
         .emit('participantsRemoved', msg)
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
