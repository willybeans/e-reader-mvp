/* eslint-disable react/no-unused-prop-types */

/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import {
  SearchResult as SearchResultType,
  useReader,
} from '@epubjs-react-native/core';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Text } from 'react-native-paper';
import GifSearchResult from './GifSearchResult';
import { contrast } from '../utils';

interface Props {
  selection: {
    cfiRange: string;
    text: string;
  } | null;
  onClose: () => void;
  gifActionFired: boolean;
  setGifActionFired: Dispatch<SetStateAction<boolean>>;
}
export type Ref = BottomSheetModalMethods;

/* 
you must do the following: 
 0) api key:  AIzaSyBW1XYzGH5kYoAASX7W6-EQyyJiemUjk0w 
 1) attribution : Search Tenor. Use this attribution as the placeholder text in your search box.
 or logos here https://media.tenor.com/website/gifapi-assets/index.html


 2 - url search for excited top 8 GIFs
curl "https://tenor.googleapis.com/v2/search?q=excited&key=API_KEY&client_key=my_test_app&limit=8"

3 - celebrate being done with the MVP for this 

4 - when you're ready, you can add the other features like autocomplete for example, or share events in chats
https://developers.google.com/tenor/guides/quickstart#curl_1

***** gifs not supported natively by android ***** 
https://reactnative.dev/docs/0.71/image#gif-and-webp-support-on-android
*/

const API_KEY = "AIzaSyBW1XYzGH5kYoAASX7W6-EQyyJiemUjk0w"

export interface GifSearchAPI {
  results: GifResult[];
  next:    string;
}

export interface GifResult {
  id:                         string;
  title:                      string;
  media_formats:              { [key: string]: MediaData };
  created:                    number;
  content_description:        string;
  itemurl:                    string;
  url:                        string;
  tags:                       string[];
  flags:                      any[];
  hasaudio:                   boolean;
  content_description_source: string;
}

export interface MediaData {
  url:      string;
  duration: number;
  preview:  string;
  dims:     number[];
  size:     number;
}


interface GifSearchResult {

}

export const GifSearch = forwardRef<Ref, Props>(({ onClose, selection, gifActionFired, setGifActionFired }, ref) => {
  const {
    searchResults,
    goToLocation,
    search,
    // clearSearchResults,
    // isSearching,
    // addAnnotation,
    // removeAnnotationByCfi,
    theme,
  } = useReader();

  const [data, setData] = useState<SearchResultType[]>(searchResults.results);
  const [page, setPage] = useState(1);

  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [gifData, setGifData] = useState<GifResult[]>();

  const snapPoints = React.useMemo(() => ['50%', '90%'], []);

  const fetchGifs = async (termForSearch): Promise<Response> => {
    return await fetch(`https://tenor.googleapis.com/v2/search?q=${termForSearch}&key=${API_KEY}&client_key=my_test_app&limit=8`).then((data: Response) => data.json())
  }

  const getGifApi = React.useCallback((text) => {
    // if(searchTerm.length > 0) {
      fetchGifs(text).then((res: any) => {
        // if (!ignore) {
          // https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
          const obj = res.results as GifResult[]
          console.log("getgifapi fired',", searchTerm, obj)
          setGifData(obj);
          setIsSearching(false)
        // }
      });
    // }
  }, [])

  // const clearSearchTerm = React.useCallback(() => {
  //   console.log('gif action swapped', shouldUpdateSearchTerm);
  // }, [shouldUpdateSearchTerm]);

  useEffect(() => {
    //stand in API req until ReactQuery
    let ignore = false;
    setGifData(null);
    if(selection?.text && selection.text.length > 0 && searchTerm.length === 0) {
      // fetchGifs(selection?.text).then((res: any) => {
      //   if (!ignore) {
      //     // https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
      //     const obj = res.results as GifResult[]
      //     console.log("gif fired',", obj)
      //     setGifData(obj);
      //     setIsSearching(false)
      //   }
      //   if(selection.text !== searchTerm) {
      // console.log('set initial search term', selection?.text)
          // setSearchTerm(selection?.text)
      //   }
      // });
      /* 
        if selection !== searchTerm == update
      */
    }
    if(!ignore && selection?.text?.length > 0) {
      if(gifActionFired) {
        setSearchTerm(selection?.text)
        getGifApi(selection?.text)
        setGifActionFired(false);
      }

    }

    // clearSearchTerm();


    return () => {
      ignore = true;
      setIsSearching(true)
    };
  }, [selection, getGifApi]);



  const renderItem = React.useCallback(
    ({ item }: { item: GifResult }) => (
      <GifSearchResult
        searchTerm={searchTerm}
        searchResult={item}
        onPress={(searchResult) => {
          // goToLocation(searchResult.cfi);
          // addAnnotation('highlight', searchResult.cfi);
          // setTimeout(() => {
          //   removeAnnotationByCfi(searchResult.cfi);
          // }, 3000);
          // clearSearchResults();
          // setPage(1);
          // setData([]);

          onClose();
        }}
      />
    ),
    [
      // addAnnotation,
      // clearSearchResults,
      goToLocation,
      onClose,
      // removeAnnotationByCfi,
      searchTerm,
    ]
  );

  const header = React.useCallback(
    () => (
      <View>
        <View style={styles.title}>
          <Text
            variant="titleMedium"
            style={{ color: contrast[theme.body.background] }}
          >
            Gif Search Results
          </Text>
        </View>

        <View style={{ width: '100%' }}>
          <BottomSheetTextInput
            inputMode="search"
            returnKeyType="search"
            returnKeyLabel="Search"
            autoCorrect={false}
            autoCapitalize="none"
            defaultValue={searchTerm}
            style={styles.input}
            placeholder={"Type a search term here..."}
            placeholderTextColor={contrast[theme.body.background]}
            onSubmitEditing={(event) => {
              setSearchTerm(event.nativeEvent.text);
              getGifApi(event.nativeEvent.text)
              console.log('gif onSubmitedditing', event.nativeEvent.text)
              // clearSearchResults();
              // setData([]);
              // setPage(1);
              // search(event.nativeEvent.text, 1, 20);
            }}
          />
        </View>

        {isSearching && (
          <View style={styles.title}>
            <Text
              variant="bodyMedium"
              style={{
                fontStyle: 'italic',
                color: contrast[theme.body.background],
              }}
            >
              Searching results...
            </Text>
          </View>
        )}
      </View>
    ),
    [isSearching, searchTerm, theme.body.background]
  );

  const footer = React.useCallback(
    () => (
      <View style={styles.title}>
        {isSearching && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ActivityIndicator animating />

            <Text
              variant="bodyMedium"
              style={{
                fontStyle: 'italic',
                marginLeft: 5,
                color: contrast[theme.body.background],
              }}
            >
              fetching results...
            </Text>
          </View>
        )}

        {data.length > 0 &&
          data.length === searchResults.totalResults &&
          !isSearching && (
            <Text
              variant="bodyMedium"
              style={{
                fontStyle: 'italic',
                color: contrast[theme.body.background],
              }}
            >
              No more results at the moment...
            </Text>
          )}
      </View>
    ),
    [
      data.length,
      isSearching,
      searchResults.totalResults,
      theme.body.background,
    ]
  );

  const empty = React.useCallback(
    () => (
      <View style={styles.title}>
        <Text
          variant="bodyMedium"
          style={{
            fontStyle: 'italic',
            color: contrast[theme.body.background],
          }}
        >
          No results...
        </Text>
      </View>
    ),
    [theme.body.background]
  );

  const handleClose = React.useCallback(() => {
    // clearSearchResults();
    setPage(1);
    setData([]);
  // }, [clearSearchResults]);
}, []);

  const fetchMoreData = React.useCallback(() => {
    if (searchResults.results.length > 0 && !isSearching) {
      search(searchTerm, page + 1, 20);
      setPage(page + 1);
    }
  }, [isSearching, page, search, searchResults.results.length, searchTerm]);

  React.useEffect(() => {
    if (searchResults.results.length > 0) {
      setData((oldState) => [...oldState, ...searchResults.results]);
    }
  }, [searchResults]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        style={styles.container}
        backgroundStyle={{ backgroundColor: theme.body.background }}
        onDismiss={handleClose}
      >
        <BottomSheetFlatList<GifResult>
          data={gifData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => {
            // console.log('keyExtractor!', item, index);
            return item.id
          }}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListEmptyComponent={empty}
          style={styles.listContainer}
          maxToRenderPerBatch={20}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    alignItems: 'center',

  },
  listContainer: {
    width: '100%',
  },
  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
});
