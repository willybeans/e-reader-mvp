import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import { Text, View, TextInput } from "../../components/Themed";
import { Button } from "../../components/Button";
import { api, buildUrl, ReqBody } from "../../helpers/api";
import { router } from "expo-router";
import { storeData } from "../../helpers/localStorage";
import Colors from "../../constants/Colors";

type Asset = {
  test?: any;
  uri: string;
  name: string;
  type: string;
};

export default function UploadScreen() {
  const colorScheme = useColorScheme();
  const [image, setImage] = useState<any>(null);
  const [asset, setAsset] = useState<Asset>({} as Asset);
  const [link, setLink] = useState<string>("");

  const displayModal = (webText: string) => {
    storeData("newContent", webText); // local storage
    router.push({
      pathname: "/newContentScreen",
      // params: {
      //   content: JSON.stringify({ webText }),
      // },
    });
  };

  const onLinkSubmit = async () => {
    let websiteText: { body: string; heading: string } = await api(
      `${buildUrl()}/scrape?url=${link}`
    );
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
    displayModal(imageData.message);
  };

  const onCancel = () => {
    setImage(null);
    setAsset({} as Asset);
  };

  const onContinue = () => {
    displayModal(`
    Start writing your own content here by clicking the edit button! Please try and use simple words and phrases and provide a lot of context for what more difficult words may mean
  `);
  };

  const onDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled) {
      console.log("result", result);
    }
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Text From Website</Text>
      <Text style={styles.textInstructions}>
        Please insert a valid url of a website
      </Text>
      <View style={styles.rowWrap}>
        {/* <View
            style={styles.input}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          > */}
        <TextInput
          onChangeText={setLink}
          placeholder="Your URL Here"
          style={{
            borderColor: Colors[colorScheme ?? "light"].border,
            // marginLeft: 10,
            height: "100%",
            width: "70%",
          }}
        />
        {/* </View> */}
        <Button style={{ maxWidth: "25%" }} onPress={onLinkSubmit} />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Text From Image</Text>

      <View style={{ width: "100%", marginLeft: 20 }}>
        <Text style={styles.textInstructions}>
          Please adhere to the following:
        </Text>
        <Text style={styles.textInstructions}>
          {`\u2022 use good lighting when taking your photo`}
        </Text>
        <Text style={styles.textInstructions}>
          {`\u2022 insert a JPEG, PNG, or Tiff file type`}
        </Text>
      </View>

      {image ? (
        <View />
      ) : (
        <Button
          style={{ maxWidth: "50%" }}
          title="Upload Image"
          onPress={pickImage}
        />
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {image && (
        <>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              width: "100%",
            }}
          >
            <Button
              title="Submit"
              style={{ maxWidth: "25%", marginRight: 10 }}
              onPress={onSubmit}
            />
            <Button
              style={{ maxWidth: "25%" }}
              title="Cancel"
              onPress={onCancel}
            />
          </View>
        </>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Write your own custom content</Text>
      <Button
        title="Continue"
        style={{ maxWidth: "50%" }}
        onPress={onContinue}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Upload an EPub File</Text>
      <Button
        title="Upload EPub"
        style={{ maxWidth: "50%" }}
        onPress={onDocumentPicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // not used anymore because of scroll view swap
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  rowWrap: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    alignContent: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 30,
    flex: 1,
  },
  textInstructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
