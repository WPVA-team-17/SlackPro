<template>
  <q-infinite-scroll reverse class="q-pa-md q-pa-none" ref="scroll">
     <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    <q-chat-message
      v-for="item in items" :key="item.id"
      :name="item.user.login"
      :text="[item.text]"
      :stamp="String(item?.createdAt)"
      :sent="item.userId === myId"
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
      myId: computed(() => chats.getUserId),
      items: computed(() => chats.currentChat?.messages || [])
    }
  }
}
)
</script>
