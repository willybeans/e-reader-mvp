export interface Message {
  id: string;
  chat_room_id: string;
  user_id: string;
  content: string;
  sentat: string;
}

export interface ChatRoom {
  id: string;
  usernames: string[];
  messages: Message[];
}

export interface ChatContext {
  handleReducer: (action: string, content: ChatRoom[] | Message) => void;
  state: ChatRoom[];
}
