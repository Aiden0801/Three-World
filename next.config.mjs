import makeWithPWA from 'next-pwa'

const withPWA = makeWithPWA({
  dest: 'public',

  // this will enable the PWA in development mode as well.
  disable: process.env.NODE_ENV === 'development' // is the default.
  // comment out to only work in production mode.
//   disable: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
}

export default withPWA(nextConfig)
