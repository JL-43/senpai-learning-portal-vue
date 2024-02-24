import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import BoardView from './views/BoardView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/board/:boardType', // Dynamic segment for board type
    name: 'board',
    component: BoardView,
    props: true, // Pass route params as props to the component
  },
  // other routes...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
