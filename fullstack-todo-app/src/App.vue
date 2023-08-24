<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Sign-up</RouterLink>
        <RouterLink to="/sign-in">Sign-in</RouterLink>
        <RouterLink to="/to-do">To-do</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">

</style>
