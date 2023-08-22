import { NextApiHandler } from 'next'
import { corsMiddleware, cors } from '.'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res, cors)

  return { status: 200 }
}
