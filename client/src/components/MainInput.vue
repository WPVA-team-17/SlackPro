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
import { MessageRequest } from 'frontEnd'
import { api } from 'src/boot/axios'
import { defineComponent, ref } from 'vue'
import chatsStore from '../stores/chats'

const chats = chatsStore()
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
      if (this.CLIinput.startsWith('/')) {
        this.onCommand()
      } else {
        this.onMessage()
      }
    },
    onCommand () {
      if (this.CLIinput.startsWith('/join')) {
        this.onJoin()
      }

      // Clear input
      this.CLIinput = ''
    },
    onJoin () {
      const chatName = this.CLIinput.split(' ')[1]
      const isPrivate = this.CLIinput.split(' ')[2] === 'private'
      this.$q.notify({
        message: `Joining ${chatName} chat as ${isPrivate ? 'private' : 'public'}`,
        color: 'green-3',
        textColor: 'white',
        icon: 'check_circle',
        position: 'top'
      })
      api.post('chat', {
        name: chatName,
        isPrivate
      })
        .then(response => {
          chats.addChat(response.data.chat)
          this.$q.notify({
            message: response.data.message,
            color: 'green-3',
            textColor: 'white',
            icon: 'check_circle',
            position: 'top'
          })
        })
        .catch(error => {
          this.$q.notify({
            message: error.response.data.message,
            color: 'negative',
            position: 'top',
            timeout: 80000
          })
        })
    },
    onMessage () {
      this.$socket.emit('message', {
        text: this.CLIinput,
        chatId: chats.currentChat?.id,
        userId: chats.getUserId
      } as MessageRequest)
      this.CLIinput = ''
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
