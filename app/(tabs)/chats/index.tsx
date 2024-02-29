import { useEffect } from "react";
import { Link, HrefObject } from "expo-router";
import { ScrollView, Image } from "react-native";
import { Text, View } from "../../../components/Themed";
import { useWebSocketContext } from "../../../context/WebSocket";

type Url = {
  pathname: string;
  params?: { id: string };
};

export default () => {
  const { isReady, send, chatState } = useWebSocketContext();

  useEffect(() => {
    if (isReady && send && chatState.length === 0) {
      let stringified: string = "";
      try {
        stringified = JSON.stringify({
          action: "get_messages",
          chat_room_id: "",
          user_id: "d2792a62-86a4-4c49-a909-b1e762c683a3",
          content: "",
        });
        send(stringified);
      } catch (e) {
        console.error("parse failed InputBox");
      }
    }
  }, [isReady, send]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <View>
        {chatState.length !== 0 &&
          chatState?.map((c, i) => {
            return (
              <Link
                key={i}
                href={
                  {
                    pathname: `/chats/${c.chat_room_id}`,
                  } as HrefObject<Url>
                }
              >
                <View>
                  <Image
                    source={{ uri: "http://placekitten.com/200/300" }}
                    style={{ width: 40, height: 40 }}
                  />
                  <View>
                    <Text>{c.chat_name}</Text>
                    <Text>{c?.chat_messages[0]?.content}</Text>
                  </View>
                </View>
              </Link>
            );
          })}
      </View>
    </ScrollView>
  );
};

// for text preview
// text-overflow: ellipsis;
// overflow: hidden;
// white-space: nowrap;
