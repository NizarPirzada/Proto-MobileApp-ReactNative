import React, { Dispatch } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { styles } from "meecha/components/input/styles";

const localStyles = StyleSheet.create({
  inputContainer: {
    margin: 5,
    borderWidth: 1,
    borderColor: "silver",
    padding: 10,
    textAlign: "center",
  },
});

interface CodeInputProps {
  code: string[];
  setCode: Dispatch<string[]>;
  error?: string;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

export const CodeInput: React.FC<CodeInputProps> = (props) => {
  const { code, setCode, error, onSubmitEditing } = props;
  const clone = code;
  const codeInputBoxes: Element[] = [];
  const codeLength = code.length;
  const codeInputBoxRefs = Array<TextInput | null>(codeLength);

  for (let i = 0; i < codeLength; i++) {
    const onCodeChange = (value: string) => {
      clone[i] = value;
      setCode(clone);
    };
    const onSelectionChange = (start: number, end: number) => {
      if (start === end && end === 1) {
        const j = i + 1;
        if (j < codeLength) {
          if (codeInputBoxRefs[j]) {
            codeInputBoxRefs[j]?.focus();
          }
          // } else if (codeInputBoxRefs[i]) {
          //   codeInputBoxRefs[i]?.blur()
        }
      }
    };
    const key = `key-${i}`;
    // TODO: On key press - ENTER
    const input = (
      <TextInput
        style={localStyles.inputContainer}
        maxLength={1}
        keyboardType="number-pad"
        selectTextOnFocus={true}
        key={key}
        onChangeText={onCodeChange}
        onSelectionChange={({ nativeEvent }) => {
          const { start, end } = nativeEvent.selection;
          onSelectionChange(start, end);
        }}
        onSubmitEditing={onSubmitEditing}
        autoFocus={i === 0}
        ref={(input) => {
          codeInputBoxRefs[i] = input;
        }}
      />
    );
    codeInputBoxes.push(input);
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {codeInputBoxes.map((inputBox) => inputBox)}
      </View>
      {error && (
        <Text style={{ color: "red", fontSize: 12, padding: 2 }}>{error}</Text>
      )}
    </View>
  );
};
