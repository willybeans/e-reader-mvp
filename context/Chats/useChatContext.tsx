import { useContext } from "react";
import Context from "./Context";

const useChatContext = () => {
  const chatContext = useContext(Context);
  return chatContext;
};

export default useChatContext;
