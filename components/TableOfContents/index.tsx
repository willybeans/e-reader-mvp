/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { ReaderProvider, Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./Header";
import { TableOfContents } from "./TableOfContents";
import { Footer } from "./Footer";

function Toc() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const { goToLocation } = useReader();

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  return (
    <GestureHandlerRootView
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header onOpenTocList={() => bottomSheetRef.current?.present()} />

      <Reader
        src="file:///Users/willwedmedyk/Library/Developer/CoreSimulator/Devices/B3067352-062B-4180-91FD-85DEF0C2D866/data/Containers/Data/Application/AE064F79-E7F7-4855-A3F9-6CC61648763B/Library/Caches/DocumentPicker/0F799A24-3E5F-4364-A1F1-78E3EF38971B.epub"
        width={width}
        height={height * 0.8}
        fileSystem={useFileSystem}
      />

      <TableOfContents
        ref={bottomSheetRef}
        onPressSection={(section) => {
          goToLocation(section.href.split("/")[1]);
          bottomSheetRef.current?.dismiss();
        }}
        onClose={() => bottomSheetRef.current?.dismiss()}
      />

      <Footer />
    </GestureHandlerRootView>
  );
}

export default function Wrapper() {
  return (
    <ReaderProvider>
      <Toc />
    </ReaderProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
