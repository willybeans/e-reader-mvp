import React from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Content } from "../app/(tabs)/two";
import { Link } from "expo-router";

type CountBannerProps = {
  onPress: (type: string) => void;
  content?: Content;
};

export function ContentIcon(props: CountBannerProps) {
  // console.log("userconteont111 ", props.content);

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Link href="/modal" asChild>
        <Pressable
          onPress={() => {
            // setTimesPressed(current => current + 1);
            console.log("test");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
            },
            styles.icon,
          ]}
        >
          {({ pressed }) => (
            <View style={styles.iconWrapper}>
              <FontAwesome
                name="book"
                size={55}
                color={Colors[colorScheme ?? "light"].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={styles.text}>
                {pressed ? "Pressed!" : "Press Me"}
              </Text>
              <Text>{props.content?.title}</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  iconWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  icon: {
    height: 100,
    backgroundColor: "red",
  },

  text: {},
});
