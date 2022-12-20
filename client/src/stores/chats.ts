import { Chat } from 'frontEnd'
import { defineStore } from 'pinia'

export default defineStore('chatsStore', {
  state: () => {
    return {
      chats: [] as Chat[],
      currentChatIndex: 0,
      current: null as Chat | null
    }
  },
  getters: {
    currentChat: (state) => state.current,
    getChats: (state) => state.chats
  },
  actions: {
    setCurrentChatIndex (index: number) {
      this.currentChatIndex = index
    },
    findChatIndexById (id: string) {
      this.currentChatIndex = this.getChats.findIndex((item) => item.id === id)
      this.current = this.getChats[this.currentChatIndex]
    },
    setChats (chats: Chat[]) {
      this.chats = chats
      this.currentChatIndex = 0
      this.current = this.chats[0]
    }
  }
})
