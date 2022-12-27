import mailer from '@/lib/nodemailer'
import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next'
import { formSchema } from '@/page-components/Index'
import logger from '@/utils/logger'
import Cors from 'cors'

const cors = Cors({
  methods: ['POST'],
  origin: true,
})

async function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: ReturnType<typeof Cors>
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res, cors)

  // validate data before trying to send the email. if we received invalid data,
  // we don't want to send an email. This should always succeed, since the form
  // itself uses the same schema to validate the values, but it's good to be
  // safe.
  const zod = formSchema.safeParse(req.body)

  // explicit type guard
  if (zod.success == false) {
    res.status(400).json({
      error: 'Invalid data',
      success: false,
      errors: zod.error.format(),
    })
    return
  }

  const { name, email, reason, message } = zod.data

  try {
    await mailer.sendMail({
      from: `${name} <${email}>`,
      to: process.env.CONTACT_MAIL_TO,
      subject: `${name} - ${reason} VirtualProGalaxy`,
      text: message,
      html: `<p>${message}</p>`,
    })
    res.status(200).json({ name: 'Contact Form sent', success: true })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal Server Error', success: false })
  }
}

export default handler
