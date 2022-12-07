const dev = process.env.NODE_ENV !== 'production'
export const serverURL = dev
   ? 'http://localhost:3000'
   : 'http://52.53.196.183:3000/'
