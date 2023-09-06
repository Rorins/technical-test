<script setup>
import { defineProps, computed } from 'vue'

//Getting all of my tasks from the parent component to show them
//and passing callback functions
const props = defineProps({
  tasks: Array,
  deleteTask: Function,
  toggleTask: Function
})

//Date formatting

//this represents today
const today = new Date()
today.setHours(0, 0, 0, 0)
//this represents tomorrow
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

//Date function

//Filtering dates for today or tomorrow
function filterTasksByDate(tasks, date) {
  return tasks.filter((task) => {
    if (task.expiry_date === null) {
      return
    } else {
      const taskDate = new Date(task.expiry_date)
      taskDate.setHours(0, 0, 0, 0)
      return taskDate.getTime() === date.getTime()
    }
  })
}

//for the dates, I am using computed because it updates every time the args change
//so I can display it correctly in the ui
const todayTasks = computed(() => {
  return filterTasksByDate(props.tasks, today)
  //will have a filtered array with tasks of today
})

const tomorrowTasks = computed(() => {
  return filterTasksByDate(props.tasks, tomorrow)
  //will have a filtered array with tasks of tomorrow
})

//showing all the other ones that don't meet the condition
const otherTasks = computed(() => {
  return props.tasks.filter((task) => {
    const taskDate = new Date(task.expiry_date)
    taskDate.setHours(0, 0, 0, 0)
    return (
      (taskDate.getTime() !== today.getTime() && taskDate.getTime() !== tomorrow.getTime()) ||
      task.expiry_date == null
    )
  })
})
</script>

<template>
  <div class="tasks_section">
    <h2>Today</h2>

    <div class="table_wrap box_design table-responsive">
      <table>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task Name</th>
            <th>Expiry Date</th>
            <th>Category Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="(task, index) in todayTasks" :key="index">
            <td>
              <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
            </td>
            <td>{{ task.title }}</td>
            <td>{{ task.expiry_date ? task.expiry_date : 'None' }}</td>
            <td>{{ task.category_name }}</td>
            <td>
              <button class="btn btn-dark" @click="deleteTask(task.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Tomorrow</h2>

    <div class="table_wrap box_design table-responsive">
      <table>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task Name</th>
            <th>Expiry Date</th>
            <th>Category Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="(task, index) in tomorrowTasks" :key="index">
            <td>
              <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
            </td>
            <td>{{ task.title }}</td>
            <td>{{ task.expiry_date ? task.expiry_date : 'None' }}</td>
            <td>{{ task.category_name }}</td>
            <td>
              <button class="btn btn-dark" @click="deleteTask(task.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>Other</h2>

    <div class="table_wrap box_design table-responsive">
      <table>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task Name</th>
            <th>Expiry Date</th>
            <th>Category Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="(task, index) in otherTasks" :key="index">
            <td>
              <input type="checkbox" @change="toggleTask(task.id)" v-model="task.completed" />
            </td>
            <td>{{ task.title }}</td>
            <td>{{ task.expiry_date ? task.expiry_date : 'None' }}</td>
            <td>{{ task.category_name }}</td>
            <td>
              <button class="btn btn-dark" @click="deleteTask(task.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles/variables.scss';
.tasks_section {
  margin-top: 30px;
  @media (max-width: 548px) {
    .table-responsive {
      overflow-x: auto;
    }
  }
  .table_wrap {
    margin: 10px 0;
    table {
      width: 100%;
      background-color: white;
      color: $secondary-color;
      border-collapse: collapse;
      tr {
        text-align: center;
        th {
          background-color: $secondary-color;
          color: white;
          padding: 10px;
          border: 1px solid white;
        }
      }
      td {
        padding: 10px;
        border: 1px solid white;
      }
    }
  }

  input[type='checkbox'] {
    accent-color: black;
  }
}
</style>
