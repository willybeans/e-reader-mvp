import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

type CountBannerProps = {
  onPress: (type: string) => void;
  page: number;
};

export function CountBanner({ page, onPress }: CountBannerProps) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.banner}>
      {page > 0 && (
        <>
          <FontAwesome
            name="arrow-left"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            onPress={() => onPress("down")}
          />
        </>
      )}
      <Text style={styles.counter}>{page}</Text>
      <FontAwesome
        name="arrow-right"
        size={25}
        color={Colors[colorScheme ?? "light"].text}
        onPress={() => onPress("up")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  counter: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 20,
  },
});
