import { useContext } from "react";
import Context from "./Context";

const useWebSocketContext = () => {
  const webSocketContext = useContext(Context);
  return webSocketContext;
};

export default useWebSocketContext;
