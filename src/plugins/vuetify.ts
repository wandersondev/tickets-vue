/**
 * plugins/vuetify.ts
 * - Configuração do Vuetify (tema e opções básicas)
 */
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#2E7D32',  // verde acessível
          secondary: '#1565C0', // azul
          error: '#D32F2F'
        }
      }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  }
})
