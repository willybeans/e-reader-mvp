/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  SearchResult as SearchResultType,
  useReader,
} from '@epubjs-react-native/core';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { contrast } from '../utils';
import { TranslationResponse } from './TranslationTypes';

interface Props {
  searchTerm: string;
  translationResult: TranslationResponse;
  onPress: (searchResult: SearchResultType) => void;
}

function TranslationResult({ searchTerm, translationResult, onPress }: Props) {
  // const { theme } = useReader();

  // const regex = new RegExp(`(${searchTerm})`, 'gi');
  // const parts = searchResult.excerpt.split(regex);
  return (
    <TouchableOpacity
      // key={translationResult.id}
      style={styles.container}
      // onPress={() => onPress(searchResult)}
    >

    <View style={styles.row}>
     <Text>{translationResult?.detectedLanguage?.language}</Text>
     
    </View>
    <View style={styles.break}/>
     <View>
     <Text>Translated Text:</Text>
     <Text>{translationResult?.translatedText}</Text>

      </View>
      <View style={styles.break}/>
     <View>
     <Text>Alternatives</Text>
      {translationResult?.alternatives?.map((item, index) => {
        return (<Text key={`alt-${index}`}>{item}</Text>)
      })}
      </View>


      {/* <Image source={{ uri: searchResult.urls.raw }} style={styles.image} /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 10,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    width: '85%',
  },
  chapter: { marginBottom: 2 },
  excerpt: { fontStyle: 'italic' },
  highlight: { backgroundColor: 'yellow' },
  row: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  break: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }
});

export default TranslationResult;
