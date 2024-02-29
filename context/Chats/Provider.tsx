import React, { useState, useEffect, useReducer } from "react";
import Context from "./Context";
import { Message, ChatRoom, ChatContext } from "./types";

type Action = {
  type: string;
  content: any;
};

function reducer(state: ChatRoom[], action: Action) {
  switch (action.type) {
    case "get_messages": {
      return [...state];
    }
    case "post_message": {
      // findIndex = state.indexOf(action.content.id)
      return [...state, action.content];
    }
  }
  throw Error("Unknown action: " + action.type);
}

const initialState: ChatRoom[] = [];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const handleUpdateChats = (newChats: ChatRoom[]) => {
  //   dispatch({
  //     type: 'get_messages',
  //     content: newChats
  //   });
  // }

  // const handleNewMessage = (message: Message) => {
  //   dispatch({
  //     type: 'post_messages',
  //     content: message
  //   });
  // }

  const handleReducer = (action: string, content: ChatRoom[] | Message) => {
    dispatch({
      type: action,
      content: content,
    });
  };

  useEffect(() => {}, []);

  const returnObject: ChatContext = {
    handleReducer,
    state,
  };

  return <Context.Provider value={returnObject}>{children}</Context.Provider>;
};
