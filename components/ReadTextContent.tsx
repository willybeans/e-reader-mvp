import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { cleanString, createPagination } from "../helpers/utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CountBanner } from "./CountBanner";

type Props = {
  content?: string;
  // heading?: string;
};

export default function ReadTextContent(props: Props) {
  const [text, setText] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  // const [headingText, setHeadingText] = useState<string>("");

  const pan = Gesture.Pan().onStart((event) => {
    if (event.velocityX > 0) {
      if (page === 0) return;
      setPage(page - 1);
    } else {
      if (page >= text.length - 1) return;
      setPage(page + 1);
    }
  });

  useEffect(() => {
    if (props?.content) {
      const windowHeight = Dimensions.get("window").height;
      const cleaned = cleanString(props.content); // broken?
      const paginated = createPagination(Math.floor(windowHeight / 2), cleaned);
      setText(paginated);
    }
  }, [props]);

  const pagePress = (type: string) => {
    if (type === "up") {
      setPage(page + 1);
    } else {
      if (page === 0) return;
      setPage(page - 1);
    }
  };

  return (
    <GestureDetector gesture={pan}>
      <View>
        <CountBanner
          page={page}
          totalPages={text?.length}
          onPress={pagePress}
        />
        <View style={styles.container}>
          {/* {headingText && <Text>{headingText}</Text>} */}
          <Text style={styles.readerText}>{text[page]}</Text>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  readerText: {
    fontSize: 20,
    lineHeight: 35,
  },
});
