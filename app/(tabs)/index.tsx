import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "../../components/Themed";

import { ContentIcon } from "../../components/ContentIcon";
import { Button } from "../../components/Button";

import { api, buildUrl } from "../../helpers/api";

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
        `${buildUrl()}/getAllUserContent?id=${"d2792a62-86a4-4c49-a909-b1e762c683a3"}`
      );
      setContentList(usersContent);
    })();
  }, []);

  const onPressUpload = () => {
    router.push({
      pathname: "/upload",
    });
  };

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
      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={styles.contentContainer}>
          {contentList?.map((c, i) => (
            <ContentIcon content={c} key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    height: "100%",
    width: "100%",
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
    flexWrap: "wrap",
    maxWidth: "100%",
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
    marginVertical: 5,
    height: 1,
    width: "100%",
  },
});
