import { createContext } from "react";
import { ChatContext } from "./types";

const Context = createContext<ChatContext>({} as ChatContext);

export default Context;
