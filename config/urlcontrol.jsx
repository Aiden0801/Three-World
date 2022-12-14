const dev = process.env.NODE_ENV !== 'production'
export const serverURL = dev
   ? 'http://localhost:3000'
   : 'http://hhhqcontrolpanel.tk'
export const clientAppURL = 'https://hhhq-web-landing.vercel.app'
