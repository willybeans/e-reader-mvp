import { useEffect } from "react";
import { Link, HrefObject } from "expo-router";
import { ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { Text, View, useThemeColor } from "../../../components/Themed";
import { useWebSocketContext } from "../../../context/WebSocket";
import { pallatte } from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

type Url = {
  pathname: string;
  params?: { id: string };
};

export default () => {
  const backgroundColor = useThemeColor(
    { light: pallatte.colorLightPurple, dark: pallatte.colorDarkPurple },
    "background"
  );
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
    <View
      style={{
        width: Dimensions.get("window").width - 5,
        height: Dimensions.get("window").height - 5,
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={[backgroundColor, "transparent"]}
        end={{ x: 0.4, y: 0.4 }}
        start={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <ScrollView
        horizontal={false}
        snapToInterval={Dimensions.get("screen").width}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          backgroundColor: pallatte.transparent,
        }}
      >
        {chatState?.map((c, i) => {
          const today = new Date().toDateString();
          const mDate = new Date(c.chat_messages[0].sent_at);
          const isToday = today === mDate.toDateString();
          const mDayName = mDate.toLocaleDateString("us", { weekday: "short" });
          const mTime = `${mDate.getHours()}:${mDate.getMinutes()}`;
          return (
            <View
              style={{
                marginTop: 15,
                backgroundColor: pallatte.transparent,
                flex: 0,
              }}
              key={i}
            >
              <Link
                href={
                  {
                    pathname: `/chats/${c.chat_room_id}`,
                  } as HrefObject<Url>
                }
              >
                <View style={styles.chatContainer}>
                  <Image
                    source={{ uri: "http://placekitten.com/200/300" }}
                    style={styles.image}
                  />
                  <View style={styles.chatPreview}>
                    <View style={styles.messageHeading}>
                      <Text style={styles.heading}>{c.chat_name}</Text>
                      <Text>{isToday ? mTime : mDayName}</Text>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: pallatte.colorGrey,
                      }}
                    >
                      {c?.chat_messages[c.chat_messages.length - 1]?.content}
                    </Text>
                  </View>
                </View>
              </Link>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "500",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
  },
  chatContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: pallatte.transparent,
  },
  messageHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row",
    backgroundColor: pallatte.transparent,
  },
  image: {
    minWidth: 50,
    minHeight: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  chatPreview: {
    display: "flex",
    backgroundColor: pallatte.transparent,
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width - 65, // hack
  },
});
