import React from "react";
import { ThemeProvider } from "styled-components/native";

export const defaultTheme = {
  themeColor: "palevioletred",
  grey: "#d8d8d8",
};

const RheostatThemeProvider = ({ theme, children }:any) => {
  const rheostatTheme = {
    rheostat: Object.assign({}, defaultTheme, theme),
    // Namespace the theme for the user
  };
  return <ThemeProvider theme={rheostatTheme}>{children}</ThemeProvider>;
};

export default RheostatThemeProvider;
