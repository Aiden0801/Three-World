import mailer from '@/lib/nodemailer'
import { NextApiHandler } from 'next'
import { z } from 'zod'
import { cors, corsMiddleware } from '.'

const schema = z.object({
  companyName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  websiteUrl: z.string().url(),
  streetAddress: z.string(),
  streetAddress2: z.string().optional(),
  city: z.string(),
  stateRegion: z.string(),
  postalCode: z.string(),
  countryRegion: z.string(),
  annualRevenue: z.string(),
  numberOfEmployees: z.string(),
  facebookCompanyPage: z.string().url().optional(),
  linkedInCompanyPage: z.string().url().optional(),
  twitterHandle: z.string().optional(),
  industry: z.string(),
})

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res, cors)

  const zod = schema.safeParse(req.body)

  if (zod.success == false) {
    res.status(400).json({
      error: 'Invalid data',
      success: false,
      errors: zod.error.format(),
    })
    return
  }

  const { data } = zod
  try {
    await mailer.sendMail({
      from: process.env.CONTACT_MAIL_USER,
      to: process.env.CONTACT_MAIL_TO,
      replyTo: `${data.firstName} ${data.lastName} <${data.email}>`,
      subject: `${data.firstName} ${data.lastName} - Growth Program Application`,
      text: `${data.firstName} ${data.lastName} Applied to the Growth Program -- ${data.email}`,
      html: template(data),
    })
    res.status(200).json({
      name: 'Application sent. We will be in touch soon',
      success: true,
    })
  } catch (error) {
    // TODO: this error should be more specific. if the error comes from
    // nodemailer, it should be a 400. if it comes from the server, it should
    // be a 500.
    res.status(500).json({ error: 'Internal Server Error', success: false })
  }
}

function template(data: z.output<typeof schema>) {
  const {
    companyName,
    firstName,
    lastName,
    email,
    phoneNumber,
    websiteUrl,
    streetAddress,
    streetAddress2,
    city,
    stateRegion,
    postalCode,
    countryRegion,
    annualRevenue,
    numberOfEmployees,
    facebookCompanyPage,
    linkedInCompanyPage,
    twitterHandle,
    industry,
  } = data
  return `
    <h1>Virtual Pro Galaxy - Demo Request</h1>
    <p>${firstName} ${lastName} (${email}) Applied to
    the Growth Ignition Program on behalf of ${companyName}.</p>
    <p>Form data</p>
    <ul>
      <li>Company name: ${companyName}</li>
      <li>First name: ${firstName}</li>
      <li>Last name: ${lastName}</li>
      <li>Email: ${email}</li>
      <li>Phone number: ${phoneNumber}</li>
      <li>Website URL: ${websiteUrl}</li>
      <li>Street address: ${streetAddress}</li>
      <li>Street address 2: ${streetAddress2}</li>
      <li>City: ${city}</li>
      <li>State/Region: ${stateRegion}</li>
      <li>Postal code: ${postalCode}</li>
      <li>Country/Region: ${countryRegion}</li>
      <li>Annual revenue: ${annualRevenue}</li>
      <li>Number of employees: ${numberOfEmployees}</li>
      <li>Facebook company page: ${facebookCompanyPage}</li>
      <li>LinkedIn company page: ${linkedInCompanyPage}</li>
      <li>Twitter handle: ${twitterHandle}</li>
      <li>Industry: ${industry}</li>
    </ul>
  `
}
