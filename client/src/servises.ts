import { Chat, Message, User } from 'frontEnd'

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

const generateRandomMessage = (id: string, senderId = 'none'):Message => {
  return {
    id: id + generateRandomString(5),
    senderId,
    text: generateRandomString(10),
    createdAt: new Date(),
    isRead: Boolean(Math.round(Math.random()))
  }
}

const generateRandomMessages = (count: number):Message[] => {
  const messages = []
  for (let i = 0; i < count; i++) {
    messages.push(generateRandomMessage(String(i)))
  }
  return messages
}

const generateUser = (id: string):User => {
  return {
    id,
    login: generateRandomString(10),
    avatar: generateRandomString(10),
    status: generateRandomString(10),
    firstName: generateRandomString(10),
    lastName: generateRandomString(10),
    email: generateRandomString(10)
  }
}

const generateUsers = (count: number):User[] => {
  const users = []
  for (let i = 0; i < count; i++) {
    users.push(generateUser(String(i)))
  }
  return users
}

const generateChat = (id: string):Chat => {
  return {
    id,
    name: generateRandomString(10),
    avatar: generateRandomString(10),
    participants: generateUsers(2),
    isPrivate: Boolean(Math.round(Math.random())),
    messages: generateRandomMessages(10)
  }
}

const messagesBetweenUsers = (user1: User, user2: User):Message[] => {
  const messages = []
  for (let i = 0; i < 10; i++) {
    messages.push(generateRandomMessage(String(i), Math.round(Math.random()) ? user1.id : user2.id))
  }
  return messages
}

const generateChatBetweenUsers = (user1: User, user2: User):Chat => {
  return {
    id: generateRandomString(10),
    name: generateRandomString(10),
    avatar: generateRandomString(10),
    participants: [user1, user2],
    isPrivate: true,
    messages: messagesBetweenUsers(user1, user2)
  }
}

const generateChats = (count: number):Chat[] => {
  const chats = []
  for (let i = 0; i < count; i++) {
    chats.push(generateChat(String(i)))
  }
  return chats
}

const generateConversations = (count: number):Chat[] => {
  const users = generateUsers(count)
  const chats = []
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      chats.push(generateChatBetweenUsers(users[i], users[j]))
    }
  }
  return chats
}

export { generateRandomString, generateRandomMessages, generateChats, generateConversations }
