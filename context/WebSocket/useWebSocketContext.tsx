import { useContext, useEffect } from "react";
import Context from "./Context";

// export const useWebSocketContext = () => {
//   const { isReady, val, send } = useContext(Context); // use it just like a hook

//   useEffect(() => {
//     if (isReady) {
//       send("test message");
//     }
//   }, [isReady, send]); // make sure to include send in dependency array

//   return (
//     <div>
//       Ready: {JSON.stringify(isReady)}, Value: {val}
//     </div>
//   );
// };

const useWebSocketContext = () => {
  const webSocketContext = useContext(Context);
  return webSocketContext;
};

export default useWebSocketContext;
