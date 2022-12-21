import { socket } from 'boot/socket'
import chatsStore from './chats'
import { MessageResponse } from 'frontEnd'

const chats = chatsStore()

function startSocket () {
  socket.connect()
  socket.on('message', (data) => {
    const { text, chatId, userId, createdAt, id, user } = data as MessageResponse
    chats.addMessage(text, chatId, userId, createdAt, id, user)
  })
}

export { startSocket }
