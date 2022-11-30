import connectMongo from '../../../api-lib/mongodb'
import { participantsRemoved } from '../../../utils/socket/messagehandler'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
async function handler(req, res) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { email, url } = req.body
   console.log(req.body)
   try {
      let currentSession = await Session.findOne({ embed_url: url })
      if (!currentSession) {
         res.status(200).send('No Session')
      } else {
         participantsRemoved(
            { email: email, sessionName: currentSession.name },
            res.socket.server.io
         )
         console.log('update success')
         res.status(200).send('success')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
