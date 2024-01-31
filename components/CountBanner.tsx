import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

type CountBannerProps = {
  onPress: (type: string) => void;
  page?: number;
  totalPages?: number;
};

export function CountBanner(props: CountBannerProps) {
  const { page, totalPages, onPress } = props;
  const colorScheme = useColorScheme();

  return (
    <View style={styles.banner}>
      {page !== undefined && page > 0 && (
        <FontAwesome
          name="arrow-left"
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          onPress={() => onPress("down")}
        />
      )}
      {page !== undefined && <Text style={styles.counter}>{page}</Text>}
      {totalPages !== undefined &&
        page !== undefined &&
        page < totalPages - 1 && (
          <FontAwesome
            name="arrow-right"
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            onPress={() => onPress("up")}
          />
        )}
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
