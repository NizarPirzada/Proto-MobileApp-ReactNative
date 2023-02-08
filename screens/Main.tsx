import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "meecha/store/store";
import { Text } from "react-native";
// import LoginPage from "meecha/containers/onbroad/Login";
// import SignupPage from "meecha/containers/onbroad/Signup";
// import SelectProfilePage from "meecha/containers/onbroad/SelectProfile";
import DiscoverPage from "meecha/containers/Discover";

export const Main = () => {
  const { authPackage, firstLogin, langCode } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("auth state", authPackage, firstLogin, langCode);
  // Not logged in => Login page
  // if (!authPackage) {
  //   return <LoginPage />;
  // } else if (authPackage.disabled) {
  //   // Banned
  //   return <Text>You have been banned</Text>;
  // } else if (!authPackage.user || firstLogin) {
  //   // No user is associated with this account yet, or signup has not completed
  //   return <SignupPage />;
  // } else {
  //   if (!langCode) {
  //     return <SelectProfilePage />;
  //   } else {
  //     return <Text>Home page {langCode}</Text>;
  //   }
  // }
  return <DiscoverPage />;
};

// import { CustomTextInput } from 'meecha/components/input/CustomTextInput'
// import React, { useState } from 'react'
// import { Button, Text, View } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import { GenderSelector } from 'meecha/components/input/GenderSelector'
// import { DateInput } from 'meecha/components/input/DateInput'
// import { CodeInput } from 'meecha/components/input/CodeInput'
// import { PhoneNumberInput } from 'meecha/components/input/PhoneNumberInput'
//
// export const Main = () => {
//   const [state, setState] = useState<string>()
//   const [day, setDay] = useState<string>()
//   const [month, setMonth] = useState<string>()
//   const [year, setYear] = useState<string>()
//   // const [gender, setGender] = useState<Gender>()
//   const [pos, setPos] = useState(0)
//   const codeLength = 6
//   const [code, setCode] = useState(Array<string>(codeLength))
//   let optional = true
//
//   const questions = [
//     'Create a user handle',
//     'Select your gender',
//     'Tell people about you',
//     'Enter your birthday',
//     'Enter verification code',
//     'Enter your phone number',
//   ]
//
//   function next() {
//     setPos((pos + 1) % questions.length)
//     setState(undefined)
//   }
//
//   function nextIfNotEmpty() {
//     if (state) next()
//   }
//
//   let inputComp
//   if (pos === 0) {
//     optional = false
//     inputComp = (
//       <CustomTextInput value={state} onChangeText={setState} maxLength={20}
//                        error='This is an error' showLength={true} inputAlign='left'
//                        onSubmitEditing={nextIfNotEmpty} />
//     )
//   } else if (pos === 1) {
//     optional = true
//     inputComp = (
//       <GenderSelector value={state} setValue={setState} />
//     )
//   } else if (pos === 2) {
//     optional = true
//     inputComp = (
//       <CustomTextInput value={state} onChangeText={setState} maxLength={64}
//                        showLength={true} inputAlign='left'
//                        onSubmitEditing={nextIfNotEmpty} />
//     )
//   } else if (pos === 3) {
//     optional = true
//     inputComp = (<DateInput day={day} setDay={setDay} month={month}
//                             setMonth={setMonth} year={year} setYear={setYear}
//                             error='This is an error' />)
//   } else if (pos === 4) {
//     optional = true
//     inputComp = (<CodeInput code={code} setCode={setCode} codeLength={codeLength}
//                             error='This is an error' />)
//   } else if (pos === 5) {
//     optional = false
//     inputComp = (<PhoneNumberInput value={state} setValue={setState}
//                                    defaultCode='GB' error='This is an error' />)
//   }
//
//   let nextTitle = 'Next'
//   if (optional && (!state || state.length === 0)) {
//     nextTitle = 'Skip'
//   }
//
//   return (
//     <View>
//       <Text style={{
//         margin: 10,
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#383838',
//         height: 100, // Enough for a three-line question
//         textAlignVertical: 'bottom',
//         // textShadowColor: '#3838387F',
//         // textShadowOffset: { width: 1, height: 2 },
//         // textShadowRadius: 3,
//       }}>{questions[pos]}
//       </Text>
//       {inputComp}
//       <View style={{
//         margin: 10,
//         justifyContent: 'flex-start',
//         alignItems: 'flex-end',
//         flexDirection: 'row',
//         height: 70,
//       }}>
//         <Icon style={{
//           marginRight: 5,
//         }} name='rocket' />
//         <Text style={{
//           fontSize: 12,
//           color: 'grey',
//           flex: 1,
//         }}>
//           This is some useless note
//         </Text>
//       </View>
//       <Button title={nextTitle} onPress={next}
//               disabled={!optional && (!state || state.length === 0)} />
//     </View>
//   )
// }
