import connectMongo from '../../../api-lib/mongodb'
import axios from 'axios'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
import { socket } from '../../../utils/context/socket'
/**
 * ! should change code URL
 *
 *
 */
var client = require('socket.io-client')
import { serverURL } from '../../../config/urlcontrol'
import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { email, url } = req.body
   try {
      var socket = client.connect(`${serverURL}`)
      let user = await Session.findOne({ embed_url: url })
      if (!user) {
         res.status(200).send('No Session')
      } else {
         var newParticipant = {
            email: email,
         }
         const currentSession = await Session.findOne({ embed_url: url })
         await Session.findOneAndUpdate(
            { embed_url: url },
            {
               $addToSet: {
                  participants: newParticipant,
               },
            },
            {}
         ).clone()

         await socket.emit('participantsAdded', {
            email: email,
            sessionName: currentSession.name,
         })
         socket.disconnect()
         console.log('update success')
         res.status(200).send('success')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
