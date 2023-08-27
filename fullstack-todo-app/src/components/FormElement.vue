<script setup>
import { defineProps, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter();
const email = ref('');
const password = ref('');

const props = defineProps({
  title: String,
  link: String,
  text: String,
});

async function registerUser() {
  const formData = {
    email: email.value,
    password: password.value,
  };

  const response = await fetch('http://localhost/todo-app-backend/register.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
 
  if (response.ok) {
    console.log('Registration successful.');
    router.push('/');
  } else {
    console.error('Registration failed.');
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

                <form class="text-white">
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
                    <button class="btn btn-light btn-lg btn-block" @click="registerUser" type="button">Button</button>
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