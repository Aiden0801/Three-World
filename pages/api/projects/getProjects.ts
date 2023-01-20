import axios from 'axios'
import connectMongo from '../../../api-lib/mongodb'
const Config = require('../../../api-lib/models/websiteconfig')
// ./api/session/geAvailableSession
/**
 * @dev
 * This endpoint is user dashboard
 */
import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.status(200).json({ name: req.body, name: req.name });
  await connectMongo()
  let { email } = req.body
  try {
    let projects = await Config.find({
      owner: email,
    }).select('name slug')
    res.status(200).send(projects)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export default handler
