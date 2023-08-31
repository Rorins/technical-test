<script setup>
import { defineProps, ref } from 'vue';
import { RouterLink, useRouter, useRoute} from 'vue-router'
import axios from 'axios';

const props = defineProps({
  title: String,
  link: String,
  text: String,
});

const route = useRoute();
const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('')

//checking if route is login or sign-up
const isLoginRoute = route.name === 'login';
console.log(route.name, "route name")

async function handleAuthentication() {
  const formData = {
    email: email.value,
    password: password.value,
  };
  console.log(formData, 'FORM DATA SENT');

  try {
    console.log('isLoginRoute:', isLoginRoute);
    const url = isLoginRoute ? 'http://localhost/todo-app-backend/login.php' : 'http://localhost/todo-app-backend/register.php';
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      if (isLoginRoute) {
        console.log('Login successful.', response.data.message);
        //if login goes well the user will be saved to local storage in json format
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/todo');
      } else {
        console.log('Registration successful.', response.data.message);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/todo');
      }
    }
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
}
</script>

<template>
<section class="form_element vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div>
          <div class="row">
            <div class="col-md-6 col-lg-5 d-flex align-items-center justify-content-center">
              <div class="img_container">
                <img class="log_img" src="@/assets/todo.png"
                alt="guy with papers"  />
            </div>
              </div>
            <div class="col-md-6 col-lg-7 text-center">
              <div>

                <div v-if="errorMessage">{{ errorMessage }}</div>

                <form class="text-white" @submit.prevent="handleAuthentication">
                  <div class="d-flex align-items-center">
                    <div class="img_container">
                      <img class="logo" src="@/assets/logo.svg"
                      alt="logo"  />
                    </div>
                    <h1>TO DO</h1>
                  </div>

                  <div class="form-outline">
                    <input type="email" id="email" v-model="email" class="form-control form-control-lg" />
                    <label class="form-label" for="email">Email address</label>
                  </div>

                  <div class="form-outline">
                    <input type="password" id="password" v-model="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div>
                    <button type="submit" class="btn btn-light btn-lg btn-block">Submit</button>
                  </div>

                  <p>{{ text }}? <RouterLink :to="`/${link}`">{{ link }}</RouterLink></p>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<style scoped lang="scss">
.form_element{
  .img_container{
    img{
        height:100%;
        width:100%;
        object-fit:cover;
      }
    img.logo{
    background-color:white;
    width:50px;
    padding:10px;
    border-radius:50%;
    margin-right:20px;
  }
  img.log_img{
        background-color:white;
        padding:10px;
        border-radius:20px;
  }
  }
    form{
      padding:50px;
      border-radius:20px;
      background-color:black;
    }
}
</style>