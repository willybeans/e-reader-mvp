import { Stack } from "expo-router";
import { Header } from "../../../components/Header";
import { ChatProvider } from "../../../context/Chats";
import { useLocalSearchParams } from "expo-router";
import { useWebSocketContext } from "../../../context/WebSocket";
import { useEffect, useState } from "react";

export default function ChatsLayout() {
  const { chatState } = useWebSocketContext();
  const params = useLocalSearchParams();
  const { id } = params;
  const [chatName, setChatName] = useState<string>("");

  useEffect(() => {
    setChatName(
      chatState[chatState.findIndex((x) => x.chat_room_id === id)]?.chat_name
    );
  }, [id]);

  return (
    <ChatProvider>
      <Stack
        screenOptions={({ route }) => ({
          // headerTintColor: grayDark.gray11,
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleAlign: "center",
          // tabBarActiveTintColor: purple.purple8,
          // tabBarInactiveTintColor: grayDark.gray11,
          tabBarStyle: { backgroundColor: "black" },
        })}
      >
        <Stack.Screen name="index" options={{ headerTitle: "Chats" }} />
        <Stack.Screen
          name="[id]"
          options={{ headerTitle: chatName }}
          // options={{ headerTitle: (props) => <Header {...props} /> }}
        />
      </Stack>
    </ChatProvider>
  );
}
