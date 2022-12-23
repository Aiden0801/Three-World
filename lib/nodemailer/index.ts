import logger from '@/utils/logger'
import nodemailer from 'nodemailer'
import { transport } from 'pino'

const transporter = nodemailer.createTransport({
  host: process.env.CONTACT_MAIL_HOST || '',
  port: process.env.CONTACT_MAIL_PORT || 587,
  auth: {
    user: process.env.CONTACT_MAIL_USER || '',
    pass: process.env.CONTACT_MAIL_PASS || '',
  },
})


/** Verify that the transport is correctly set up */
const verifyTransport = () => {
  let error_ = false
  transporter.verify(function (error, success) {
    error_ = error
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Server is ready to take our messages')
    }
  })
  return error_
}


export const sendMail = (mailOptions: nodemailer.SendMailOptions) => {
  if (!verifyTransport()) {
    logger.error('Transporter is not correctly set up')
    return
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error)
    } else {
      logger.debug('Email sent: ' + info.response)
    }
  })
}

export const mailer = {
  transport,
  sendMail,
  isTransportOk: verifyTransport()
}
export default mailer
