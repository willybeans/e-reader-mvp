import { router } from "expo-router";
import { useSession } from "../../context/Auth/ctx";
import { Text, View } from "../../components/Themed";

export default function SignOut() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signOut();
          // Navigate after signing out. You may want to tweak this to ensure sign-out is
          // successful before navigating.
          router.replace("/");
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
