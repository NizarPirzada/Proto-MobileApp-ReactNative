import Animated, { Extrapolate } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

const useAnimatedDims = ({
  height,
  ScrollY,
}: {
  height: number;
  ScrollY: any;
}) => {
  const diffClampScrollY = Animated.diffClamp(ScrollY, 0, height);
  const headerHeight = Animated.interpolateNode(diffClampScrollY, {
    inputRange: [0, height],
    outputRange: [height, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const headerTranslateY = Animated.interpolateNode(diffClampScrollY, {
    inputRange: [0, height],
    outputRange: [0, -height],
    extrapolate: Extrapolate.CLAMP,
  });
  const headerOpacity = Animated.interpolateNode(diffClampScrollY, {
    inputRange: [0, height],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return { headerOpacity, headerTranslateY, headerHeight };
};
const useKeyboard = (): [number, boolean] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardShown, setkeyboardShown] = useState(false);
  const onKeyboardDidShow = ({
    endCoordinates: { height },
  }: KeyboardEvent): void => {
    setKeyboardHeight(height);
  };
  const onKeyboardDidHide = (): void => {
    setKeyboardHeight(0);
    //setkeyboardShown(false);
  };
  const onkeyboardWillShown = (): void => {
    setkeyboardShown(true);
  };
  const onkeyboardWillHide = (): void => {
    setkeyboardShown(false);
  };

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      "keyboardWillShow",
      onkeyboardWillShown
    );
    const keyboardWillHide = Keyboard.addListener(
      "keyboardWillHide",
      onkeyboardWillHide
    );

    const keyboardDidShow = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const keyboardDidHide = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );
    return (): void => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return [keyboardHeight, keyboardShown];
};
export { useAnimatedDims, useKeyboard };
