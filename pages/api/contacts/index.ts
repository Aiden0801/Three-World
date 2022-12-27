import mailer from '@/lib/nodemailer'
import { NextApiResponse, NextApiRequest, NextApiHandler } from 'next'
import { formSchema } from '@/page-components/Index'
import logger from '@/utils/logger'
import Cors from 'cors'
import { z } from 'zod'

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
  // res.status(134).json({ error: 'herp derp', success: false })
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
      from: process.env.CONTACT_MAIL_USER,
      to: process.env.CONTACT_MAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `${name} - ${reason} VirtualProGalaxy`,
      text: message,
      html: template(zod.data),
    })
    res.status(200).json({ name: 'Contact Form sent', success: true })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal Server Error', success: false })
  }
}

export default handler

function template(data: z.output<typeof formSchema>) {
  const { name, email, reason, message } = data
  const paragraphs = message.split('\n')
  return `
  <style>
    body {
      font-family: sans-serif;
    }
    .grid {
      display: flex;
      flex-direction: column;
    }
    .grid > div {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0;
      flex: 1;
      min-width: 300px;
    }
    .reason {
      color: #f00;
      font-weight: bold;
    }
  </style>
    <div>
    <h1>VirtualProGalaxy Contact Form</h1>
    <div class="grid">
      <div>
        <p>From <strong>${name}</strong></p>
      </div>
      <div>
        <p>Contact reason: <span class="reason">${reason}</span></p>
      </div>
      <div>
        <p>contact email: ${email}</p>
      </div>
    </div>
    <h2>Message</h2>
    ${paragraphs.map((p) => `<p>${p}</p>`).join('')}
    </div>
  `
}
