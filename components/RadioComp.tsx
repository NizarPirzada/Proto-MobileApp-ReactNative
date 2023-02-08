import React from "react";
import { widthPercentageToDP as W2DP } from "react-native-responsive-screen";
import { View, Text } from "react-native";
import RadioButton from "./RadioButton";

type option = { id: any; name: string };
const RadioComponent = ({
  title = "",
  options = [],
  setterKey = "",
  setter = () => {},
  currentOption = "",
}: {
  title?: string;
  setterKey?: string;
  options?: Array<option>;
  setter?: Function;
  currentOption?: any;
}) => {
  return (
    <View style={{ marginVertical: 8, width: W2DP(96) }}>
      {title !== "" && (
        <Text
          style={{
            fontWeight: "500",
            fontSize: 17,
            marginVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          {title}
        </Text>
      )}
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          paddingHorizontal: W2DP(2),
        }}
      >
        {options.map((item, index) => {
          return (
            <View
              row
              style={{
                marginHorizontal: W2DP(3),
                width: "43%",
                flexDirection: "row",
                marginBottom: W2DP(2),
              }}
              key={"radio" + index}
            >
              <RadioButton
                onPress={() => {
                  setter({ input: item.id, setAsKey: setterKey });
                }}
                activeColor={"#2D95FF"}
                active={currentOption === item.id}
              />
              <Text style={{ margin: W2DP(2) }}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};
export default RadioComponent;
