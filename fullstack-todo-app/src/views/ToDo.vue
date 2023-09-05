<script setup>
import Submit from '@/components/Submit.vue'
import List from '@/components/List.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const tasks = ref([]);
const token = localStorage.getItem('token');
const decodedToken = jwtDecode(token);
const userId = decodedToken.user_id;

//I fetch to tasks from the database and show them when component is mounted
async function fetchTasks() {
  try {
    const response = await axios.get(`http://localhost/todo-backend/todo-app-backend/api.php?user_id=${userId}`);
    tasks.value = response.data;
    console.log(tasks.value, "tasks here")
  } catch (error) {
    console.error(error);
  }
}

//the function adds the task and expirydate sent from the submit component through the emit,  I will make
//a post request sending out the data to the backend
async function addTask(task) {
  console.log(userId, "user ID")
  try {
    if (userId) {
      task.userId = userId;
      await axios.post('http://localhost/todo-backend/todo-app-backend/api.php', task);
      fetchTasks(); 
    } else {
      console.error('User session data not found.');
    }
  } catch (error) {
    console.error(error);
  }
}

//Will show all the tasks when the component is mounted
onMounted(() => {
  fetchTasks();
})
</script>

<template>
<section class="to_do vh-100">
<div class="container ">

  <div class="headline d-flex flex-column align-items-center bg_primary box_design">
  <h1>Welcome to TO DO</h1>
</div>

<div class="row first_section">
  <!-- first column -->
<div class="col-6">
  <h2 class="bg_secondary text-white box_design">Tasks</h2>
  <Submit @addTask="addTask" />
  <List :tasks="tasks" @taskUpdate="fetchTasks"/>
</div>

 <!-- second column -->
<div class="col-6">
    <img class="picture bg_primary box_design" src="@/assets/vibing.png"
      alt="vibing"  />
</div>
</div>
</div>

</section>
</template>

<style scoped lang="scss">
.to_do{
  .headline{
    margin:60px 0;
  }
    .picture{
      width:400px;
      padding:20px;
    }
}
</style>


