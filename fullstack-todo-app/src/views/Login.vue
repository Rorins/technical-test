<script setup>
import FormElement from '@/components/FormElement.vue'
</script>

<!-- sign-up and sign-in are the views and inside of them there is my FormElement component -->
<!-- this is because I can have a component I can use anywhere I want, here or out of the login and sign-up view -->
<template>
  <div class="form_page vh-100">
    <div class="container h-100">
      <div class="d-flex justify-content-center align-items-center h-100">
        <FormElement title="Login" link="sign-up" text="Don't have an account" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
