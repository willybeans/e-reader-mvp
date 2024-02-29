import React, { useState, useEffect, useReducer } from "react";
import Context from "./Context";
import { Action, ActionTypes, Message, ChatRoom, ChatContext } from "./types";

function reducer(state: ChatRoom[], action: Action) {
  console.log("action fired in reducer", action.type);
  console.log("typeof action fired", typeof action.content);

  switch (action.type) {
    case "get_messages": {
      return [...state];
    }
    case "post_message": {
      // findIndex = state.indexOf(action.content.id)
      // ...action.content
      return [...state, ...action.content];
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
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
  //ChatRoom[] | Message
  const handleReducer = (actionType: ActionTypes, content: any) => {
    dispatch({
      type: actionType,
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
