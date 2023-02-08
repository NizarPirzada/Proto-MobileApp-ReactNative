/* eslint-disable quotes */
/**
 * Meecha App
 *
 * @format
 */

import React from "react";
import "react-native-gesture-handler";
import { StatusBar, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Provider } from "react-redux";
import Main from "./navigator";
import { store } from "./store/store";

// In order to parse/stringify int64 attributes in JSON objects
//  const JSONBigInt = require('json-bigint')

//  JSON.parse = JSONBigInt.parse
//  JSON.stringify = JSONBigInt.stringify

const App = () => {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Main />
        </View>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
