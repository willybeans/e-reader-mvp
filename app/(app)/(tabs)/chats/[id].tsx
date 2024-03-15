import { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, TextInput, View } from "../../../../components/Themed";
import { useWebSocketContext } from "../../../../context/WebSocket";
import { Button } from "../../../../components/Button";
import Colors, { pallatte } from "../../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const usersId = "d2792a62-86a4-4c49-a909-b1e762c683a3";

export default () => {
  const { isReady, send, chatState } = useWebSocketContext();
  const colorScheme = useColorScheme();

  const [chatIndex, setChatIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);

  const params = useLocalSearchParams();
  const { id } = params;

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
          user_id: usersId,
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
      <LinearGradient
        // Background Linear Gradient
        colors={[pallatte.colorDarkPurple, "transparent"]}
        end={{ x: 0.4, y: 0.4 }}
        start={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <ScrollView
        style={{
          maxHeight: "100%",
          width: "100%",
        }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: pallatte.transparent,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            backgroundColor: pallatte.transparent,
          }}
        >
          {chatIndex !== null &&
            chatState[chatIndex]?.chat_messages?.map((m, i) => (
              <View
                key={`message-${i}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  backgroundColor: pallatte.transparent,
                }}
              >
                {m.user_id === usersId && <View />}
                <View
                  lightColor={
                    m.user_id === usersId
                      ? Colors.light.tint
                      : Colors.dark.tabIconDefault
                  }
                  darkColor={
                    m.user_id === usersId
                      ? Colors.light.tint
                      : Colors.dark.buttonDefault
                  }
                  style={styles.chatMessageComponent}
                >
                  <Text
                    lightColor={Colors.light.text}
                    darkColor={Colors.dark.text}
                  >
                    {m.content}
                  </Text>
                </View>
                {m.user_id !== usersId && <View />}
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Write a message"
          multiline={true}
          style={{
            width: "70%",
            borderColor: Colors[colorScheme ?? "light"].border,
            borderWidth: 2,
          }}
          transparent
          placeholderTextColor={Colors[colorScheme ?? "light"].placeholder}
          value={message}
          onChangeText={(text: string) => setMessage(text)}
        />
        <Button
          title="Send"
          onPress={sendMessage}
          style={{ width: "25%", maxHeight: 40 }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: Dimensions.get("window").height - 95,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    display: "flex",
    flexGrow: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "pallatte.transparent",
  },
  chatMessageComponent: {
    borderRadius: 10,
    padding: 10,
    margin: 2,
  },
});
