/* eslint-disable quotes */
import styled from "styled-components/native";
import { Platform } from "react-native";
const DefaultProgressBar = styled.View`
  background-color: ${(props: any) =>
    (props.theme.rheostat && props.theme.rheostat.themeColor) ||
    "palevioletred"};
  /*position: absolute;*/
  height: ${Platform.OS === "android" ? 1 : 4}px;
  /*top: 0;*/
`;
DefaultProgressBar.defaultProps = {
  rheostat: {
    theme: {
      themeColor: "palevioletred",
    },
  },
};
export default DefaultProgressBar;
