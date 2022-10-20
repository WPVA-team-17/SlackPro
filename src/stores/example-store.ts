import { generateRandomMessages } from 'src/servises'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    }
  }
})

export const messagesStore = defineStore('messages', {
  state: () => {
    return {
      items: generateRandomMessages(100)
    }
  },
  getters: {
    count: (state) => state.items.length,
    messages: (state) => state.items
  },
  actions: {
    async addMessage (text: string) {
      const message = {
        id: this.items.length,
        text,
        date: new Date(),
        isRead: false,
        sent: true,
        stamp: Math.random() * 100
      }
      this.items.push(message)
      return message
    }
  }
})
