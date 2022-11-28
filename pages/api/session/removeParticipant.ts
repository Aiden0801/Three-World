import connectMongo from '../../../api-lib/mongodb'
import axios from 'axios'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')

import { serverURL } from '../../../config/urlcontrol'
var client = require('socket.io-client')
import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { email, url } = req.body
   console.log(req.body)
   try {
      var socket = client.connect(`${serverURL}`)
      let user = await Session.findOne({ embed_url: url })
      if (!user) {
         res.status(200).send('No Session')
      } else {
         var newParticipant = {
            email: email,
         }
         if (url == 'unknown') {
            await Session.updateMany(
               {},
               {
                  $pull: {
                     $pull: {
                        participants: newParticipant,
                     },
                  },
               }
            )
         } else {
            await Session.findOneAndUpdate(
               { embed_url: url },
               {
                  $pull: {
                     participants: newParticipant,
                  },
               },
               {}
            ).clone()
         }

         await socket.emit('participantsRemoved', { author: 'HHHHHHHHHHHHHH' })

         console.log('update success')
         res.status(200).send('success')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
