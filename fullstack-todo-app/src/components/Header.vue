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
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <RouterLink class="nav-link" to="/todo"><h2>TO DO</h2></RouterLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/login"><h2>login</h2></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/sign-up"><h2>sign-up</h2></RouterLink>
      </li>
      <li class="nav-item">
        <h2 v-if="authenticatedUser()" @click="logOut" class="nav-link">Log-out</h2>
      </li>
    </ul>
  </div>
</nav>
</template>
  
  <style lang="scss">
  
  </style>
  