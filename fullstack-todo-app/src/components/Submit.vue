<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['addTask']);
const newTask = ref('');
const expirationDate = ref('');
const selectedCategory = ref(null);

//will send out all the data as an object to the parent component
//I am using the ternary operator since the dabase is expecting a data type and I have string
//to avoid the error I transform it to null if the value is empty
function addTask() {
  if (newTask.value.trim() !== '') {
    emit('addTask',  { title: newTask.value,
       expiryDate: expirationDate.value === '' ? null : expirationDate.value ,
       category_id: selectedCategory.value,
      });
    console.log(selectedCategory.value)
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

    <label for="select-category">Select category:</label>
    <select id="select-category" v-model="selectedCategory">
      <option value="1">Work & Personal</option>
      <option value="2">Family & Home</option>
      <option value="3">Social & Entertainment</option>
      <option value="4">Education & Learning</option>
      <option value="5">Finance & Budgeting</option>
      <option value="6">Travel & Leisure</option>
      <option value="7">Career & Growth</option>
      <option value="8">Miscellaneous</option>
    </select>

  </form>
 </div>
</template>
