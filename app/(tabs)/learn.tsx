import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../components/Themed";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { api, buildUrl } from "../../helpers/api";
import { ContentIcon } from "../../components/ContentIcon";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export type Content = {
  id: number;
  author_id: number;
  body_content: string;
  title: string;
  time_created: string;
};

export default function LearnScreen() {
  const [contentList, setContentList] = useState<Content[] | undefined>();
  useEffect(() => {
    (async function () {
      // need a user state object
      const usersContent: Content[] = await api(
        `${buildUrl()}/getAllContent?id=${1}`
      );

      setContentList(usersContent);
    })();
  }, []);

  const onPress = () => {
    console.log("test on click");
  };
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      {contentList?.length !== 0 && (
        <Link href="/upload" asChild>
          <Pressable>
            <Text>Add Content</Text>
            <FontAwesome
              name="plus"
              size={25}
              color={Colors[colorScheme ?? "light"].text}
              // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          </Pressable>
        </Link>
      )}
      {contentList?.map((c, i) => (
        <ContentIcon onPress={onPress} content={c} key={i} />
      ))}
      {contentList?.length === 0 && (
        <Link href="/upload" asChild>
          <Pressable>
            <Text>Click Here to start making content!</Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
