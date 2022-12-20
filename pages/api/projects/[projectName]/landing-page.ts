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
    let data = await Config.findOne({ slug: projectName }).select()
    let newSections = []
    data.template.sections.forEach((value, index) => {
      console.log(value)
      let newSection = {
        component: value.component,
        config: value,
      }
      delete newSection.config.component
      newSections = [...newSections, newSection]
      console.log(newSections)
    })
    data.template.sections = newSections
    res.status(200).send(data)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export default handler
