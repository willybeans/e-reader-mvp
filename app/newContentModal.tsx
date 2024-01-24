import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import { Button } from "../components/Button";
import EditTextContent from "../components/EditTextContent";
import ReadTextContent from "../components/ReadTextContent";

// import { useLocalSearchParams } from "expo-router";
import { getDataString } from "../helpers/localStorage";

export default function NewContentScreen() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  // const params = useLocalSearchParams<{ content: string }>();
  // const { content } = params;

  useEffect(() => {
    (async function () {
      let storedContent = await getDataString("newContent");

      if (typeof storedContent === "string") {
        setText(storedContent);
      }
    })();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Please confirm the text and edit it before saving
        </Text>
        <View style={styles.rowWrap}>
          <Button
            title={`toggle ${isEdit ? "read" : "edit"}`}
            onPress={() => setIsEdit(!isEdit)}
            style={{ width: "50%" }}
          />
          {isEdit && text ? (
            <EditTextContent updateContent={setText} content={text} />
          ) : (
            <ReadTextContent content={text} />
          )}
          <Button
            title="save content"
            onPress={() => setIsEdit(!isEdit)}
            style={{ width: "50%" }}
          />
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  rowWrap: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
