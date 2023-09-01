<script setup>
import { defineProps, ref } from 'vue';
import { RouterLink, useRouter, useRoute} from 'vue-router'
import axios from 'axios';

//I am using the Form Element as a general component that can be used anywhere,
//this is why I pass props so I can pass data according to what I want to fill this form with
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

//checking if route is login or sign-up( I compare it by default to login )
const isLoginRoute = route.name === 'login';
console.log(route.name, "route name")

//Saving email and password in the object formData that I ill send to the database
async function handleAuthentication() {
  const formData = {
    email: email.value,
    password: password.value,
  };
  console.log(formData, 'FORM DATA SENT');

  //I send the post request to the backend and give back the response
  try {
    console.log('isLoginRoute:', isLoginRoute);
    const url = isLoginRoute ? 'http://localhost/todo-app-backend/login.php' : 'http://localhost/todo-app-backend/register.php';
    
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
        //if login goes well the user will be saved to local storage in json format and pushed to the main todo route
        //I will use the localstorage to know which user is logged in and show the content according to who he is
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/todo');
    }
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
}
</script>

<template>
            <div class="form_modal text-center">
            
              <!-- image -->
              <figure class="img_container">
                <img class="side_img" src="@/assets/todo.png"
                alt="guy with papers"  />
              </figure>
              
              <!-- Form -->
              <aside>

                <form class="text-black" @submit.prevent="handleAuthentication">
                  <div class="title d-flex align-items-center mb-2">
                      <img class="logo" src="@/assets/checklist.png"
                      alt="logo"  />
                    <h1>TO DO</h1>
                  </div>

                  <div class="mb-4">
                    <input type="email" id="email" v-model="email" class="form-control form-control-lg" />
                    <label class="form-label" for="email">Email address</label>
                  </div>

                  <div class="mb-4">
                    <input type="password" id="password" v-model="password" class="form-control form-control-lg" />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <div class="error_message" v-if="errorMessage">{{ errorMessage }}</div>

                  <div>
                    <button type="submit" class="btn btn-dark btn-lg btn-block mb-4">Submit</button>
                  </div>
                  

                  <span>{{ text }}? <RouterLink class="link" :to="`/${link}`">{{ link }}</RouterLink></span>
                </form>
              </aside>
              
            </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

/* form component */
  .form_modal{
    display:flex;
    border-radius:10px;
    padding:50px;
    background-color:$primary-color;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    @media (max-width: 998px) {
    display: block;
   }
    /* figure */
    figure{
      margin:auto 40px;
    }
    .img_container{
      height:fit-content;
    img{
        height:100%;
        width:100%;
        object-fit:cover;
      }
  }
  /* aside form*/
    aside{
      width:400px;
      @media (max-width: 998px) {
      width:100%;
    }
    .title{
      @media (max-width: 998px) {
      justify-content:center;
    }
    }
    
      img.logo{
      width:60px;
      padding:10px;
      border-radius:50%;
      margin-right:20px;
    }
    .form-control{
      border:1px solid #cec8c8;
      &:focus{
        background-color:rgb(235, 230, 230);
      }
    }
    .error_message{
      color:red;
    }
    .link{
      color:$tertiary-color;
    }
    }
  }
  
</style>