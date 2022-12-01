import connectMongo from '../../../api-lib/mongodb'
import axios from 'axios'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')
// ./api/session/getControlSession
// Get Sessions created by me

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { embed_url } = req.body
   try {
      let user = await Session.findOne({
         embed_url,
      }).select('participants')
      if (!user || user.length == 0) {
         res.status(200).send('No Session or Access is Denied')
      } else {
         res.status(200).json(user)
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
