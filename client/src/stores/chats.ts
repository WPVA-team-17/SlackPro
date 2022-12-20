import { Chat } from 'frontEnd'
import { defineStore } from 'pinia'

export default defineStore('chatsStore', {
  state: () => {
    return {
      chats: [] as Chat[],
      currentChatIndex: 0,
      current: null as Chat | null,
      userId: ''
    }
  },
  getters: {
    currentChat: (state) => state.current,
    getChats: (state) => state.chats,
    getUserId: (state) => state.userId
  },
  actions: {
    setUserId (input: string) {
      this.userId = input
    },
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
    },
    addChat (chat: Chat) {
      this.chats.push(chat)
    },
    addMessage (text: string, chatId: string, userId: string, createdAt: Date, id: string) {
      const chatIndex = this.chats.findIndex((item) => item.id === chatId)
      if (chatIndex > -1) {
        this.chats[chatIndex].messages.push({ text, id, createdAt, isRead: false, senderId: userId })
      }
    }

  }
})
