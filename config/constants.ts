const DEV = process.env.NODE_ENV !== 'production'

// temporary deployment url for this project
const hhhqcontrolpanel = 'http://hhhqcontrolpanel.tk'
// web-landing deployment url on vercel
const clientVercel = 'https://hhhq-web-landing.vercel.app'

export const localhost = (port = 3000) => `http://localhost:${port}` as const

const server = process.env.API_URL ?? (DEV ? localhost(3000) : hhhqcontrolpanel)
const client = process.env.WEB_LANDING_URL ?? clientVercel

export const BASE_URL = {
  SERVER: server,
  CLIENT: client,
} as const
