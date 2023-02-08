/* eslint-disable quotes */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import StackNav from "./stack";

const MainNavCOnt = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MenuProvider>
          <StackNav />
        </MenuProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export default MainNavCOnt;
