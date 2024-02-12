import React, { useState, useEffect, useRef } from "react";
import Context from "./Context";
import { Websocket } from "./types";

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.events/");

    ws.onopen = () => {
      setIsReady(true);
    };
    ws.onclose = () => {
      setIsReady(false);
    };
    ws.onmessage = (event) => setVal(event.data);

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const ret = {
    isReady,
    val,
    send: wsRef.current?.send.bind(wsRef.current),
  } as Websocket;

  return <Context.Provider value={ret}>{children}</Context.Provider>;
};
