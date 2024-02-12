export interface Websocket {
  isReady: boolean;
  val: any | null;
  send: WebSocketSend;
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
