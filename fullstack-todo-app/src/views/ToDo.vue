<script setup>
import Submit from '@/components/Submit.vue'
import List from '@/components/List.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

const tasks = ref([]);
const userSessionData = JSON.parse(localStorage.getItem('user'));

//I fetch to tasks from the database and show them when component is mounted
async function fetchTasks() {
  try {
    const response = await axios.get(`http://localhost/todo-app-backend/api.php?user_id=${userSessionData.id}`);
    tasks.value = response.data;
    console.log(tasks.value, "tasks here")
  } catch (error) {
    console.error(error);
  }
}

//the function adds the task and expirydate sent from the submit component through the emit,  I will make
//a post request sending out the data to the backend
async function addTask(task) {
  try {
    if (userSessionData) {
      task.userId = userSessionData.id;
      await axios.post('http://localhost/todo-app-backend/api.php', task);
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
<div class="container d-flex justify-content-center flex-column align-items-center ">
  <div class="headline">
      <img src="@/assets/run.png"
      alt="run"  />
  <h1>Welcome to your to do app</h1>
</div>
<Submit @addTask="addTask" />
<List :tasks="tasks" @taskUpdate="fetchTasks"/>
  </div>
</section>
</template>

<style scoped lang="scss">

</style>


