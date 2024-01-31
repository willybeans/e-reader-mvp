import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Button } from "../../components/Button";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { api, buildUrl } from "../../helpers/api";
import { ContentIcon } from "../../components/ContentIcon";

export type Content = {
  id: number;
  author_id: number;
  body_content: string;
  title: string;
  time_created: string;
};

type ContentList = Content[];

export default function TabTwoScreen() {
  const [contentList, setContentList] = useState<Content[] | undefined>();
  useEffect(() => {
    //api call here for setContentList
    (async function () {
      // need a user state object
      const usersContent: Content[] = await api(
        `${buildUrl()}/getAllContent?id=${3}`
      );

      setContentList(usersContent);
    })();
  }, []);

  const onPress = () => {
    console.log("test");
  };

  return (
    <View style={styles.container}>
      {contentList?.map((c, i) => (
        <ContentIcon onPress={onPress} content={c} key={i} />
      ))}
      {contentList?.length === 0 && (
        <Link href="/upload" asChild>
          <Pressable>
            <Text>Click Here to start making content!</Text>
          </Pressable>
          {/* <Button title="or click here" /> */}
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
