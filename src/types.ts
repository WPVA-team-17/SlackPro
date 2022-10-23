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

  export type Message = {
    id: string;
    text: string;
    date: string;
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
}
