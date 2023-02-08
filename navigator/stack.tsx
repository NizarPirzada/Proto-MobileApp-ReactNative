/* eslint-disable spaced-comment */
/* eslint-disable quotes */
import React, { useEffect } from "react";
import {
  TransitionPresets,
  TransitionSpecs,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Splash from "react-native-splash-screen";
import { RootState } from "meecha/store/store";
//-----------Screens------------
import DiscoverScreen from "meecha/screens/Discover";
import LoginScreen from "meecha/screens/onbroad/Login";
import SelectProfileScreen from "meecha/screens/onbroad/SelectProfile";
import RegisterScreen from "meecha/screens/onbroad/Signup";
import { Text, LogBox } from "react-native";
import Selection from "meecha/screens/Selection";

LogBox.ignoreAllLogs();

//-----------
const { Screen, Navigator } = createStackNavigator();

const StackNav = () => {
  const { authPackage, firstLogin, langCode } = useSelector(
    ({ auth }: RootState) => auth
  );
  useEffect(() => {
    Splash.hide();
  }, []);
  console.log("auth state", authPackage, firstLogin, langCode);
  return (
    <Navigator
      initialRouteName="discover"
      screenOptions={{ headerMode: "screen" }}
    >
      {authPackage === undefined ? (
        <>
          <Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name="selectProfile"
            component={SelectProfileScreen}
            options={{ headerShown: false }}
          />
          <Screen
            name="register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Screen
            name="discover"
            component={DiscoverScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
      <Screen
        name="Selection"
        component={Selection}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </Navigator>
  );
};

export default StackNav;
