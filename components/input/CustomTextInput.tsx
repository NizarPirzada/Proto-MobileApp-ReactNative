import React, { FC } from "react";
import { Text, TextInput, TextStyle, View } from "react-native";
import { styles } from "meecha/components/input/styles";

export const CustomTextInput: FC<
  React.ComponentPropsWithRef<typeof TextInput> & {
    // value?: string | undefined,
    // onChangeText?: Dispatch<string>,
    // maxLength?: number,
    inputAlign?: TextStyle["textAlign"];
    error?: string;
    key?: string;
    showLength?: boolean;
  }
> = (props) => {
  const {
    value,
    onChangeText,
    maxLength,
    inputAlign = "left",
    error,
    key,
    showLength = false,
    autoFocus = true,
    ...attrs
  } = props;
  let fontSize = 18;
  if (value?.length && value.length > 28) {
    fontSize = 15;
    if (value.length > 46) {
      fontSize = 12;
    }
  }
  return (
    <View style={styles.container} key={key}>
      <View
        style={[
          styles.inputContainer,
          {
            borderBottomWidth: 1,
            borderColor: "silver",
            // padding: 0,
            // alignSelf: 'center',
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            // paddingHorizontal: 4,
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          style={{
            textAlign: inputAlign,
            fontSize: fontSize,
            flex: 1,
            overflow: "visible",
          }}
          autoFocus={true}
          {...attrs}
        />
        {maxLength && showLength && (
          <Text style={{ fontSize: 11, color: "grey" }}>
            {value ? value.length : 0}/{maxLength}
          </Text>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
