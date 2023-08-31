<script setup>
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';

const userSessionData = JSON.parse(localStorage.getItem('user'));
const emit = defineEmits(['taskUpdate']);

//Getting all of my tasks from the parent component to show them 
const props = defineProps({
  tasks: Array,
})

//To delete the task I get the taskId coming from the database add it to the query
//so I can make a delete request to delete the task related to the specific id
function deleteTask(taskId) {
  axios.delete(`http://localhost/todo-app-backend/api.php?id=${taskId}&user_id=${userSessionData.id}`)
  .then(() => {
      emit('taskUpdate'); // Emit
    })
    .catch(error => console.error(error));
}

function toggleTask(taskId, index) {
  //I am getting the index generated below in the list of tasks
  //to access the props.tasks array so I can get the specific task I need
  const completed = props.tasks[index].completed;
  axios.put(`http://localhost/todo-app-backend/api.php?id=${taskId}&user_id=${userSessionData.id}`, { completed })
  .then(() => {
      emit('taskUpdate'); // Emit
    })
    .catch(error => console.error(error));
}
</script>

<template>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <!-- I was getting a 0 string value initially from the database so I converted it to a number -->
        <input type="checkbox" @change="toggleTask(task.id, index)" v-model="task.completed" />
        {{ task.title }}
        {{ task.expiry_date }}
        {{ task.id }}
        {{ task.completed}}
        {{ console.log(task.completed, "am printing here")}}
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </template>
  
  <style lang="scss">
  
  </style>
  