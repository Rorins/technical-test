<script setup>
import Submit from '@/components/Submit.vue'
import List from '@/components/List.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

//TODO MAIN COMPONENT

//All tasks will be saved in the main component
//I am using an external library to decode the token and retrieve the user id
const tasks = ref([])
const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const userId = decodedToken.user_id
const errorMessage = ref('')

//FUNCTIONS

//I fetch the tasks from the database and show them when component is mounted
async function fetchTasks() {
  try {
    const response = await axios.get(
      `http://localhost/todo-backend/todo-app-backend/api.php?user_id=${userId}`
    )
    tasks.value = response.data
    console.log(tasks.value, 'tasks here')
  } catch (error) {
    console.error(error)
  }
}

//the function adds the task and expirydate sent from the submit component through the emit,  I will make
//a post request sending out the data to the backend
//I want my main functions to remain in the todo component to mainain the state in the application
async function addTask(task) {
  try {
    if (userId) {
      task.userId = userId
      await axios.post('http://localhost/todo-backend/todo-app-backend/api.php', task)
      fetchTasks()
    } else {
      errorMessage.value = 'user data not found'
    }
  } catch (error) {
    errorMessage.value = error.response.data.message
  }
}

//To delete the task I get the taskId coming from the database add it to the query
//so I can make a delete request to delete the task related to the specific id
const deleteTask = (taskId) => {
  axios
    .delete(`http://localhost/todo-backend/todo-app-backend/api.php?id=${taskId}&user_id=${userId}`)
    .then(() => {
      fetchTasks()
    })
    .catch((error) => console.error(error))
}

//I am getting the index generated below in the list of tasks
//to access the tasks array so I can get the specific task I need
const toggleTask = (taskId) => {
  const task = tasks.value.find((task) => task.id === taskId)
  const completed = task.completed

  axios
    .put(`http://localhost/todo-backend/todo-app-backend/api.php?id=${taskId}&user_id=${userId}`, {
      completed
    })
    .then(() => {
      fetchTasks()
    })
    .catch((error) => console.error(error))
}

//Will show all the tasks when the component is mounted so they always get displayed
onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <section class="to_do vh-100">
    <div class="container">
      <div class="headline d-flex flex-column align-items-center bg_primary box_design">
        <h1>Welcome</h1>
      </div>

      <!-- To do columns -->

      <div class="row first_section">
        <!-- first column -->
        <div class="col-sm-12 col-md-6">
          <h2 class="bg_secondary text-white box_design">Tasks</h2>
          <Submit :errorMessage="errorMessage" @addTask="addTask" />
          <List :tasks="tasks" :deleteTask="deleteTask" :toggleTask="toggleTask" />
        </div>

        <!-- second column -->
        <div class="col-sm-12 col-md-6 d-flex flex-column align-items-center">
          <img class="picture bg_primary box_design" src="@/assets/vibing.png" alt="vibing" />
          <img class="picture bg_primary box_design" src="@/assets/walking.png" alt="vibing" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.to_do {
  .headline {
    margin: 60px 0;
    background-color: $secondary-color;
    color: $primary-color;
    padding: 10px;
  }
  .first_section {
    h2 {
      padding: 5px;
    }
    .picture {
      margin: 10px;
    }
    @media (max-width: 1216px) {
      //adapted bootstrap column to my case
      .col-md-6 {
        width: 100%;
      }
    }
  }
}
</style>
