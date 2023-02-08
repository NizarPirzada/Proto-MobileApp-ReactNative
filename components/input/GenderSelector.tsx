import React, { Dispatch, FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "meecha/components/input/styles";

const localStyles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "silver",
    height: 70,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "rgba(215,215,215,0.5)",
  },
  input: {
    fontSize: 12,
    marginTop: 6,
  },
});

// https://reactnative.dev/docs/touchableopacity
export const GenderSelector: FC<{
  value?: string | undefined;
  setValue?: Dispatch<string | undefined>;
}> = (props) => {
  const { value, setValue } = props;

  function selected(key: string) {
    return key === value ? localStyles.selected : null;
  }

  function select(key: string) {
    if (!setValue) return;
    if (key === value) setValue(undefined);
    else setValue(key);
  }
  const size = 24;
  return (
    <View
      style={[
        styles.inputContainer,
        styles.container,
        {
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      ]}
    >
      <TouchableOpacity
        style={[localStyles.button, selected("M")]}
        onPress={() => select("M")}
      >
        <Icon name="male-sharp" size={size} color="blue" />
        <Text style={localStyles.input}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[localStyles.button, selected("F")]}
        onPress={() => select("F")}
      >
        <Icon name="female-sharp" size={size} color="red" />
        <Text style={localStyles.input}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[localStyles.button, selected("O")]}
        onPress={() => select("O")}
      >
        <Icon name="male-female-sharp" size={size} color="grey" />
        <Text style={localStyles.input}>Other</Text>
      </TouchableOpacity>
    </View>
  );
};
