/* eslint-disable react/static-property-placement */
/* eslint-disable quotes */
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Animated,
  UIManager,
  Dimensions,
  PanResponder,
  LayoutAnimation,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
type swipeType = {
  onSwipeRight?: Function;
  onSwipeLeft?: Function;
  renderCard: Function;
  renderNoMoreCards: Function;
  keyProp?: string;
  data: Array<any>;
};
const Swipe = ({
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  keyProp = "id",
  data = [],
  renderCard = () => null,
  renderNoMoreCards = () => null,
}: swipeType) => {
  const [index, setIndex] = useState<number>(0);
  const [thisData, setThisData] = useState<Array<any>>([]);

  const position = useRef(new Animated.ValueXY()).current;

  const _panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:

      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const onSwipeComplete = (direction: string) => {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
    setIndex(index + 1);
  };

  const forceSwipe = (direction: string) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const RenderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    const deck = data.map((item, i) => {
      if (i < index) {
        return null;
      }

      if (i === index) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[getCardStyle(), styles.cardStyle, { zIndex: 99 }]}
            {..._panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      // const test = 20 * (i - this.state.index);
      // console.log('test', test)

      return (
        <View key={item[keyProp]} style={[styles.cardStyle]}>
          {renderCard(item)}
        </View>
      );
    });

    return deck;
  };

  useEffect(() => {
    if (data !== thisData) {
      setIndex(0);
      setThisData(data);
    }
  }, [data]);

  return (
    <View>
      <RenderCards />
    </View>
  );
};

const styles = {
  detailWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  cardStyle: {
    width: SCREEN_WIDTH,
  },
};

export default Swipe;
