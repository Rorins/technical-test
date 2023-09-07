<script setup>
import { ref, defineEmits, defineProps  } from 'vue'

//Here we have the function we want to emit
const emit = defineEmits(['addTask'])
const newTask = ref('')
const expirationDate = ref('')
const selectedCategory = ref(null)

const props = defineProps({
  errorMessage: String,
})


//will send out all the data as an object to the parent component
//I am using the ternary operator since the database is expecting a data type and I have string
//to avoid the error I transform it to null if the value is empty
function addTask() {
  if (newTask.value.trim() !== '') {
    emit('addTask', {
      title: newTask.value,
      expiryDate: expirationDate.value === '' ? null : expirationDate.value,
      category_id: selectedCategory.value,
    })
    newTask.value = ''
  }
}
</script>

<template>
  <div>
    <!-- the submit will give the possibiity to choose the expiration date and the 
  name of the task before submitting -->
    <form class="box_design bg_primary d-flex" @submit.prevent="addTask">
      <section>
        <div>
          <label for="task">Add a new task:</label>
          <input id="task" v-model="newTask" placeholder="Add a new task" />
        </div>

        <div>
          <label for="expiration">Expiration Date:</label>
          <input type="date" id="expiration" v-model="expirationDate" />
        </div>

        <div>
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
        </div>

        <div v-if="props.errorMessage" class="error_message">{{ props.errorMessage }}</div>
      </section>

      <section class="add">
        <button type="submit">
          <i class="fas fa-plus"></i>
        </button>
      </section>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
form {
  padding: 10px;
  .error_message{
    color:red;
  }
  label {
    background-color: $secondary-color;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0;
    margin-right: 10px;
  }
  input {
    border: 1px solid black;
    border-radius: 10px;
  }
  select {
    border: 1px solid black;
    border-radius: 10px;
  }
  .add {
    margin: auto;
    button {
      width: 60px;
      height: 60px;
      background-color: $secondary-color;
      border-radius: 50%;
      i {
        color: white;
        font-size: 30px;
      }
    }
  }
}
</style>
