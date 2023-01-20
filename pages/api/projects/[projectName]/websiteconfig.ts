import axios from 'axios'
import connectMongo from '@/api-lib/mongodb'

const Config = require('@/api-lib/models/websiteconfig')

import logger from '@/utils/logger'
// ./api/session/geAvailableSession

import type { NextApiRequest, NextApiResponse } from 'next'
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.status(200).json({ name: req.body, name: req.name });
  const { projectName } = req.query
  logger.debug(`requesting ${projectName}`)
  try {
    await connectMongo()
    let project = await Config.findOne({ slug: projectName }).select('-owner -createdAt')
    logger.debug('project found')
    res.status(200).send(project)
  } catch (err) {
    logger.error(err.message)
    res.status(500).send('Server error')
  }
}

export default handler
