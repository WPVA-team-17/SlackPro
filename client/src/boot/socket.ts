import { boot } from 'quasar/wrappers'
import { Socket, io } from 'socket.io-client'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const socket = io('http://localhost:4000', {
  autoConnect: false,
  transports: ['websocket'],
  upgrade: false,
  host: 'localhost:4000'
})

export default boot(({ app }) => {
  // something to do
  app.config.globalProperties.$socket = socket
})

export { socket }
