// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import GeneralBoard from './views/GeneralBoard.vue';
import OTCBoard from './views/OTCBoard.vue';
import SCMBoard from './views/SCMBoard.vue';

const routes = [
  {
    path: '/',
    name: 'general',
    component: GeneralBoard
  },
  {
    path: '/otc',
    name: 'otc',
    component: OTCBoard
  },
  {
    path: '/scm',
    name: 'scm',
    component: SCMBoard
  }
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
