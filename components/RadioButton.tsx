import React from "react";
import { View ,TouchableOpacity } from "react-native";
import { widthPercentageToDP as w2DP } from "react-native-responsive-screen";
const RadioButton = ({
  active = false,
  onPress = () => {},
  activeColor = "#ccc",
}: {
  activeColor?: string;
  onPress?: Function;
  active?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: w2DP(6),
        height: w2DP(6),
        borderRadius: w2DP(3),
        alignItems: "center",
        borderWidth: w2DP(0.2),
        borderColor: active ? activeColor || "green" : "#ccc",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: w2DP(4),
          height: w2DP(4),
          borderRadius: w2DP(2),
          backgroundColor: active ? activeColor || "green" : "#00000000",
        }}
      />
    </TouchableOpacity>
  );
};

export default RadioButton;
