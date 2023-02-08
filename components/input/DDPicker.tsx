import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

type Item = {
  label: string;
  value: string;
};
const DropDownInputPicker = ({
  placeHolder = "",
  data = [],
  defaultSelected = "",
  onChangeValue = () => {},
}: {
  onChangeValue?: Function;
  placeHolder?: string;
  data?: Array<Item>;
  defaultSelected?: string | number;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    defaultSelected != undefined ? defaultSelected : null
  );
  return (
    <DropDownPicker
      listItemContainerStyle={{
        height: 25,
        backgroundColor: "#fff",
        zIndex: 4,
      }}
      placeholderStyle={{
        color: "#AEAEAE",
        fontWeight: "bold",
      }}
      listMode="MODAL"
      style={{ zIndex: 5, height: 32 ,borderRadius:0}}
      placeholder={placeHolder}
      dropDownDirection="BOTTOM"
      labelStyle={{}}
      maxHeight={60}
      open={open}
      value={value}
      items={data}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={(e) => onChangeValue(e)}
      zIndex={100}
    />
  );
};

export default DropDownInputPicker;
