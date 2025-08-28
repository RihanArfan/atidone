export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@pinia/colada-nuxt'
  ],
  devtools: {
    enabled: true
  },
  css: ['~/assets/main.css'],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-08-07',
  nitro: {
    database: {
      DB: {
        connector: 'postgresql',
        options: {
          connectionString: process.env.POSTGRES_URL
        }
      }
    },
    devDatabase: {
      DB: {
        connector: 'pglite',
        options: {
          dataDir: '.data/hub/pglite'
        }
      }
    }
  },
  hub: {
    database: true
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  }
})
