import { StatusBar } from "expo-status-bar";
import { Image, ImageSourcePropType, Platform, StyleSheet } from "react-native";
import { SetStateAction, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, TextInput } from "../components/Themed";
import { Button } from "../components/Button";

export default function UploadScreen() {
  const buttonPress = () => {
    console.log("press");
  };

  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    console.log("test");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>input a link here</Text>
      <View style={styles.rowWrap}>
        <View
          style={styles.input}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        >
          <TextInput
            placeholder="testt"
            style={{ height: "100%", width: "100%" }}
          />
        </View>
        <Button title="submit" onPress={buttonPress} />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>upload an image</Text>
      <Button title="get text from an image" onPress={pickImage} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 30,
    width: "50%",
    borderBlockColor: "fff",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: "80%",
  },
});
