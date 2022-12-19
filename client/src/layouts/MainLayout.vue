<template>
  <q-layout view="hHh LpR fFf" ref="ScrollContainer">

    <q-drawer show-if-above side="left" bordered elevated >
      <chats-list />
    </q-drawer>

    <q-page-container>
      <channel-conversation ref="conversation"/>
    </q-page-container>

    <q-footer bordered elevated class="bg-green-10">
        <main-input @cliInput="onCLIinput" class="cli"/>
    </q-footer>

    <q-drawer show-if-above side="right" bordered elevated >
      <typing-message />
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ChatsList from 'src/components/ChatsList.vue'
import MainInput from '../components/MainInput.vue'
import ChannelConversation from '../components/ChannelConversation.vue'
import TypingMessage from 'src/components/TypingMessage.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    ChatsList,
    MainInput,
    ChannelConversation,
    TypingMessage
  },

  setup () {
    return {
      conversation: ref(null)
    }
  },
  methods: {
    async onCLIinput (messsage: string) {
      await (this.$refs.conversation as any).addMessage(messsage)
      window.scrollBy(0, 1000)
    }
  }
})
</script>

<style scoped lang="css">
.cli{
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}
</style>
