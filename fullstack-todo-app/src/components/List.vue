<script setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['deleteTask','toggleTask']);
defineProps({
  tasks: Array,
})

function deleteTask(index) {
  emit('deleteTask', index);
}

function toggleTask(index) {
  emit('toggleTask', index);
}
</script>

<template>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" @change="toggleTask(index)" />
        {{ task.text }}
        <button @click="deleteTask(index)">Delete</button>
      </li>
    </ul>
  </template>
  
  <style lang="scss">
  
  </style>
  