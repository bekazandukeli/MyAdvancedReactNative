import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Deck from './src/Deck';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    image: require('./src/assets/images/1.jpg'),
  },
  {
    id: 2,
    text: 'Card #2',
    image: require('./src/assets/images/2.jpg'),
  },
  {
    id: 3,
    text: 'Card #3',
    image: require('./src/assets/images/3.jpg'),
  },
  {
    id: 4,
    text: 'Card #4',
    image: require('./src/assets/images/4.jpg'),
  },
  {
    id: 5,
    text: 'Card #5',
    image: require('./src/assets/images/5.jpg'),
  },
  {
    id: 6,
    text: 'Card #6',
    image: require('./src/assets/images/6.jpg'),
  },
  {
    id: 7,
    text: 'Card #7',
    image: require('./src/assets/images/7.jpg'),
  },
  {
    id: 8,
    text: 'Card #8',
    image: require('./src/assets/images/8.jpg'),
  },
];

export interface CardData {
  id: number;
  text: string;
  image: ImageSourcePropType;
}
export default function App() {
  function renderCard(item: CardData) {
    return (
      <Card key={item.id}>
        <Card.Title>{item.text}</Card.Title>
        <Card.Image source={item.image} />

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

  function renderNoMoreCards() {
    return (
      <Card>
        <Card.Title>All Done!</Card.Title>
        <Text style={{ marginBottom: 10 }}>There is no more content here!</Text>
        <Button title="Get More" buttonStyle={{ backgroundColor: '#03A9F4' }} />
      </Card>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Deck
          data={DATA}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
