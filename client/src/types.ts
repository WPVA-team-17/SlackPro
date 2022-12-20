declare module 'frontEnd' {
  export type User = {
    id: string
    login: string
    avatar: string
    status: string
    firstName: string
    lastName: string
    email: string
  }

  export type MessageResponse = {
    text: string,
    chatId: string,
    userId: string,
    createdAt: Date,
    id: string
  }

  export type MessageRequest = {
    text: string,
    chatId: string,
    userId: string,
  }

  export type Message = {
    id: string;
    text: string;
    createdAt: Date;
    isRead: boolean;
    senderId: string;
  }

  export type Chat = {
    id: string;
    name: string;
    avatar: string;
    participants: User[];
    isPrivate: boolean;
    messages: Message[];
  }

  export type ChatJoinRequest = {
    name: string;
    isPrivate: boolean;
  }

}
