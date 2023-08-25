<script setup>
import Submit from '@/components/Submit.vue'
import List from '@/components/List.vue'

import { ref } from 'vue';

const tasks = ref([]);

function addTask(task) {
  tasks.value.push({ text: task, completed: false });
}
</script>

<template>
<section class="container">
  <div class="img_container">
      <img src="@/assets/run.png"
      alt="run"  />
  </div>
<Submit @addTask="addTask" />
<List :tasks="tasks"/>
</section>
</template>
