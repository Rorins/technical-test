<script setup>
import { authenticatedUser } from '@/auth.js';
import { useRouter } from 'vue-router';

const router = useRouter();

//loggin out by checking the local storage and removing the user from there
function logOut(){
    if (authenticatedUser()){
        localStorage.removeItem("user");
        router.push('/login');
    }
}

</script>

<template>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <RouterLink class="navbar-brand" to="/todo">
    <h2>TO DO</h2>
  </RouterLink>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav justify-content-center">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/login"><span>login</span></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/sign-up"><span>sign  up</span></RouterLink>
      </li>
      <li class="nav-item">
        <span v-if="authenticatedUser()" @click="logOut" class="nav-link">Log out</span>
      </li>
    </ul>
  </div>
</nav>
</template>
  
  <style lang="scss">
 .navbar{
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  .navbar-brand{
    margin-left:20px;
  }
  .nav-item{
      cursor:pointer;
    }
 }
  </style>
  