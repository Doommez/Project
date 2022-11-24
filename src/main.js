import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify.js';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount('#app');
