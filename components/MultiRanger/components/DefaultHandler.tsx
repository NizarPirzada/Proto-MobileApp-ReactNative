/* eslint-disable quotes */
import React from "react";
import styled from "styled-components/native";
import { TouchableHighlight } from "react-native";

const RoundedButtonText = styled.Text.attrs((props: any) => ({
  selected: props.selected || false,
}))`
  color: ${(props: any) =>
    props.selected
      ? "white"
      : (props.theme.rheostat && props.theme.rheostat.themeColor) ||
        "palevioletred"};
  font-size: 12px;
  font-weight: 700;
`;

RoundedButtonText.defaultProps = {
  theme: {
    rheostat: {
      themeColor: "palevioletred",
      grey: "#d8d8d8",
    },
  },
};

const RoundedButton = ({ style, selected, children, ...props }: any) => (
  <TouchableHighlight style={style} underlayColor="rgba(245,219,227,0.8)">
    <RoundedButtonText selected={selected} {...props}>
      {children}
    </RoundedButtonText>
  </TouchableHighlight>
);

const DefaultHandler = styled(RoundedButton).attrs((props: any) => ({
  selected: props.selected || false,
}))`
  background-color: ${(props: any) =>
    props.selected
      ? (props.theme.rheostat && props.theme.rheostat.themeColor) ||
        "palevioletred"
      : "transparent"};
  padding: 0;
  height: 35px;
  width: 35px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  border: ${(props: any) =>
      (props.theme.rheostat && props.theme.rheostat.themeColor) || "#111"}
    solid 2px;
`;

DefaultHandler.defaultProps = {
  theme: {
    rheostat: {
      themeColor: "#111",
      grey: "#d8d8d8",
    },
  },
};

export default DefaultHandler;
