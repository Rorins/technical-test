import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import ToDo from '../views/ToDo.vue'
// import { authenticatedUser } from '@/auth.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    //will go to the todo page only if authenticated in case of login page
    //the todo app is protected if you
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo,
    }
  ]
})


export default router
