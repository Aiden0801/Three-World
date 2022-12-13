import connectMongo from '../../../api-lib/mongodb'
const Config = require('../../../api-lib/models/websiteconfig')
// ./api/session/geAvailableSession

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { data } = req.body
   console.log('updateProject', data)
   try {
      let project = await Config.findOneAndUpdate(
         { name: data.name },
         data
      ).clone()

      res.status(200).json('Success')
   } catch (err) {
      console.error(err.message)
      res.status(500).json('Server error')
   }
}

export default handler
