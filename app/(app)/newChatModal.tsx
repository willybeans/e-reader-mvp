import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  ScrollView,
  Platform,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useState } from "react";

import { Text, TextInput, View } from "../../components/Themed";
import { Button } from "../../components/Button";
import { UsersSearchComponent } from "../../components/UsersSearchComponent";

import Colors from "../../constants/Colors";
import { api, buildUrl } from "../../helpers/api";

type UserProfile = {
  id: string;
  username: string;
  profile: string;
  age: string;
  location: string;
  native_language: string;
  target_language: string;
  last_online: string;
  time_created: string;
};

export default function NewChatModalScreen() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState<string>("");
  const colorScheme = useColorScheme();

  const handleSearch = async () => {
    try {
      const searchContent: UserProfile[] = await api(
        `${buildUrl()}/getAllUsersByQuery?query=${search}`
      );
      setUsers([...searchContent]);
      setSearch("");
    } catch (e) {
      console.error("error: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for users</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for a user to chat with"
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
        <Button
          style={{ width: "25%" }}
          title="Search"
          onPress={handleSearch}
        />
      </View>

      <ScrollView
        horizontal={false}
        contentContainerStyle={{
          flexGrow: 1,
          maxWidth: Dimensions.get("window").width,
        }}
      >
        {users?.map((c, i) => (
          <UsersSearchComponent
            onPress={() => {
              console.log("test");
            }}
            content={c}
            key={i}
          />
        ))}
      </ScrollView>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <EditScreenInfo path="app/tabs/chat/newchatmodal.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
