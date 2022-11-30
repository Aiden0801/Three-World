import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongo from '../../../api-lib/mongodb'
import { serverURL } from '../../../config/urlcontrol'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
/**
 * ! should change code URL
 *
 *
 */
var client = require('socket.io-client')
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { email, url } = req.body
   try {
      var socket = client.connect(`${serverURL}`)
      let currentSession = await Session.findOne({ embed_url: url })
      if (!currentSession) {
         res.status(200).send('No Session')
      } else {
         socket.emit('participantsAdded', {
            email: email,
            sessionName: currentSession.name,
         })
         console.log('update success')
         socket.emit('forceDisconnect', 'discoonect')
         res.status(200).send('success')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
