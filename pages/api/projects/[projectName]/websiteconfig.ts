import axios from 'axios'
import connectMongo from '../../../../api-lib/mongodb'
const Config = require('../../../../api-lib/models/websiteconfig')
// ./api/session/geAvailableSession

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.status(200).json({ name: req.body, name: req.name });
  const { projectName } = req.query

  console.log(projectName)
  await connectMongo()
  try {
    let project = await Config.findOne({ slug: projectName }).select()
    console.log(project)
    res.status(200).send(project)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export default handler
