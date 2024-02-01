import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { Image, ScrollView } from "react-native";
import { Text, View } from "../../../components/Themed";

interface MsgData {
  msgs: Msg[];
}

type Msg = {
  userId: string;
  userName: string;
  icon: string;
  text: string;
};

const msgData: MsgData = {
  msgs: [
    {
      userId: "12345",
      userName: "brian1",
      icon: "http://placekitten.com/100/400",
      text: "Hey I saw your last mes im not sure whatever thsisis is going and stuff",
    },
    {
      userId: "34567",
      userName: "cindy1",
      icon: "http://placekitten.com/200/300",
      text: "Whenever i go out i try to go dancing i always eat cabbage before",
    },
    {
      userId: "12345",
      userName: "brian1",
      icon: "http://placekitten.com/100/400",
      text: "Hey I saw your last messsage and i thought about it",
    },
    {
      userId: "34567",
      userName: "cindy1",
      icon: "http://placekitten.com/200/300",
      text: "Whenever i eat cheese it tastes like cheese",
    },
  ],
};

export default () => {
  const [msgList, setMsgList] = useState<Msg[] | undefined>();
  //need to usecontext for present userId
  const userId = "12345";
  useEffect(() => {
    setMsgList([...msgData.msgs]);
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
        {msgList?.map((m, i) => {
          return (
            <View // needs on click handler
              key={i}
            >
              {/* <Image /> */}

              <View>
                <Text>{m.userName}</Text>
                {/* wordWrap="break-word" */}
                <Text>{m.text}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
