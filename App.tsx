import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://picsum.photos/200/300',
  },
];

export interface CardData {
  id: number;
  text: string;
  uri: string;
}
export default function App() {
  function renderCard(item: CardData) {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={{ uri: item.uri }} />
        <Text style={{ marginBottom: 10 }}>I can customize card further</Text>
        <Button
          title="View Now"
          icon={
            <Icon
              name="code"
              size={15}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          buttonStyle={{ backgroundColor: '#03A9F4' }}
        />
      </Card>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Deck data={DATA} renderCard={renderCard} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
