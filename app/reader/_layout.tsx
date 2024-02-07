import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

function ReaderLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          // good for a login page
          // options={{ presentation: "fullScreenModal" }}
        />
        <Stack.Screen
          name="[id]"
          // good for a login page
          // options={{ presentation: "fullScreenModal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
