import axios from 'axios'
import connectMongo from '../../../api-lib/mongodb'
// const Config = require('../../../api-lib/models/twoconfig')
const Config = require('../../../api-lib/models/websiteconfig')
// ./api/session/geAvailableSession

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   let { data } = req.body
   try {
      let project = new Config(data)
      await project.save()
      res.status(200).json('Success')
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
