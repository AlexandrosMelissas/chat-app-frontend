import { io, Socket } from 'socket.io-client'
import { getters } from '../../auth/Auth.hook'
import { CreateMessageInput, Message } from '../../chat/models/Message'
import { useChat } from '../../chat/Chat.hook'
import { useUser } from '../../user/User.hook'

const { addMessage } = useChat()
const { setUserStatus } = useUser()

export let socket: Socket

export const useWebSocket = () => {
  const connect = (): void => {
    socket = io('http://localhost:3000/chat', {
      auth: {
        Authorization: getters.getToken.value ?? null
      }
    })

    socket.on('set-on-status', (userStatus: {userId: string, online: boolean}) => {
      console.log('Someone connected!')
      setUserStatus(userStatus.userId, userStatus.online)
    })
  }

  const sendMessage = (message: CreateMessageInput) => {
    socket.emit('message', message)
  }

  const joinRoom = (userId: string) => {
    socket.emit('join-room', userId)
  }

  const disconnect = (): void => {
    socket.disconnect()
  }

  const listenForMessages = () => {
    socket.on('message', (message: Message) => {
      console.log(message)
      addMessage(message)
    })
  }

  return {
    connect,
    disconnect,
    joinRoom,
    sendMessage,
    listenForMessages
  }
}
