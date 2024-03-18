import { Platform, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../../../components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import ReadTextContent from "../../../components/ReadTextContent";
import { api, buildUrl } from "../../../helpers/api";

//make global types
type NewContent = {
  author_id: string;
  body_content: string;
  id: string;
  time_created: string;
  title: string;
};

export default function ReadScreen() {
  const [content, setContent] = useState<NewContent>({} as NewContent);
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    (async function () {
      const result: NewContent = await api(`${buildUrl()}/getContent?id=${id}`);
      console.log("result ", typeof result);
      setContent({ ...result });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>test ID page: params: {id}</Text>
        <Text>{content.author_id}</Text>
        <Text>{content.id}</Text>
        <Text>{content.time_created}</Text>
        <Text>{content.title}</Text>
        <ReadTextContent content={content.body_content} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
