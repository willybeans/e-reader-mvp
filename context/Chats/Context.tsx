import { createContext } from "react";
import { Websocket } from "./types";

const Context = createContext<Websocket>({} as Websocket);

export default Context;
