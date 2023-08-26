<script setup>
import Submit from '@/components/Submit.vue'
import List from '@/components/List.vue'
import { ref } from 'vue';

const tasks = ref([]);

function addTask(task) {
  tasks.value.push({ text: task, completed: false });
}

function deleteTask(index) {
  console.log(tasks.value)
  tasks.value.splice(index, 1);
}

function toggleTask(index) {
  tasks.value[index].completed = !tasks.value[index].completed;
  console.log(tasks.value[index].completed)
}
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
<List @deleteTask="deleteTask" @toggleTask="toggleTask" :tasks="tasks"/>
  </div>
</section>
</template>

<style scoped lang="scss">

</style>


