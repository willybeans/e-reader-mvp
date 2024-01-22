import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TextInput } from "./Themed";

type Props = {
  content?: string;
  // heading?: string;
};

export default function ReadTextContent(props: Props) {
  const [text, setText] = useState<string>("");
  // const [headingText, setHeadingText] = useState<string>("");

  useEffect(() => {
    if (props?.content) setText(props.content);
    // if (props?.heading) setHeadingText(props.heading);
  }, [props]);

  return (
    <View>
      <View style={styles.container}>
        {/* {headingText && <Text>{headingText}</Text>} */}
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
