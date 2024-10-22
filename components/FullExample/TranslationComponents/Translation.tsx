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
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Text } from 'react-native-paper';
import { contrast } from '../utils';
import { TranslationResponse } from './TranslationTypes';
import TranslationResult from './TranslationResult'

interface Props {
  selection: {
    cfiRange: string;
    text: string;
  } | null;
  onClose: () => void;
  translationActionFired: boolean;
  setTranslationActionFired: Dispatch<SetStateAction<boolean>>
}
export type Ref = BottomSheetModalMethods;


export const Translation = forwardRef<Ref, Props>(({ onClose, selection, translationActionFired, setTranslationActionFired }, ref) => {
  const {
    searchResults,
    goToLocation,
    theme,
  } = useReader();

  const [data, setData] = useState<SearchResultType[]>(searchResults.results);
  const [page, setPage] = useState(1);

  const [isSearching, setIsSearching] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [translationData, setTranslationData] = useState<TranslationResponse>({});

  const snapPoints = React.useMemo(() => ['50%', '90%'], []);

  const fetchTranslation = async (termForSearch): Promise<Response> => {
    return await fetch(`http://localhost:5000/translate`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        q: termForSearch,
        source: 'auto', // source: "de",
        target: "en",
        format: "text",
        alternatives: 3
      }),
    })
    .then((data: Response) => data.json())
  }

  const getTranslationResults = React.useCallback((text) => {
    // if(searchTerm.length > 0) {
      fetchTranslation(text).then((res: any) => {
          // https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
          const obj = res as TranslationResponse // this shouldnt be an array but the flatlist needs it
          setTranslationData(obj);
          setIsSearching(false)
      });
    // }
  }, [])

  useEffect(() => {
    //stand in API req until ReactQuery
    let ignore = false;
    setTranslationData(null);

    if (!ignore && selection?.text && translationActionFired) {
        setSearchTerm(selection?.text)
        getTranslationResults(selection?.text)
        setTranslationActionFired(false);
    }

    return () => {
      ignore = true;
      setIsSearching(true)
    };
  }, [selection, getTranslationResults]);

  const renderItem = React.useCallback(
    ({ item }: { item: TranslationResponse }) => (
      <TranslationResult
        searchTerm={searchTerm}
        translationResult={item}
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

        {/* <View style={{ width: '100%' }}>
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
              // clearSearchResults();
              // setData([]);
              // setPage(1);
              // search(event.nativeEvent.text, 1, 20);
            }}
          />
        </View> */}

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

  // const fetchMoreData = React.useCallback(() => {
  //   if (searchResults.results.length > 0 && !isSearching) {
  //     search(searchTerm, page + 1, 20);
  //     setPage(page + 1);
  //   }
  // }, [isSearching, page, search, searchResults.results.length, searchTerm]);

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
        <BottomSheetScrollView style={{ width: '100%' }}>
          <View style={styles.menuItems}>
            <View><Text style={styles.menuItem}>1st Lang(auto)</Text></View>
            <View><Text style={styles.menuItem}>🔄</Text></View>
            <View><Text style={styles.menuItem}>English</Text></View>
          </View>

          {/* you need to add this for language select
          
          https://www.npmjs.com/package/react-native-element-dropdown 
          
          */}

          <BottomSheetTextInput
            inputMode="search"
            returnKeyType="search"
            returnKeyLabel="Search"
            autoCorrect={false}
            autoCapitalize="none"
            defaultValue={searchTerm}
            style={styles.input}
            placeholder={'Translate here'}
            placeholderTextColor={contrast[theme.body.background]}
            multiline={false}
            onSubmitEditing={(event) => {
              setSearchTerm(event.nativeEvent.text);
              getTranslationResults(event.nativeEvent.text)
              // clearSearchResults();
              // setData([]);
              // setPage(1);
              // search(event.nativeEvent.text, 1, 20);
            }}
          />
          {/* <Text>hi</Text> */}
          <TranslationResult
          searchTerm={searchTerm}
          translationResult={translationData}
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
        </BottomSheetScrollView>
        {/* <BottomSheetFlatList<TranslationResponse>
          data={translationData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => {
            // console.log('keyExtractor!', item, index);
            return item.translatedText
          }}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListFooterComponent={footer}
          ListEmptyComponent={empty}
          style={styles.listContainer}
          maxToRenderPerBatch={20}
          onEndReachedThreshold={0.2}
          onEndReached={fetchMoreData}
        /> */}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'

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
    height: 80,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
  },
  menuItems: 
    {flexDirection: 'row', 
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    menuItem: {
      fontSize: 18
    }
  // input: {
  //   marginTop: 8,
  //   marginBottom: 10,
  //   borderRadius: 10,
  //   fontSize: 16,
  //   lineHeight: 20,
  //   padding: 8,
  //   backgroundColor: 'rgba(151, 151, 151, 0.25)',
  // },
});
