import './assets/styles/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const animate = autoAnimatePlugin

app.use(animate);
app.use(pinia);
app.mount('#app');
