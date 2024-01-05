import { Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { Button } from "../../components/Button";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  const buttonPress = () => {
    console.log("press");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have no contents</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Link href="/upload" asChild>
        <Pressable>
          <Text>Click Here to start making content!</Text>
        </Pressable>
        {/* <Button title="or click here" /> */}
      </Link>
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
