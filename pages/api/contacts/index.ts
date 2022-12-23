import mailer from '@/lib/nodemailer'
import { NextApiResponse, NextApiRequest } from 'next'
import { formSchema } from '@/page-components/Index'
import logger from '@/utils/logger'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const zod = formSchema.safeParse(req.body)
  if (!zod.success) {
    logger.error('Invalid data')
    // TODO: return error
    res.status(400).json({ error: 'Invalid data' })
    return
  }

  const { name, email, reason, message } = zod.data
  const mailOptions = {
    from: '', // TODO: Add actual configured sender? or email?
    // to: 'admin@vpgalaxy.com',
    to: 'admin@vpgalaxy.com',
    subject: 'Contact Form',
    text: `Email from ${name} (${email})\nReason for contact: ${reason}\n\nMessage: ${message}`,
  }
  mailer.sendMail(mailOptions)
  res.status(200).json({ name: 'Contact Form sent' })
}
