<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['addTask']);
const newTask = ref('');
const expirationDate = ref('');

//will send out all the data as an object to the parent component
function addTask() {
  if (newTask.value.trim() !== '') {
    emit('addTask',  { title: newTask.value, expiryDate: expirationDate.value });
    newTask.value = '';
  }
}
</script>

<template>
 <div>
  <!-- the submit will give the possibiity to choose the expiration date and the 
  name of the task before submitting -->
    <form @submit.prevent="addTask">
    
    <label for="task">Add a new task:</label>
    <input id="task" v-model="newTask" placeholder="Add a new task" />

    <label for="expiration">Expiration Date:</label>
      <input type="date" id="expiration" v-model="expirationDate" />
    <button type="submit">Add</button>
  </form>
 </div>
</template>
