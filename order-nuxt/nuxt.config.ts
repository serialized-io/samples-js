export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png'
        }],
      noscript: [
        {children: 'Javascript is required'}
      ]
    }
  },
  runtimeConfig: {
    serializedAccessKey: process.env.SERIALIZED_ACCESS_KEY,
    serializedSecretAccessKey: process.env.SERIALIZED_SECRET_ACCESS_KEY,
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ]
})
