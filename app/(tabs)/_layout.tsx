import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

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

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof FontAwesome>["name"] =
            "code";
          switch (route.name) {
            case "chats":
              // iconName = "home";
              iconName = "wechat";
              break;
            case "learn":
              iconName = "pencil";
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
        // headerStyle: {
        //   backgroundColor: "black",
        // },
        // headerTitleAlign: "center",
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // tabBarInactiveTintColor: grayDark.gray11,

        tabBarStyle: { backgroundColor: "black" },
      })}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
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
        }}
      />
    </Tabs>
  );
}
