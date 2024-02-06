import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../../components/Themed";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { api, buildUrl } from "../../helpers/api";
import { ContentIcon } from "../../components/ContentIcon";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { Button } from "../../components/Button";

export type Content = {
  id: string;
  author_id: string;
  body_content: string;
  title: string;
  time_created: string;
};

export default function LearnScreen() {
  const [contentList, setContentList] = useState<Content[]>([]);
  const colorScheme = useColorScheme();

  useEffect(() => {
    (async function () {
      // need a user state object
      const usersContent: Content[] = await api(
        `${buildUrl()}/getAllContent?id=${"d2792a62-86a4-4c49-a909-b1e762c683a3"}`
      );

      setContentList(usersContent);
    })();
  }, []);

  const onPressContent = (id: string) => {
    console.log("redirect to content! maybe redundant");
    // router.push({
    //   pathname: `/learn/${id}`,
    // });
  };

  const onPressUpload = () => {
    router.push({
      pathname: "/upload",
    });
  };

  console.log("test: ", contentList);
  return contentList.length === 0 ? (
    <View style={styles.emptyContainer}>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>
        You have no content!
      </Text>

      <Button
        onPress={onPressUpload}
        title="click here to start making content"
      />
    </View>
  ) : (
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
        <ContentIcon onPress={onPressContent} content={c} key={i} />
      ))}
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
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
