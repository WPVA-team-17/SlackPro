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

export { generateRandomString, generateRandomMessages }
