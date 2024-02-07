import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

import { Text, TextInput, View } from "../components/Themed";
import { Button } from "../components/Button";
import EditTextContent from "../components/EditTextContent";
import ReadTextContent from "../components/ReadTextContent";

import { getDataString } from "../helpers/localStorage";
import { api, buildUrl } from "../helpers/api";

export default function NewContentScreen() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const navigation = useNavigation();

  const handleResetAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ key: "(tabs)", name: "(tabs)" }],
      })
    );
  };

  useEffect(() => {
    (async function () {
      let storedContent = await getDataString("newContent");

      if (typeof storedContent === "string") {
        setText(storedContent);
      }
    })();
  }, []);

  const onPressSave = async () => {
    try {
      await api(`${buildUrl()}/newContent`, {
        method: "POST",
        body: JSON.stringify({
          title: title.length > 0 ? title : "no title",
          body_content: text,
          author_id: "d2792a62-86a4-4c49-a909-b1e762c683a3",
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      handleResetAction();
    } catch (e) {
      console.error("error: ", e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Please confirm the text and edit it before saving
        </Text>
        <View style={styles.columnContainer}>
          <Button
            title={`toggle ${isEdit ? "read" : "edit"}`}
            onPress={() => setIsEdit(!isEdit)}
            style={{ width: "50%" }}
          />
          <View style={styles.titleWrapper}>
            <Text>Title:</Text>
            <TextInput
              placeholder="Your Title Here"
              style={{
                height: "100%",
                width: "90%",
                borderColor: "red",
              }}
              onChangeText={setTitle}
            />
          </View>
          <View style={{ flexDirection: "row" }}></View>

          {isEdit && text ? (
            <EditTextContent updateContent={setText} content={text} />
          ) : (
            <ReadTextContent content={text} />
          )}
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Button
          title="save content"
          onPress={onPressSave}
          style={{ width: "50%" }}
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
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
