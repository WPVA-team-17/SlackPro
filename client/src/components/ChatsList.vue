<template>
  <q-btn
    color="primary"
    icon="logout"
    label="Sign Out"
    @click="logOut"
    style="height: 5%"
  />
  <online-status style="height: 14%; width: auto" />
  <q-scroll-area style="height: 80%; width: auto" class="bg-green-4">
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="item in items"
        :key="item.id"
        @click="selectChat(item.id)"
      >
        <q-item-section>
          <q-item-label overline>{{ item.id }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <confirm-exit />
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue'
import chatsStore from '../stores/chats'
import ConfirmExit from './ConfirmExit.vue'
import OnlineStatus from './OnlineStatus.vue'

const chats = chatsStore()
export default defineComponent({
  name: 'ChatsList',
  components: {
    OnlineStatus,
    ConfirmExit
  },
  setup () {
    return {
      items: chats.getChats
    }
  },
  methods: {
    selectChat (chatId) {
      chats.findChatIndexById(chatId)
    },
    logOut (evt) {
      evt.preventDefault()
      this.$router.push('/login')
    }
  }
})
</script>

<style>
.onlineStatus {
  height: 5%;
  width: 100%;
}
</style>
