import React, { ReactNode } from 'react';
import { View, Animated } from 'react-native';
import { RenderCardProps } from '../App';

interface CardData {
  id: number;
  text: string;
  uri: string;
}
interface Props {
  data: CardData[];
  renderCard: (item: RenderCardProps) => JSX.Element;
}
export default function Deck({ renderCard, data }: Props) {
  function renderCards() {
    return data.map((item) => renderCard(item));
  }
  return <View>{renderCards()}</View>;
}
