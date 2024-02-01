import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useLocalSearchParams } from "expo-router";

export default function ReadScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  console.log("read page ", id);
  return (
    <View style={styles.container}>
      <Text>read page</Text>
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
