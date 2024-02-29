import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, View } from "../../../components/Themed";
import { useWebSocketContext } from "../../../context/WebSocket";
import { Button } from "../../../components/Button";

export default () => {
  const { isReady, send, chatState } = useWebSocketContext();
  const params = useLocalSearchParams();
  const { id } = params;
  const [chatIndex, setChatIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (typeof id === "string") {
      setChatIndex(chatState.findIndex((x) => x.chat_room_id === id));
    }
  }, [chatState]);

  const sendMessage = () => {
    if (isReady && send && message.length !== 0) {
      let stringified: string = "";
      try {
        stringified = JSON.stringify({
          action: "post_message",
          chat_room_id: id,
          user_id: "d2792a62-86a4-4c49-a909-b1e762c683a3",
          content: message,
        });
        send(stringified);
        setMessage("");
      } catch (e) {
        console.error("parse failed InputBox");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{
          width: "100%",
        }}
      >
        <View>
          {chatIndex !== null &&
            chatState[chatIndex]?.chat_messages?.map((m, i) => (
              <View key={i}>
                <View>
                  <Text>{m.username}</Text>
                  <Text>{m.content}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a message"
          style={{
            width: "70%",
            borderColor: "grey",
          }}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} style={{ width: "25%" }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 2,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
});
