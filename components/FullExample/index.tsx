import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  ReaderProvider,
  Reader,
  useReader,
  Themes,
  Annotation,
} from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from "./utils";
import { BookmarksList } from "../Bookmarks/BookmarksList";
import { SearchList } from "../Search/SearchList";
import { TableOfContents } from "../TableOfContents/TableOfContents";
import { COLORS } from "../Annotations/AnnotationForm";
import { AnnotationsList } from "../Annotations/AnnotationsList";
import { GifSearch } from "./GifComponents/GifSearch";
import { ImageSearch } from "./ImageComponents/ImageSearch";
import { Translation } from "./TranslationComponents/Translation";

function Component() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    theme,
    annotations,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    addAnnotation,
    removeAnnotation,
    progress,
  } = useReader();

  const bookmarksListRef = React.useRef<BottomSheetModal>(null);
  const searchListRef = React.useRef<BottomSheetModal>(null);
  const gifSearchListRef = React.useRef<BottomSheetModal>(null);
  const translateListRef = React.useRef<BottomSheetModal>(null);
  const imageSearchListRef = React.useRef<BottomSheetModal>(null);
  const tableOfContentsRef = React.useRef<BottomSheetModal>(null);
  const annotationsListRef = React.useRef<BottomSheetModal>(null);

  const [translationActionFired, setTranslationActionFired] = useState(false);
  const [imageActionFired, setImageActionFired] = useState(false);
  const [gifActionFired, setGifActionFired] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
    }
  };

  const dismissAll = () => {
    gifSearchListRef.current?.dismiss();
    imageSearchListRef.current?.dismiss();
    translateListRef.current?.dismiss();
    gifSearchListRef.current?.dismiss();
    annotationsListRef.current?.dismiss();
    searchListRef.current?.dismiss();
    bookmarksListRef.current?.snapToIndex(1);
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(theme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];

    changeTheme(nextTheme);
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

    setCurrentFontFamily(nextFontFamily);
    changeFontFamily(nextFontFamily);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      {!isFullScreen && (
        <Header
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
          onPressSearch={() => searchListRef.current?.present()}
          onOpenBookmarksList={() => bookmarksListRef.current?.present()}
          onOpenTableOfContents={() => tableOfContentsRef.current?.present()}
          onOpenAnnotationsList={() => annotationsListRef.current?.present()}
        />
      )}

      <Reader
        src="file:///Users/willwedmedyk/Library/Developer/CoreSimulator/Devices/B3067352-062B-4180-91FD-85DEF0C2D866/data/Containers/Shared/AppGroup/8E96052D-D191-484E-8CF0-73F3C6AA2537/File%20Provider%20Storage/Der%20karierte%20Uhu%20-%20Moser,%20Erwin.epub"
        width={width}
        height={!isFullScreen ? height * 0.75 : height}
        fileSystem={useFileSystem}
        defaultTheme={Themes.DARK}
        waitForLocationsReady
        initialLocation={"epubcfi(/6/10!/4/8/1:248)"}
        onAddAnnotation={(annotation) => {
          // console.log('onAddAnnotation', annotation);
          if (annotation.type === "highlight" && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          // console.log('onPressAnnotation', annotation);
          setSelectedAnnotation(annotation);
          annotationsListRef.current?.present();
        }}
        menuItems={[
          // {
          //   label: '🟡',
          //   action: (cfiRange) => {
          //     addAnnotation('highlight', cfiRange, undefined, {
          //       color: COLORS[2],
          //     });
          //     return true;
          //   },
          // },
          {
            label: "🔴",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: COLORS[0],
              });
              return true;
            },
          },
          {
            label: "🟢",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: COLORS[3],
              });
              return true;
            },
          },
          {
            label: "✍️", // this was "add note" before i think
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation("highlight", cfiRange, { isTemp: true });
              annotationsListRef.current?.present();
              return true;
            },
          },
          {
            label: "🔄",
            action: (cfiRange, text) => {
              // addAnnotation('highlight', cfiRange, undefined, {
              //   color: COLORS[2],
              // });
              console.log("action fired translate", text);
              setSelection({ cfiRange, text });
              setTranslationActionFired(true);
              translateListRef.current?.present();
              return true;
            },
          },
          {
            label: "🤾‍♀️",
            action: (cfiRange, text) => {
              console.log("action fired gif", text);
              setSelection({ cfiRange, text });
              setGifActionFired(true);
              gifSearchListRef.current?.present();
              // gifSearchListRef.current?.snapToIndex(0)
              // addAnnotation('highlight', cfiRange, { isTemp: true });
              // annotationsListRef.current?.present();
              return true;
            },
          },
          {
            label: "🌄",
            action: (cfiRange, text) => {
              console.log("action fired image");
              setSelection({ cfiRange, text });
              setImageActionFired(true);
              imageSearchListRef.current?.present();
              return true;
            },
          },
        ]}
        onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
      />

      <BookmarksList
        ref={bookmarksListRef}
        onClose={() => bookmarksListRef.current?.dismiss()}
      />

      <GifSearch
        ref={gifSearchListRef}
        gifActionFired={gifActionFired}
        setGifActionFired={setGifActionFired}
        onClose={() => gifSearchListRef.current?.dismiss()}
        selection={selection}
      />

      <ImageSearch
        ref={imageSearchListRef}
        imageActionFired={imageActionFired}
        setImageActionFired={setImageActionFired}
        onClose={() => imageSearchListRef.current?.dismiss()}
        selection={selection}
      />

      <Translation
        ref={translateListRef}
        translationActionFired={translationActionFired}
        setTranslationActionFired={setTranslationActionFired}
        selection={selection}
        onClose={() => translateListRef.current?.dismiss()}
      />

      <SearchList
        ref={searchListRef}
        onClose={() => searchListRef.current?.dismiss()}
      />

      <TableOfContents
        ref={tableOfContentsRef}
        onClose={() => tableOfContentsRef.current?.dismiss()}
        onPressSection={(selectedSection) => {
          goToLocation(selectedSection.href.split("/")[1]);
          tableOfContentsRef.current?.dismiss();
        }}
      />

      <AnnotationsList
        ref={annotationsListRef}
        selection={selection}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        onClose={() => {
          setTempMark(null);
          setSelection(null);
          setSelectedAnnotation(undefined);
          if (tempMark) removeAnnotation(tempMark);
          annotationsListRef.current?.dismiss();
        }}
      />

      {!isFullScreen && <Footer />}
    </GestureHandlerRootView>
  );
}

export function FullExample() {
  return (
    <ReaderProvider>
      <Component />
    </ReaderProvider>
  );
}
