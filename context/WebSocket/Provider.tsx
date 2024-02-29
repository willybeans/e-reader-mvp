import React, { useState, useEffect, useRef, useReducer } from "react";
import Context from "./Context";
import {
  Websocket,
  Action,
  ActionTypes,
  ChatRoom,
  Message,
  WebSocketResponse,
} from "./types";

function reducer(state: ChatRoom[], action: Action): ChatRoom[] {
  switch (action.type) {
    case "get_messages": {
      return [...state, ...action.content];
    }
    case "post_message": {
      const indexOfChat = state.findIndex(
        (x) => x.chat_room_id === action.content.chat_room_id
      );
      const stateCopy = [...state];
      stateCopy[indexOfChat]?.chat_messages?.push(action.content);
      return [...state, ...stateCopy];
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const initialState: ChatRoom[] = [];

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chatState, dispatch] = useReducer<
    (chatState: ChatRoom[], actions: Action) => ChatRoom[]
  >(reducer, initialState);

  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const testId = "d2792a62-86a4-4c49-a909-b1e762c683a3";
    const ws = new WebSocket(`ws://localhost:8080/ws?user_id=${testId}`);

    ws.onopen = () => {
      setIsReady(true);
    };
    ws.onclose = () => {
      setIsReady(false);
    };
    ws.onmessage = (event) => {
      const { data } = event;

      let parsed = {} as WebSocketResponse;
      try {
        parsed = JSON.parse(data);
        dispatch({
          type: parsed.action,
          content: parsed.content,
        });
      } catch (e) {
        console.error("Failure to parse res obj: ", e);
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const handleReducer = (
    actionType: ActionTypes,
    content: ChatRoom[] | Message
  ) => {
    dispatch({
      type: actionType,
      content: content,
    });
  };

  const ret = {
    isReady,
    val,
    send: wsRef.current?.send.bind(wsRef.current),
    handleReducer,
    chatState,
  } as Websocket;

  return <Context.Provider value={ret}>{children}</Context.Provider>;
};
