import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useLocalSearchParams } from "expo-router";

export default function ReadScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  return (
    <View style={styles.container}>
      <Text>reader page: {id}</Text>
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
