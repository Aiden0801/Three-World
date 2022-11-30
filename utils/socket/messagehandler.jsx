let allClients = []

const participantsAdded = (msg, io) => {
   console.log('Participants Added Received', msg)
   const socket_id = allClients.find((obj) => obj.email == msg.email).id
   io.sockets.sockets.get(socket_id).join(msg.sessionName)
   io.to(msg.sessionName).emit('participantsAdded', msg)
}

const participantsRemoved = (msg, io) => {
   console.log('Participants Removed Message ')
   const socket_id = allClients.find((obj) => obj.email == msg.email).id
   // io.sockets.sockets
   //    .get(socket_id)
   io.to(msg.sessionName).emit('participantsRemoved', msg)
   io.sockets.sockets.get(socket_id).leave(msg.sessionName)
}
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
      console.log('getParticipants Received', msg)
      var clientList = await io.in(msg.sessionName).fetchSockets()
      var result = []
      clientList.forEach((client) => {
         const item = allClients.find((obj) => obj.id == client.id)
         result.push(item.email)
      })
      console.log('clientList', result)

      socket.emit('getParticipants', msg.sessionName, result)
      //msg.
   }
   const disconnecting = () => {
      let item = allClients.find((obj) => obj.id == socket.id)
      console.log(socket.id)
      console.log('disconnecting', allClients, index)
      allClients.splice(index, 1)

      const roomset = socket.rooms
      roomset.forEach((room) => {
         socket.to(room).emit('participantsRemoved', {
            email: item.email,
            sessionName: room,
         })
      })
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
   const forceDisconnect = (msg) => {
      let item = allClients.find((obj) => obj.id == socket.id)
      console.log('forceDisconnecting', socket.id)
      allClients.splice(index, 1)

      socket.disconnect()
   }
   socket.on('getParticipants', getParticipants)
   socket.on('signIn', signIn)
   socket.on('createdMessage', createdMessage)
   socket.on('disconnecting', disconnecting)
   socket.on('forceDisconnect', forceDisconnect)
}
export { participantsAdded, participantsRemoved, MessageHandler }
