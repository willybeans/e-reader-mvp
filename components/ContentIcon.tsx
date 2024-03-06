import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Content } from "../app/(tabs)";
import { Link } from "expo-router";

type CountBannerProps = {
  onPress?: (type: string) => void;
  content?: Content;
};

export function ContentIcon(props: CountBannerProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: `/reader/${props?.content?.id}`,
          params: { id: props?.content?.id as string },
        }}
        asChild
      >
        <Pressable
          onPress={() => {
            // setTimesPressed(current => current + 1);
            console.log("can use this for pressed state");
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
              {/* <Text style={styles.text}>
                {pressed ? "Pressed!" : "Press Me"}
              </Text> */}
              <Text style={styles.text}>{props.content?.title}</Text>
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
    justifyContent: "flex-start",
    flexGrow: 0,
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").width * 0.3,
  },
  iconWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  icon: {
    height: 100,
    backgroundColor: "red",
  },
  text: {},
});
