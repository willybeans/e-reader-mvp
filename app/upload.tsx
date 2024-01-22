import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { Text, View, TextInput } from "../components/Themed";
import { Button } from "../components/Button";
import { api, buildUrl, getLocalType, ReqBody } from "../helpers/api";
import { Link, router } from "expo-router";
import { storeData } from "../helpers/localStorage";

type Asset = {
  test?: any;
  uri: string;
  name: string;
  type: string;
};

export default function UploadScreen() {
  const [image, setImage] = useState<any>(null);
  const [asset, setAsset] = useState<Asset>({} as Asset);
  const [link, setLink] = useState<string>("");

  const displayModal = (webText: string) => {
    storeData("newContent", webText); // local storage
    router.push({
      pathname: "/newContentModal",
      // params: {
      //   content: JSON.stringify({ webText }),
      // },
    });
  };

  const onLinkSubmit = async () => {
    let websiteText: { body: string; heading: string } = await api(
      `${buildUrl()}/scrape?url=${link}`
    );
    const cleanSlash = websiteText.body.replace("\\n|\\/gm", " ");
    displayModal(websiteText.body);
  };

  const onSubmit = async () => {
    const { uri, name, type } = asset;
    let formData = new FormData();

    formData.append("image", {
      name,
      uri,
      type,
    } as any);
    formData.append("languages", "deu");

    let imageData: { message: string } = await api(`${buildUrl()}/image`, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    } as ReqBody);
    // setText(imageData.message);
    displayModal(imageData.message);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.assets[0].uri;
      let filename = localUri.split("/").pop() as string;

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      // Assume "photo" is the name of the form field the server expects
      setAsset({
        uri: localUri,
        name: filename,
        type,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Text From Website</Text>
        <View style={styles.rowWrap}>
          <View
            style={styles.input}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <TextInput
              onChangeText={setLink}
              placeholder="Your URL Here"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </View>
          <Button onPress={onLinkSubmit} />
        </View>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text style={styles.title}>Text From Image</Text>
        <Button title="Upload Image" onPress={pickImage} />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        {image && (
          <>
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
            <Button title="Submit" onPress={onSubmit} />
          </>
        )}
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
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 30,
    flex: 1,
    borderBlockColor: "fff",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
