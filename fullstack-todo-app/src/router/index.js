import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/auth.js'
import NotFound from "@/views/NotFound.vue";
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import ToDo from '../views/ToDo.vue'

//TOKEN BASED AUTHENTICATION

//We use isAuthenticated to centralize the authentication logic
//if we received a token from the backend the user is authenticated and we can access the main component
//if not he gets pushed back to the login route

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //the user will by default access the login page
    {
      path: '/',
      redirect: '/login'
    },
    // for paths that are not setted
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
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
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

export default router
