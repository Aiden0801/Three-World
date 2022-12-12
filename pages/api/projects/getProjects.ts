import axios from 'axios'
import connectMongo from '../../../api-lib/mongodb'
const Config = require('../../../api-lib/models/websiteconfig')
// ./api/session/geAvailableSession

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
   // res.status(200).json({ name: req.body, name: req.name });
   await connectMongo()
   try {
      let projects = await Config.find({}).select('global')
      const result = []
      projects.forEach((project, index) => {
         result.push({ name: project.global.title })
      })
      res.status(200).send(result)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
   }
}

export default handler
