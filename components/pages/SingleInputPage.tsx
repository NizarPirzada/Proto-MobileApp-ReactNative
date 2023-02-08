import React from "react";
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  View,
} from "react-native";
import { Button } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton } from "meecha/components/input/CustomButton";

export interface SingleInputPageProps {
  title: string;
  inputComp: Element;
  onSubmit: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  disabled?: boolean;
  skip?: boolean;
  note?: string;
}

const SingleInputPage: React.FC<SingleInputPageProps> = (props) => {
  const {
    title,
    inputComp,
    onSubmit,
    note,
    skip = false,
    disabled = false,
  } = props;

  let buttonText = "next";
  if (skip) {
    buttonText = "skip";
  }
  return (
    <View>
      <Text
        style={{
          margin: 10,
          fontSize: 24,
          fontWeight: "bold",
          color: "#383838",
          height: 100, // Enough for a three-line question
          textAlignVertical: "bottom",
          // textShadowColor: '#3838387F',
          // textShadowOffset: { width: 1, height: 2 },
          // textShadowRadius: 3,
        }}
      >
        {title}
      </Text>
      {inputComp}
      <View
        style={{
          margin: 10,
          justifyContent: "flex-start",
          alignItems: "flex-end",
          flexDirection: "row",
          height: 70,
        }}
      >
        {note && (
          <Icon
            style={{
              marginRight: 5,
            }}
            name="rocket"
          />
        )}
        {note && (
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              flex: 1,
            }}
          >
            {note}
          </Text>
        )}
      </View>
      <CustomButton
        title={buttonText}
        onPress={onSubmit}
        disabled={disabled}
        buttonStyle={
          skip && {
            backgroundColor: "rgba(144,144,161,0.3)",
          }
        }
      />
    </View>
  );
};

export { SingleInputPage };
