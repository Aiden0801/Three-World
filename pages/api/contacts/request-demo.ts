import { NextApiHandler } from 'next'
import { schema as formSchema } from '@/components/RequestDemoForm'
import { corsMiddleware, cors } from '.'
import { z } from 'zod'
import mailer from '@/lib/nodemailer'
import logger from '@/utils/logger'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res, cors)

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

  const { name, email } = zod.data

  try {
    await mailer.sendMail({
      from: process.env.CONTACT_MAIL_USER,
      to: process.env.CONTACT_MAIL_TO,
      replyTo: `${name} <${email}>`,
      subject: `${name} - DEMO REQUEST VirtualProGalaxy`,
      text: `${name} Requested a demo of our products -- ${email}`,
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
  const { name, email } = data
  return `
    <h1>Virtual Pro Galaxy - Demo Request</h1>
    <p>${name} (${email}) Requested a demo of our products</p>
  `
}
