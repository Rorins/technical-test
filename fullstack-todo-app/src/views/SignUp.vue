<script setup>
import FormElement from '@/components/FormElement.vue'
</script>

<!-- sign-up and sign-in are the views and inside of them there is my FormElement component -->
<template>
    <div class="form_page vh-100">
      <div class="container h-100">
        <div class=" d-flex justify-content-center align-items-center h-100">

          <FormElement 
          title="Sign-up"
          link="login"
          text="Already a user"
          />

        </div>
      </div>
    </div>
    
</template>
