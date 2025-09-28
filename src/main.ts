/**
 * main.ts
 * - Bootstrap da aplicação Vue, registra Vuetify, Pinia e Router
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Vuetify styles
import 'vuetify/styles'
// MDI Icons (também carregado via CDN no index, aqui garante bundling local se necessário)
// import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
