import {createRouter, createWebHashHistory} from 'vue-router';
import BaseFilterVuetify from './components/BaseFilterVuetify.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: BaseFilterVuetify,
    },
  ],
});
