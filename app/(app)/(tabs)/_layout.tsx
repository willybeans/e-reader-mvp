import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, usePathname } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors, { pallatte } from "../../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const usePath = usePathname();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof FontAwesome>["name"] =
            "code";
          switch (route.name) {
            case "index":
              iconName = "pencil";
              break;
            case "chats":
              iconName = "wechat";
              break;
            case "explore":
              iconName = "globe";
              break;
            case "profile":
              iconName = "user";
              break;
            default:
              break;
          }
          return <TabBarIcon name={iconName} color={color} />;
        },
        // headerTintColor: grayDark.gray11,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        // headerShown: false,
        headerTitleAlign: "center",
        // tabBarActiveTintColor: purple.purple8,
        // tabBarInactiveTintColor: grayDark.gray11,
        tabBarStyle: {
          display: usePath.includes("/chats/") ? "none" : "flex", // hack
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        tabBarActiveTintColor: pallatte.colorDarkPurple,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Learn",
          headerRight: () => (
            <Link href="/upload" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color={pallatte.colorDarkPurple}
                    style={{ marginRight: 16, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerRight: () => (
            <Link href="/sign-out" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="gear"
                    size={25}
                    color={Colors[colorScheme ?? "light"].border}
                    style={{ marginRight: 16, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
