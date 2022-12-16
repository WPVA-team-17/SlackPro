<template>
    <q-form
    @submit="onSubmit"
    class="q-gutter-md"
    >
    <q-input
    v-model="CLIinput"
    type="text"
    label="Chat Command line"
    outlined
    rounded
    bottom-slot
    autofocus
    debounce="250"
    color="primary"
    bg-color="green-14"
    label-color="green-3"
    input-class="cli-input"
    @update:model-value="checkInput"
    />
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainInput',
  setup () {
    return {
      CLIinput: ref('')
    }
  },
  methods: {
    onSubmit (evt: Event) {
      evt.preventDefault()
      if (this.CLIinput !== '') {
        this.$emit('cliInput', this.CLIinput)
        this.CLIinput = ''
      }
    },
    checkInput (text: string | number | null) {
      if (typeof text === 'string' && text.startsWith('/')) {
        this.$emit('cliCommand', this.CLIinput)
      }
    }
  }
})
</script>

<style>
.cli-input{
  font-size: 2em;
}
</style>
