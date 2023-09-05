<script setup>
import { defineProps, defineEmits,computed } from 'vue';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const decodedToken = jwtDecode(token);
const userId = decodedToken.user_id;

const emit = defineEmits(['taskUpdate']);
//Getting all of my tasks from the parent component to show them 
const props = defineProps({
  tasks: Array,
})

//this represents today
const today = new Date();
  today.setHours(0, 0, 0, 0);
  //this represents tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

//To delete the task I get the taskId coming from the database add it to the query
//so I can make a delete request to delete the task related to the specific id
function deleteTask(taskId) {
  console.log(userId, "user ID")
  axios.delete(`http://localhost/todo-backend/todo-app-backend/api.php?id=${taskId}&user_id=${userId}`)
  .then(() => {
      emit('taskUpdate'); // Emit
    })
    .catch(error => console.error(error));
}

function toggleTask(taskId) {
  //I am getting the index generated below in the list of tasks
  //to access the props.tasks array so I can get the specific task I need
  const task = props.tasks.find(task => task.id === taskId);
  const completed = task.completed;
  console.log(completed, "checkbox here")
  axios.put(`http://localhost/todo-backend/todo-app-backend/api.php?id=${taskId}&user_id=${userId}`, { completed })
  .then(() => {
      emit('taskUpdate'); // Emit
    })
    .catch(error => console.error(error));
}
//Date function

//Filtering dates for today or tomorrow
function filterTasksByDate(tasks, date) {
  return tasks.filter(task => {
    if (task.expiry_date === null) {
      return
    } else {
      const taskDate = new Date(task.expiry_date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === date.getTime();
    }
  });
}

//for the dates, I am using computed because it updates every time the args change
//so I can display it correctly in the ui
const todayTasks = computed(() => {
  return filterTasksByDate(props.tasks, today);
  //will have a filtered array with tasks of today
});

const tomorrowTasks = computed(() => {
  return filterTasksByDate(props.tasks, tomorrow);
  //will have a filtered array with tasks of tomorrow
});

//showing all the other ones that don't meet the condition
const otherTasks = computed(() => {
  return props.tasks.filter((task) => {
      const taskDate = new Date(task.expiry_date);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() !== today.getTime() && taskDate.getTime() !== tomorrow.getTime() || task.expiry_date == null;
  });
});
</script>

<template>
  <h2>Today</h2>
  <ul>
        <li class="item" v-for="(task, index) in todayTasks" :key="index">
        <!-- I was getting a 0 string value initially from the database so I converted it to a number -->
        <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
        {{ task.title }}
        {{ task.expiry_date }}
        {{ task.category_name }}
        {{ todayTasks }}
        <button class="btn btn-dark " @click="deleteTask(task.id)">Remove</button>
      </li>
  </ul>
  
      <h2>Tomorrow</h2>
      <ul>
      <li class="item" v-for="(task, index) in tomorrowTasks" :key="index">
        <!-- I was getting a 0 string value initially from the database so I converted it to a number -->
        <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
        {{ task.title }}
        {{ task.expiry_date }}
        {{ task.category_name }}
        {{ tomorrowTasks }}
        <button class="btn btn-dark " @click="deleteTask(task.id)">Remove</button>
      </li>
    </ul>

      <h2>Other</h2>
      <ul>
      <li class="item" v-for="(task, index) in otherTasks" :key="index">
        <!-- I was getting a 0 string value initially from the database so I converted it to a number -->
        <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
        {{ task.title }}
        {{ task.expiry_date }}
        {{ task.category_name }}
        {{ otherTasks }}
        <button class="btn btn-dark " @click="deleteTask(task.id)">Remove</button>
      </li>
    </ul>
  </template>
  
  <style lang="scss">
  ul{
    .item{
      background-color:white;
      border-radius:10px;
      padding:10px;
    }
    list-style-type:none;
    input[type=checkbox] {
      accent-color: black;
    }
  }
  </style>
  