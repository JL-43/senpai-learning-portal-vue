// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import GeneralBoard from './views/GeneralBoard.vue';
import OTCBoard from './views/OTCBoard.vue';
import SCMBoard from './views/SCMBoard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/general-board',
    name: 'generalBoard',
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
