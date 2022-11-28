const MessageHandler = (io, socket) => {
   console.log('connected')
   const createdMessage = (msg) => {
      console.log('Message Received', msg)
      socket.broadcast.emit('newIncomingMessage', msg)
   }
   const participantsAdded = (msg) => {
      console.log('Participants Added Received', msg)
      socket.broadcast.emit('participantsAdded', msg)
   }
   const disConnected = () => {
      console.log('disconnected')
   }
   socket.on('participantsAdded', participantsAdded)
   socket.on('createdMessage', createdMessage)
   socket.on('disconnect', disConnected)
}
export default MessageHandler
