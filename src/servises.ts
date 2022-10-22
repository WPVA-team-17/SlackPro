import { Chat } from 'frontEnd'

const generateRandomString = (myLength: number) => {
  const chars =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'
  const randomArray = Array.from(
    { length: myLength },
    () => chars[Math.floor(Math.random() * chars.length)]
  )

  const randomString = randomArray.join('')
  return String(randomString)
}

const generateRandomMessage = (id: number) => {
  return {
    id,
    text: generateRandomString(10),
    date: new Date(),
    isRead: Boolean(Math.round(Math.random())),
    sent: Boolean(Math.round(Math.random())),
    stamp: Math.random() * 100
  }
}

const generateRandomMessages = (count: number) => {
  const messages = []
  for (let i = 0; i < count; i++) {
    messages.push(generateRandomMessage(i))
  }
  return messages
}

const generateChat = (id: number):Chat => {
  return {
    id,
    name: generateRandomString(10),
    avatar: generateRandomString(10),
    lastMessage: generateRandomString(10),
    lastMessageDate: generateRandomString(10),
    unreadMessages: Math.round(Math.random() * 100),
    participants: []
  }
}

const generateChats = (count: number):Chat[] => {
  const chats = []
  for (let i = 0; i < count; i++) {
    chats.push(generateChat(i))
  }
  return chats
}

export { generateRandomString, generateRandomMessages, generateChats }
