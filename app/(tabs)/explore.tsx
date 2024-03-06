import {
  Dimensions,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { TextInput, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import Colors from "../../constants/Colors";

import { SearchContent } from "../../components/SearchContent";
import { Button } from "../../components/Button";
import { api, buildUrl } from "../../helpers/api";

export type Content = {
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
  // body_content: string; // remove from api res
  title: string;
  time_created: string;
};

export default function ExploreScreen() {
  const [allContent, setAllContent] = useState<SearchContent[]>([]);
  const [search, setSearch] = useState<string>("");

  const colorScheme = useColorScheme();
  useEffect(() => {
    (async function () {
      // need a user state object
      const result: SearchContent[] = await api(`${buildUrl()}/getAllContent`);
      setAllContent([...result]);
    })();
  }, []);

  const handleSearch = async () => {
    try {
      const searchContent: SearchContent[] = await api(
        `${buildUrl()}/getAllContentByQuery?query=${search}`
      );
      setAllContent([...searchContent]);
      setSearch("");
    } catch (e) {
      console.error("error: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search our library for content"
          style={{
            width: "70%",
            borderColor: Colors[colorScheme ?? "light"].border,
            borderWidth: 2,
          }}
          transparent
          value={search}
          onChangeText={async (text: string) => {
            setSearch(text);
          }}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>

      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
          maxWidth: Dimensions.get("window").width,
        }}
      >
        {allContent?.map((c, i) => (
          <SearchContent content={c} key={`search-result-${i}`} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
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
  searchContent: {
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
