<template>
  <q-layout view="lHh Lpr lFf" ref="ScrollContainer">
    <q-infinite-scroll :offset="250" reverse class="q-pa-md q-pb-xl" ref="scroll">
      <q-chat-message v-for="item in items" :key="item.id"
        :name=item.name
        :text=[item.text]
        :sent="item.sent"
        :stamp="item.stamp"
      />
    </q-infinite-scroll>
    <q-footer bordered elevated dark>
      <q-form @submit="onSubmit" class="q-gutter-md" ref="bottomScroll">
        <my-input/>
      </q-form>
    </q-footer >
  </q-layout>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import MyInput from './MyInput.vue'
import { messagesStore } from '../stores/example-store'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MyInput
  },

  setup () {
    const messages = messagesStore()
    return {
      items: messages.messages,
      messageStore: messages
    }
  },
  methods: {
    async onSubmit (evt) {
      const { value } = evt.target.elements[0]
      await this.messageStore.addMessage(value)
      window.scrollBy(0, 50000000000)
    }
  }
})
</script>

<style scoped lang="css">
</style>
