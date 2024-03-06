import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Text, View } from "./Themed";
import Colors, { pallatte } from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

type SearchContent = {
  id: string;
  author_id: string;
  description?: string;
  genre?:
    | "drama"
    | "comedy"
    | "horror"
    | "action"
    | "fantasy"
    | "non-fiction"
    | "fiction";
  type?: "video" | "book" | "article" | "short story";
  rating?: number;
  title: string;
  time_created: string;
};
type SearchContentProps = {
  onPress?: (type: string) => void;
  content: SearchContent;
};

export function SearchContent(props: SearchContentProps) {
  const colorScheme = useColorScheme();
  // const backgroundColor = useThemeColor(
  //   { light: lightColor, dark: darkColor },
  //   "background"
  // );

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: `/reader/${props?.content?.id}`,
          params: { id: props?.content?.id as string },
        }}
        asChild
        style={{ width: "100%", backgroundColor: "transparent" }}
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
            // {
            //   width: "100%",

            // },
            // styles.contentContainer,
          ]}
        >
          {({ pressed }) => (
            // <View style={styles.contentContainer}>
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
                  name="book"
                  size={55}
                  color={Colors[colorScheme ?? "light"].tabIconDefault}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              </View>

              {/* <Text style={styles.text}>
                {pressed ? "Pressed!" : "Press Me"}
              </Text> */}
              <View style={styles.contentBody}>
                <View style={styles.contentHeader}>
                  <Text numberOfLines={2} style={styles.title}>
                    {props.content?.title}
                  </Text>
                  {/* <FontAwesome
                    name="star"
                    size={15}
                    color={"#FFD700"}
                    // style={{ color: "gold" }}
                  /> */}
                  {props.content.rating === undefined ? (
                    <View />
                  ) : (
                    <View style={styles.rating}>
                      {[...Array(props?.content?.rating)].map((_, i) => (
                        <FontAwesome
                          key={`rating-star-${i}`}
                          name="star"
                          size={15}
                          color={pallatte.colorGold}
                        />
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Desc: </Text>
                  {props.content?.description}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.bold}>Genre: </Text>
                  {props.content?.genre}
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
    marginTop: 10,
    marginBottom: 10,
    maxWidth: "100%",
    // height: "100%",
    // width: Dimensions.get("window").width - 20, // hack
    // height: Dimensions.get("window").width * 0.3,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexGrow: 1,
    maxWidth: "100%",
    borderRadius: 15,
    padding: 10,
    // paddingRight: 10,
    // paddingLeft: 10,
  },
  contentBody: {
    // width: "80%",
    // width: "100%",
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
    // maxWidth: "50%",
  },
  bold: {
    fontWeight: "700",
  },
});
