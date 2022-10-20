<template>
  <div class="input">
    <q-input v-model="text"
    type="text"
    label="Chat Command line"
    rounded
    standout
    autofocus
   />
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      text: ref('')
    }
  }
}
</script>

<style>
  .input {
    font-size: x-large;
    max-width: 70%;
    align-content: center;
    align-self: center;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
</style>
