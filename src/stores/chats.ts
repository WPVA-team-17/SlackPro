import { Chat } from 'frontEnd'
import { defineStore } from 'pinia'
import { generateConversations } from 'src/servises'

export default defineStore('chatsStore', {
  state: () => {
    return {
      chats: generateConversations(5),
      currentChatIndex: 0
    }
  },
  getters: {
    currentChat: (state) => state.chats[state.currentChatIndex],
    getChats: (state) => state.chats
  },
  actions: {
    setCurrentChatIndex (index: number) {
      this.currentChatIndex = index
    },
    addChat (chat: Chat) {
      this.chats.push(chat)
    },
    setChats (chats: Chat[]) {
      this.chats = chats
    },
    removeChat (chat: Chat) {
      this.chats = this.getChats.filter((item) => item.id !== chat.id)
    },
    findChatIndexById (id: string) {
      this.currentChatIndex = this.getChats.findIndex((item) => item.id === id)
    }
  }
})
