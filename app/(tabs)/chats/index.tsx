import { useState, useEffect } from "react";
import { Link, Href, LinkProps, HrefObject } from "expo-router";
import { ScrollView, Image } from "react-native";
import { Text, View } from "../../../components/Themed";

interface UserData {
  chats: Chat[];
}

type Chat = {
  userId: string;
  userName: string;
  lastMessageClip: string;
};

type Url = {
  pathname: string;
  params?: { id: string };
};

const userData: UserData = {
  chats: [
    {
      userId: "12345",
      userName: "Matthew",
      lastMessageClip: "Hey I saw your last mes...",
      //last message should come in full and be reduced in render
      // chat id should be included for linking to websocket/db
    },
    {
      userId: "34567",
      userName: "Cindy",
      lastMessageClip: "Whenever i go out i try....",
    },
    {
      userId: "23456",
      userName: "Brian",
      lastMessageClip: "The last time i went dow...",
    },
  ],
};

export default () => {
  const [chatList, setChatList] = useState<Chat[] | undefined>();
  useEffect(() => {
    setChatList([...userData.chats]);
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <View>
        {chatList?.map((c, i) => {
          return (
            <Link
              key={i}
              href={
                {
                  //
                  pathname: `/chats/${c.userId}`,
                  // params: { id: "bacon" },
                } as HrefObject<Url>
              }
            >
              <View // needs on click handler
              >
                <Image
                  source={{ uri: "http://placekitten.com/200/300" }}
                  style={{ width: 40, height: 40 }}
                />
                <View>
                  <Text>{c.userName}</Text>
                  <Text>{c.lastMessageClip}</Text>
                </View>
              </View>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};
