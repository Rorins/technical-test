<script setup>
import { isAuthenticated, logout } from '@/auth.js'
import { ref } from 'vue'

//HEADER

//this will check the state of the navbar
const isNavbarOpen = ref(false)
const logoutRef = ref(logout)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <RouterLink class="navbar-brand" to="/todo">
      <h2>TO DO</h2>
    </RouterLink>
    <!-- The menu is initially closed and set to false it will become true if clicked and if that's the case it adds the show bootstrap class  -->
    <button
      @click="isNavbarOpen = !isNavbarOpen"
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      :aria-expanded="isNavbarOpen"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div :class="{ show: isNavbarOpen }" class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav justify-content-center">
        <i @click="isNavbarOpen = false" class="fa fa-times-circle"></i>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/todo"><span>Home</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/login"><span>Login</span></RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/sign-up"><span>Sign up</span></RouterLink>
        </li>
        <li v-if="isAuthenticated()" class="nav-item">
          <span @click="logoutRef" class="nav-link">Log out</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 100;
  .navbar-brand {
    margin-left: 20px;
  }
  .fa-times-circle {
    display: none;
    position: absolute;
    color: white;
    font-size: 50px;
    top: 30px;
    right: 30px;
    cursor: pointer;
  }
  .nav-item {
    cursor: pointer;
  }
}
@media (max-width: 991px) {
  .navbar-nav {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 102;
    background-color: rgba(0, 0, 0, 0.9);
    .fa-times-circle {
      display: block;
    }
    li {
      font-size: 50px;
    }
  }
  body {
    overflow: hidden;
  }
}
</style>
