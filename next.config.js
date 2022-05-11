const withImages = require('next-images')

module.exports = withImages({
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
})
