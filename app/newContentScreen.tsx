// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  useColorScheme,
  Dimensions,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

import { Text, TextInput, View } from "../components/Themed";
import { Button } from "../components/Button";
import EditTextContent from "../components/EditTextContent";
import ReadTextContent from "../components/ReadTextContent";

import { getDataString } from "../helpers/localStorage";
import { api, buildUrl } from "../helpers/api";
import Colors from "../constants/Colors";
import { PickerComponent } from "../components/PickerComponent";

type Genre =
  | "drama"
  | "horror"
  | "comedy"
  | "action"
  | "sci-fi"
  | "education"
  | "fiction"
  | "non-fiction";

const labels: Genre[] = [
  "drama",
  "horror",
  "comedy",
  "action",
  "sci-fi",
  "fiction",
  "non-fiction",
  "education",
];

export default function NewContentScreen() {
  const colorScheme = useColorScheme();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<Genre>("education");
  const navigation = useNavigation();
  const [pickerState, setPickerState] = useState<boolean>(false);

  const pickerRef = useRef<HTMLInputElement>(null);

  const togglePicker = () => {
    setPickerState(!pickerState);
  };

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
    <View style={styles.container}>
      {pickerState && (
        <View
          style={{
            width: "75%",
            backgroundColor: Colors[colorScheme ?? "light"].matchTint,
            position: "absolute",
            left: "14.5%",
            top: 100,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors[colorScheme ?? "light"].border,
            zIndex: 9999,
          }}
        >
          <PickerComponent
            pickerRef={pickerRef}
            pickerValue={genre}
            setPickerValue={setGenre}
            labels={labels}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              height: 50,
            }}
          >
            <Button
              style={{ width: "50%" }}
              title="close"
              onPress={togglePicker}
            />
          </View>
        </View>
      )}

      <Text style={styles.title}>Please confirm edit text before saving</Text>
      <View style={styles.columnContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.titleWrapper}>
            <Text style={styles.info}>Title:</Text>
            <TextInput
              placeholder="Your Title Here"
              style={{
                height: "100%",
                width: "85%",
                borderColor: Colors[colorScheme ?? "light"].border,
              }}
              onChangeText={setTitle}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.info}>Desc:</Text>
            <TextInput
              placeholder="Your Description Here"
              style={{
                height: "100%",
                width: "85%",
                // paddingBottom: 10,
                borderColor: Colors[colorScheme ?? "light"].border,
              }}
              onChangeText={setTitle}
            />
          </View>

          <View
            style={[
              styles.titleWrapper,
              {
                marginTop: 10,
                justifyContent: "flex-start",
                flexGrow: 1,
                height: 35,
              },
            ]}
          >
            <Text style={styles.info}>Genre:</Text>
            <View
              style={{
                borderRadius: 15,
                marginLeft: 10,
                height: "100%",
                justifyContent: "center",
                padding: 1,
                backgroundColor: Colors[colorScheme ?? "light"].matchTint,
              }}
            >
              <Pressable
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onPress={togglePicker}
              >
                <Text>{genre}</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Button
          title={`toggle ${isEdit ? "read" : "edit"}`}
          onPress={() => setIsEdit(!isEdit)}
          style={{ width: "50%", marginTop: 10 }}
        />

        {isEdit && text ? (
          <EditTextContent updateContent={setText} content={text} />
        ) : (
          <ReadTextContent content={text} />
        )}
      </View>

      <Button
        title="save content"
        onPress={onPressSave}
        style={{ width: "50%" }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height - 90,
    paddingBottom: 20,
  },
  columnContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  titleWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  info: {
    fontWeight: "700",
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
