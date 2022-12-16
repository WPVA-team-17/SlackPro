import { Chat } from 'frontEnd'
import { defineStore } from 'pinia'
import { generateConversations } from 'src/servises'

export default defineStore('chatsStore', {
  state: () => {
    const chats: Chat[] = generateConversations(4)
    return {
      chats,
      currentChatIndex: 0,
      current: chats[0]
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
    }
  }
})
