/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'avatars0.githubusercontent.com',
      'github.com'
    ]
  },
  future: {
    webpack5: true
  }
})
