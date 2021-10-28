import { User } from '../../user/models/User'

export interface Message {
    id: string
    receiver?: User
    sender?: User
    text: string
    createdAt: Date
}

export interface CreateMessageInput {
    text: string
    receiverId: string
}
