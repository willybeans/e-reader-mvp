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
import { GifResult } from './GifSearch';

interface Props {
  searchTerm: string;
  searchResult: GifResult;
  onPress: (searchResult: SearchResultType) => void;
}

function GifSearchResult({ searchTerm, searchResult, onPress }: Props) {
  // const { theme } = useReader();

  // const regex = new RegExp(`(${searchTerm})`, 'gi');
  // const parts = searchResult.excerpt.split(regex);
  return (
    <TouchableOpacity
      key={searchResult.id}
      style={styles.container}
      // onPress={() => onPress(searchResult)}
    >
      <Image source={{ uri: searchResult.media_formats.gif.url }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  image: { width: 300, height: 300 },
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
});

export default GifSearchResult;
