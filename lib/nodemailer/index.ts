import logger from '@/utils/logger'
import nodemailer from 'nodemailer'

const transporter = () => {
  logger.debug('creating mail transporter')
  return nodemailer.createTransport({
    host: process.env.CONTACT_MAIL_HOST,
    port: +(process.env.CONTACT_MAIL_PORT || 587),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.CONTACT_MAIL_USER || '',
      pass: process.env.CONTACT_MAIL_PASS || '',
    },
  })
}

export default transporter()
