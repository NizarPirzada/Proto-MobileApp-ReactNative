import React, { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const DropDownInputPicker = (props) => {
  const { placeholder, data, onSelect, direction, ...rest } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    data && data.length > 0
      ? data
      : [
          // { label: "Credential 1", value: "c1" },
          // { label: "Credential 2", value: "c2" },
          // { label: "Credential 3", value: "c3" },
        ]
  );

  const onChangeValue = (val: any) => {
    onSelect(val);
  };

  return (
    <View>
      <DropDownPicker
        listItemContainerStyle={{
          height: 20,
          borderTopLeftRadius: 0,
        }}
        listParentContainerStyle={
          {
            // backgroundColor: "red",
          }
        }
        style={{ borderRadius: 0, height: 25 }}
        placeholder={placeholder}
        dropDownDirection={direction || "TOP"}
        labelStyle={{}}
        maxHeight={58}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={onChangeValue}
        zIndex={100}
        {...rest}
      />
    </View>
  );
};

export default DropDownInputPicker;
