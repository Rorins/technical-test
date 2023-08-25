<script setup>
import { defineProps } from 'vue';

defineProps({
  tasks: String,
})
</script>

<template>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        {{ task.text }}
      </li>
    </ul>
  </template>
  
  <style lang="scss">
  
  </style>
  