import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TextInput } from "./Themed";

type Props = {
  content?: string;
};

export default function ReadTextContent(props: Props) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (props?.content) setText(props.content);
  }, [props]);

  return (
    <View>
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 50,
  },
});
