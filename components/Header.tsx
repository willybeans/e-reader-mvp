import { Image } from "react-native";
import { Text, TextProps, View } from "./Themed";

export function Header(props: TextProps, color: string) {
  console.log("text: ", props);
  return (
    <View>
      {/* <Image /> */}

      <Text>usersname</Text>
    </View>
  );
}
