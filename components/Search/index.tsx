import * as React from "react";
import { useWindowDimensions } from "react-native";
import { Reader, ReaderProvider } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Header } from "./Header";
import { SearchList } from "./SearchList";

function Inner() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const searchListRef = React.useRef<BottomSheetModal>(null);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Header onPressSearch={() => searchListRef.current?.present()} />

      <Reader
        src="file:///Users/willwedmedyk/Library/Developer/CoreSimulator/Devices/B3067352-062B-4180-91FD-85DEF0C2D866/data/Containers/Data/Application/AE064F79-E7F7-4855-A3F9-6CC61648763B/Library/Caches/DocumentPicker/0F799A24-3E5F-4364-A1F1-78E3EF38971B.epub"
        height={height * 0.8}
        fileSystem={useFileSystem}
      />

      <SearchList
        ref={searchListRef}
        onClose={() => searchListRef.current?.dismiss()}
      />
    </GestureHandlerRootView>
  );
}

export function Search() {
  return (
    <ReaderProvider>
      <Inner />
    </ReaderProvider>
  );
}
