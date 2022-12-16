<template>
  <q-infinite-scroll reverse class="q-pa-md q-pa-none" ref="scroll">
     <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    <q-chat-message
      v-for="item in items" :key="item.id"
      :name="item.senderId"
      :text="[item.text]"
      :stamp="(new Date(Number(item.date))).toUTCString()"
    />
  </q-infinite-scroll>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import chatsStore from '../stores/chats'
const chats = chatsStore()
export default defineComponent({
  name: 'channel-conversation',
  setup () {
    return {
      items: computed(() => chats.currentChat.messages)
    }
  },
  methods: {
    addMessage (message: string) {
      // await api call
      chats.currentChat.messages.push({
        id: '0',
        senderId: 'me',
        text: message,
        date: String(Date.now()),
        isRead: true
      })
    }
  }
})
</script>
