import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  PanResponder,
  Animated,
  ViewStyle,
  Dimensions,
  RegisteredStyle,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { CardData } from '../App';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Props {
  data: CardData[];
  renderCard: (item: CardData) => JSX.Element;
  onSwipeLeft?: (item: CardData) => void;
  onSwipeRight?: (item: CardData) => void;
  renderNoMoreCards: () => React.ReactNode;
}
export default function Deck({
  renderCard,
  data,
  onSwipeLeft = () => null,
  onSwipeRight = () => null,
  renderNoMoreCards = () => React,
}: Props) {
  const position = useRef(new Animated.ValueXY()).current;
  const [itemIndex, setItemIndex] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  type Direction = 'right' | 'left';
  function forceSwipe(direction: Direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH - 25;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  }

  function onSwipeComplete(direction: Direction) {
    const item = data[itemIndex];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setItemIndex((prev) => prev + 1);
  }

  function resetPosition() {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  }

  function getCardStyle():
    | Animated.Value
    | Animated.AnimatedInterpolation
    | RegisteredStyle<ViewStyle>
    | Animated.WithAnimatedObject<ViewStyle>
    | Animated.WithAnimatedArray<ViewStyle> {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-60deg', '0deg', '60deg'],
    });
    return [position.getLayout(), { transform: [{ rotate }] }];
  }

  function renderCards() {
    if (itemIndex >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, index) => {
        if (index < itemIndex) return null;

        if (index === itemIndex) {
          return (
            <Animated.View
              style={[getCardStyle(), styles.card]}
              key={item.id}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.card, { top: 10 * (index - itemIndex) }]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  useEffect(() => {
    setItemIndex(0);
  }, [data]);

  return <View>{renderCards()}</View>;
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '100%',
  },
});
