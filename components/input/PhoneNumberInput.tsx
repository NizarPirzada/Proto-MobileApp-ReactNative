import React, { Dispatch, RefObject, useState } from "react";
import { Text, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { styles } from "meecha/components/input/styles";
import { AsYouTypeFormatter } from "google-libphonenumber";

interface Props {
  value: string | undefined;
  setValue: Dispatch<string | undefined>;
  error?: string;
  phoneInputRef?: RefObject<PhoneInput>;
}

export const PhoneNumberInput: React.FC<
  React.ComponentPropsWithRef<typeof PhoneInput> & Props
> = (props) => {
  const { value, setValue, error, phoneInputRef, ...phoneInputProps } = props;
  // https://github.com/garganurag893/react-native-phone-number-input
  // Check out the example for validation
  const defaultCountry = "US";
  const [formatter, setFormatter] = useState(
    new AsYouTypeFormatter(defaultCountry)
  );

  function formatValue(formatter: AsYouTypeFormatter, phoneNum?: string) {
    if (!phoneNum) {
      return "";
    }
    let out: string = "";
    formatter.clear();
    phoneNum.split("").forEach((c) => {
      out = formatter.inputDigit(c);
    });
    return out;
  }

  function setFormatted(formatter?: AsYouTypeFormatter, phoneNum?: string) {
    if (formatter) {
      const newFormatted = formatValue(formatter, phoneNum);
      phoneInputRef?.current?.setState({
        number: newFormatted,
      });
    }
  }

  return (
    <View style={styles.container}>
      <PhoneInput
        containerStyle={[
          styles.inputContainer,
          { marginHorizontal: 5, height: 50 },
        ]}
        textContainerStyle={{ paddingVertical: 0, height: "100%" }}
        textInputStyle={[styles.input, {}]}
        defaultValue={formatValue(formatter, value)}
        defaultCode={defaultCountry}
        // value={formatted}
        onChangeCountry={(code) => {
          // const phoneUtil = PhoneNumberUtil.getInstance()
          const formatter = new AsYouTypeFormatter(code.cca2);
          setFormatter(formatter);
          setFormatted(formatter, value);
        }}
        layout="first"
        onChangeText={(text) => {
          const phoneNum = (text.match(/\d/g) ?? []).join("");
          setValue(phoneNum);
          setFormatted(formatter, phoneNum);
        }}
        ref={phoneInputRef}
        autoFocus
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
