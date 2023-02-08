import React, { Dispatch, FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { styles } from "meecha/components/input/styles";

const localStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    height: 40,
    borderWidth: 1,
    borderColor: "silver",
    margin: 5,
    padding: 10,
    textAlign: "center",
  },
});

interface DateInputArgs {
  day: string | undefined;
  setDay: Dispatch<string | undefined>;
  month: string | undefined;
  setMonth: Dispatch<string | undefined>;
  year: string | undefined;
  setYear: Dispatch<string | undefined>;
  error?: string;
}

export const DateInput: FC<DateInputArgs> = (props) => {
  const { day, setDay, year, setYear, month, setMonth } = props;
  const { error } = props;

  let monthInput: TextInput | null;
  let dayInput: TextInput | null;
  let yearInput: TextInput | null;

  function setMonthInput(input: TextInput) {
    monthInput = input;
  }

  function onMonthChange(value: string) {
    setMonth(value);
    if (dayInput && value.length === 2) {
      dayInput.focus();
    }
  }

  function setDayInput(input: TextInput) {
    dayInput = input;
  }

  function onDayChange(value: string) {
    setDay(value);
    if (yearInput && value.length === 2) {
      yearInput.focus();
    }
  }

  function setYearInput(input: TextInput) {
    yearInput = input;
  }

  function onYearChange(value: string) {
    setYear(value);
    // if (yearInput && value.length === 4) {
    //   yearInput.blur()
    // }
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
        <TextInput
          style={localStyles.input}
          maxLength={2}
          keyboardType="number-pad"
          placeholder="MM"
          value={month}
          onChangeText={onMonthChange}
          selectTextOnFocus={true}
          autoFocus={true}
          ref={setMonthInput}
        />
        <TextInput
          style={localStyles.input}
          maxLength={2}
          keyboardType="number-pad"
          placeholder="DD"
          value={day}
          onChangeText={onDayChange}
          selectTextOnFocus={true}
          ref={setDayInput}
        />
        <TextInput
          style={localStyles.input}
          maxLength={4}
          keyboardType="number-pad"
          placeholder="YYYY"
          value={year}
          onChangeText={onYearChange}
          selectTextOnFocus={true}
          ref={setYearInput}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
