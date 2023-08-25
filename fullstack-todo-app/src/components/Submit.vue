<script setup>
import { ref, defineEmits } from 'vue';

const newTask = ref('');
const emit = defineEmits(['addTask']);

function addTask() {
  if (newTask.value.trim() !== '') {
    emit('addTask', newTask.value);
    newTask.value = '';
  }
}
</script>

<template>
 <div>
    <form @submit.prevent="addTask">
    <label for="task">Add a new task:</label>
    <input id="task" v-model="newTask" placeholder="Add a new task" />
    <button type="submit">Add</button>
  </form>
 </div>
</template>
