import connectMongo from '../../../api-lib/mongodb'
import axios from 'axios'
const User = require('../../../api-lib/models/users')
const Session = require('../../../api-lib/models/session')

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { creator, email, _id } = req.body
   console.log('Api part', creator, email, _id)
   try {
      let user = await Session.findOne({ _id })
      if (!user) {
         res.status(200).send('No Session')
      } else {
         console.log('API part', user)
         if (user.creator !== creator) res.status(200).send('Access is denied')
         else {
            var newDenyUser = {
               email: email,
            }
            await Session.findOneAndUpdate(
               { _id },
               {
                  $pull: {
                     users: newDenyUser,
                  },
               }
            ).clone()
            console.log('update success')
            res.status(200).json('success')
         }
      }
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
