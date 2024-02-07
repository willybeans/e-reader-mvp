import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { api, buildUrl } from "../../helpers/api";
import { ContentIcon } from "../../components/ContentIcon";

export type Content = {
  id: string;
  author_id: string;
  body_content: string;
  title: string;
  time_created: string;
};

export default function ExploreScreen() {
  const [allContent, setAllContent] = useState<Content[]>([]);

  useEffect(() => {
    (async function () {
      // need a user state object
      const result: Content[] = await api(`${buildUrl()}/getAllContent`);

      setAllContent([...result]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Explore</Text>
      <View style={styles.contentContainer}>
        {allContent?.map((c, i) => (
          <ContentIcon content={c} key={i} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
