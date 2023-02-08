import React from "react";
import { StyleProp, Text, TouchableOpacity } from "react-native";

export const CustomButton: React.FC<
  React.ComponentPropsWithRef<typeof TouchableOpacity> & {
    title: string;
    disabled?: boolean;
    buttonStyle?: StyleProp<any>;
  }
> = (props) => {
  const { title, onPress, disabled, buttonStyle = null, ...attrs } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: disabled
            ? "rgba(144,144,161,0.2)"
            : "rgba(144,144,161,0.7)",
          height: 32,
        },
        buttonStyle,
      ]}
      disabled={disabled}
      {...attrs}
    >
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "normal",
          fontSize: 14,
          color: disabled ? "grey" : "black",
        }}
      >
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};
