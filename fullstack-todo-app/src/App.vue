<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>
<!-- I added routing, so the main infrastructure will always have the same header and the routerView will change
according to the view that is set up in the routing system -->

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>
