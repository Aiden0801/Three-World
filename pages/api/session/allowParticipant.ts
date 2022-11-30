import connectMongo from '../../../api-lib/mongodb'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
import { participantsAdded } from '../../../utils/socket/messagehandler'
/**
 * ! should change code URL
 *
 *
 */
async function handler(req, res) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { email, url } = req.body
   try {
      let currentSession = await Session.findOne({ embed_url: url })
      if (!currentSession) {
         res.status(200).send('No Session')
      } else {
         participantsAdded(
            { email: email, sessionName: currentSession.name },
            res.socket.server.io
         )

         res.status(200).send('success')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
