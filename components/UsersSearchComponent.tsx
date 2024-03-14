import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

type UserProfile = {
  id: string;
  username: string;
  profile: string;
  age: string;
  location: string;
  native_language: string;
  target_language: string;
  last_online: string;
  time_created: string;
};

type UserSearchProps = {
  onPress?: (type: string) => void;
  content: UserProfile;
};

export function UsersSearchComponent(props: UserSearchProps) {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    let d = new Date(props.content?.last_online);
    const dateString = d.toLocaleDateString("us", { weekday: "short" });
    setDate(dateString);
  }, [props.content]);

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: `/chats/${props.content.id}`,
          params: { id: props?.content?.id as string },
        }}
        asChild
        style={{ width: "100%", backgroundColor: "transparent" }}
      >
        <Pressable
          onPress={() => {
            console.log("can use this for pressed state");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
            },
          ]}
        >
          {({ pressed }) => (
            <View
              style={[
                styles.contentContainer,
                {
                  opacity: pressed ? 0.5 : 1,
                  backgroundColor: Colors[colorScheme ?? "light"].matchTint,
                  borderColor: Colors[colorScheme ?? "light"].border,
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <FontAwesome
                  name="user"
                  size={55}
                  color={Colors[colorScheme ?? "light"].tabIconDefault}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              </View>

              <View style={styles.contentBody}>
                <View style={styles.contentHeader}>
                  <Text numberOfLines={1} style={styles.title}>
                    {props.content?.username}
                  </Text>
                </View>
                <Text style={styles.text}>
                  <Text
                    numberOfLines={1}
                    textBreakStrategy="simple"
                    style={styles.bold}
                  ></Text>
                  {props.content?.profile}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Native: </Text>
                  {props.content?.native_language}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Target: </Text>
                  {props.content?.target_language}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Last Online: </Text>
                  {date}
                </Text>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    maxWidth: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    maxWidth: "100%",
    borderRadius: 15,
    padding: 10,
  },
  contentBody: {
    flexGrow: 1, // was the fix
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  contentHeader: {
    maxWidth: "100%",
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  rating: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 16,
    maxWidth: 200,
    fontWeight: "700",
  },
  text: {
    maxWidth: "90%",
  },
  bold: {
    fontWeight: "700",
  },
});
