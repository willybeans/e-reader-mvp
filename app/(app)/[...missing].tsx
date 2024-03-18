import { Link, Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

import HurtFox from "../../svgs/hurt_fox.svg";

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <View style={{ backgroundColor: "transparent", borderRadius: 25 }}>
          <HurtFox
            height={300}
            width={300}
            style={{ color: Colors[colorScheme ?? "light"].tint }}
          />
        </View>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
