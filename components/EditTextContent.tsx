import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { View, TextInput } from "./Themed";
import Colors from "../constants/Colors";

type Props = {
  content?: string;
  updateContent: Dispatch<SetStateAction<string>> | (([string]: any) => void);
};

export default function EditTextContent(props: Props) {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        {
          borderColor: Colors[colorScheme ?? "light"].border,
        },
        styles.container,
      ]}
    >
      <TextInput
        multiline
        numberOfLines={5}
        style={styles.textContainer}
        onChangeText={(newText) => props.updateContent(newText)}
        defaultValue={props.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    maxHeight: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
  },
  textContainer: {
    maxHeight: 200,
    padding: 10,
  },
});
