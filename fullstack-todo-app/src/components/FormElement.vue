<script setup>
import { defineProps, ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import axios from 'axios'

//FORM COMPONENT

//I am using the Form Element as a general component that can be used anywhere,
//this is why I pass props so I can pass data according to what I want to fill this form with
const props = defineProps({
  title: String,
  link: String,
  text: String
})

const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

//Here I check if route is login or sign-up( I compare it by default to login )
//This will help me in making different requests to the backend, one for login and one for Sign up
const isLoginRoute = route.name === 'login'

async function handleAuthentication() {
  errorMessage.value = ''
  //Frontend validation
  if (!email.value || !password.value) {
    errorMessage.value = 'Email and password are required.'
    return
  }

  //Data I need to send is in object format
  const formData = {
    email: email.value,
    password: password.value
  }

  //I send the post request to the backend acording to the route I am in
  try {
    const url = isLoginRoute
      ? 'http://localhost/todo-backend/todo-app-backend/login.php'
      : 'http://localhost/todo-backend/todo-app-backend/register.php'

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      //if login goes well a token from the backend will be saved in the frontend and the user will be pushed to the main todo route
      //Using the token helps me in knowing if the user is logged in or not
      localStorage.setItem('token', JSON.stringify(response.data.token))
      router.push('/todo')
    }
  } catch (error) {
    //all other errors for validation will be displayed in the error const
    errorMessage.value = error.response.data.message
  }
}
</script>

<template>
  <div class="form box_design text-center">
    <!-- image -->
    <figure class="img_container">
      <img class="side_img" src="@/assets/todo.png" alt="guy with papers" />
    </figure>

    <!-- Form -->
    <aside>
      <form class="text-white" @submit.prevent="handleAuthentication">
        <div class="title d-flex align-items-center mb-4">
          <img class="logo" src="@/assets/checklist-white.png" alt="logo" />
          <h1>TO DO</h1>
        </div>

        <h2>{{ title }}</h2>

        <div class="mb-4">
          <input type="email" id="email" v-model="email" class="form-control form-control-lg" />
          <label class="form-label" for="email">Email address</label>
        </div>

        <div class="mb-4">
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control form-control-lg"
          />
          <label class="form-label" for="password">Password</label>
        </div>

        <div class="error_message" v-if="errorMessage">{{ errorMessage }}</div>

        <div>
          <button type="submit" class="btn btn-light btn-lg btn-block mb-4">Submit</button>
        </div>

        <span
          >{{ text }}? <RouterLink class="link" :to="`/${link}`">{{ link }}</RouterLink></span
        >
      </form>
    </aside>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

/* form component */
.form {
  display: flex;
  background-color: $primary-color;
  @media (max-width: 998px) {
    display: block;
  }
  /* figure */
  figure {
    margin: auto 10px;
    background-color: $primary-color;
    padding: 50px;
    border-radius: 10px;
  }
  .img_container {
    height: fit-content;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  /* aside form*/
  aside {
    width: 400px;
    background-color: #212529;
    padding: 50px;
    border-radius: 10px;
    @media (max-width: 998px) {
      width: 100%;
    }
    .title {
      @media (max-width: 998px) {
        justify-content: center;
      }
    }

    img.logo {
      width: 60px;
      padding: 10px;
      border-radius: 50%;
      margin-right: 20px;
      background-color: white;
    }
    .form-control {
      border: 1px solid #cec8c8;
      &:focus {
        background-color: rgb(235, 230, 230);
      }
    }
    .error_message {
      color: red;
    }
    .link {
      color: $tertiary-color;
    }
  }
}
</style>
