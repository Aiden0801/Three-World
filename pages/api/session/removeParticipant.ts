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
      let currentSession = await Session.findOne({ embed_url: url })
      if (!currentSession) {
         res.status(200).send('No Session')
      } else {
         await socket.emit('participantsRemoved', {
            email: email,
            sessionName: currentSession.name,
         })

         console.log('update success')
         res.status(200).send('success')

         socket.emit('forceDisconnect', 'discoonect')
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
