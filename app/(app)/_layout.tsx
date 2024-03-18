import { Redirect, Stack } from "expo-router";
import { SessionProvider, useSession } from "../../context/Auth/ctx";
import { Text } from "../../components/Themed";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    // <SessionProvider>
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="sign-out" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="newChatModal"
        options={{
          headerTitle: "Create New Chat",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="newContentScreen"
        options={{ headerTitle: "New Content" }}
        // options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="reader/index"
        // good for a login page
        // options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen name="reader/[id]" />
    </Stack>
    // </SessionProvider>
  );
}
