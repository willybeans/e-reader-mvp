export interface Websocket {
  isReady: boolean;
  val: any | null;
  send: WebSocketSend;
  chatState: ChatRoom[];
}

export type WebSocketSend = (
  data: string | ArrayBufferLike | Blob | ArrayBufferView
) => void;

export interface MessageBody {
  time: string;
  name: string;
  content: string;
}

export type WebSocketContext = [
  isReady: boolean,
  receivedMessages: MessageBody[],
  send: WebSocketSend | undefined
];

export interface Message {
  id: string;
  chat_room_id?: string;
  user_id: string;
  content: string;
  sent_at: string;
  username: string;
}

export interface ChatRoom {
  chat_room_id: string;
  chat_name: string;
  usernames?: string[] | any;
  chat_messages: Message[];
}

export interface ChatContext {
  handleReducer: (action: ActionTypes, content: any) => void;
  state: ChatRoom[];
}

export type ActionTypes = "get_messages" | "post_message";

export type Action = {
  type: ActionTypes;
  content: any;
};

export type WebSocketResponse = {
  subscription_id: string;
  action: ActionTypes;
  content: ChatRoom[];
};
