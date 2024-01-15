import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TextInput } from "./Themed";

type Props = {
  content?: string;
  updateContent: Dispatch<SetStateAction<string>>;
};

export default function EditTextContent(props: Props) {
  // const [text, setText] = useState<string>("");

  // useEffect(() => {
  //   if (props?.content) setText(props.content);
  // }, [props]);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          multiline
          numberOfLines={8}
          style={styles.textContainer}
          onChangeText={(newText) => props.updateContent(newText)}
          defaultValue={props.content}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 50,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    backgroundColor: "#FFF",
  },
  textContainer: {
    padding: 10,
  },
});
