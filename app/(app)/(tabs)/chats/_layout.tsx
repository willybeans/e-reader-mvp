import { Link, Stack } from "expo-router";
import { Header } from "../../../../components/Header";
import { ChatProvider } from "../../../../context/Chats";
import { useLocalSearchParams } from "expo-router";
import { useWebSocketContext } from "../../../../context/WebSocket";
import { useEffect, useState } from "react";
import Colors from "../../../../constants/Colors";
import { Pressable, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ChatsLayout() {
  const colorScheme = useColorScheme();
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
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerTitleAlign: "center",
          // tabBarActiveTintColor: purple.purple8,
          // tabBarInactiveTintColor: grayDark.gray11,
          tabBarStyle: { backgroundColor: "black" },
        })}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Chats",
            // headerTitle: "Chats"
            headerRight: () => (
              <Link href="/newChatModal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="plus"
                      size={25}
                      color={Colors[colorScheme ?? "light"].matchTint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{ headerTitle: chatName }}
          // options={{ headerTitle: (props) => <Header {...props} /> }}
        />
      </Stack>
    </ChatProvider>
  );
}
