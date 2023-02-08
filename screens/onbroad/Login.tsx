import React, { createRef, useEffect, useState } from "react";
import {
  SingleInputPage,
  SingleInputPageProps,
} from "meecha/components/pages/SingleInputPage";
import { PhoneNumberInput } from "meecha/components/input/PhoneNumberInput";
import { CodeInput } from "meecha/components/input/CodeInput";
import PhoneInput from "react-native-phone-number-input";
import { useDispatch } from "react-redux";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuthLoginMutation } from "meecha/generated/api.generated";
import { login } from "meecha/store/auth";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Testing: https://firebase.google.com/docs/auth/web/phone-auth#test-with-whitelisted-phone-numbers
// Seems like we cannot use real phone# for testing
const LoginPage: React.FC = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [phoneNum, setPhoneNum] = useState<string | undefined>("6083931271");
  const [code, setCode] = useState<string[]>(Array<string>(6));
  const [pos, setPos] = useState(0);
  const [error, setError] = useState<string>();
  // const [idToken, setIdToken] = useState<string>()
  const phoneInputRef = createRef<PhoneInput>();
  // Firebase related states
  // const [firebaseDone, setFirebaseDone] = useState(false)
  const [confirm, setConfirm] = useState<any>(null);
  // https://redux-toolkit.js.org/rtk-query/usage/mutations
  const [authLogin] = useAuthLoginMutation();
  const dispatch = useDispatch();

  const resetAuthState = () => {
    setCode(Array<string>(6));
    setConfirm(null);
    setPhoneNum(undefined);
    setError(undefined);
  };

  const firebaseSignOut = async () => {
    resetAuthState();
    await auth().signOut();
  };

  const appLogin = async (idToken: string) => {
    const authPkg = await authLogin({
      body: { firebaseToken: idToken },
    }).unwrap();
    console.log("auth package", authPkg);
    setPos(pos + 1);
    await firebaseSignOut();
    dispatch(login(authPkg));
  };

  // Handle user state changes
  async function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    // if (!firebaseDone) setFirebaseDone(true)
    // if (!user) return
    // try {
    //   const token = await user.getIdToken()
    //   console.log('id token', token)
    //   setIdToken(token)
    //   await appLogin(token)
    // } catch (e) {
    //   console.log('error encountered', e)
    //   // firebaseSignOut()
    //   setError('Server error - please try again later')
    // }
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation is:", confirmation);
    setConfirm(confirmation);
  }

  function baseOnSubmitSuccess() {
    setError(undefined);
  }

  useEffect(() => {
    // For testing only - disable any reCAPTCHA challenge
    // auth().settings.appVerificationDisabledForTesting = true
    // unsubscribe on unmount
    // return auth().onAuthStateChanged(onAuthStateChanged)
  }, []);

  async function submitPhoneNum() {
    // Validate phoneNum
    if (!phoneNum) {
      setError("Phone number is missing");
      return;
    }
    if (!phoneInputRef.current) {
      setError("Unexpected error occurred");
      return;
    }
    if (!phoneInputRef.current.isValidNumber(phoneNum)) {
      setError("Phone number is not valid");
      return;
    }
    const countryCode = phoneInputRef.current.getCallingCode();
    const phoneNumWithCode = countryCode
      ? `+${countryCode}${phoneNum}`
      : phoneNum;
    console.log("phone number collected", phoneNumWithCode);
    setPos(pos + 1);
    baseOnSubmitSuccess();
    // Send verification code
    await signInWithPhoneNumber(phoneNumWithCode);
  }

  async function confirmCode(code: string) {
    try {
      if (!confirm) {
        setError("Server error - please try again later");
        await submitPhoneNum();
        return;
      }
      const userCred = await confirm.confirm(code);
      try {
        const token = await userCred.user.getIdToken();
        console.log("obtained id token", token);
        await appLogin(token);
      } catch (e) {
        setError("Server error - please try again later");
      }
    } catch (e) {
      console.log("invalid code", code, e);
      setError("Verification code is not valid");
      // TODO: After 3 tries, prompt the user to re-enter phone number
    }
  }

  async function onCodeSubmit() {
    // Verify code & obtain Firebase token
    if (!code) {
      setError("Please enter the verification code");
      return;
    }
    const vCode = code.join("");
    if (vCode.length !== code.length) {
      setError("Please enter the verification code");
      return;
    }
    console.log("verification code collected", vCode);
    await confirmCode(vCode);
  }

  const items: Array<() => SingleInputPageProps> = [
    () => {
      return {
        title: "Enter your phone number",
        disabled: !phoneNum,
        inputComp: (
          <PhoneNumberInput
            value={phoneNum}
            setValue={setPhoneNum}
            error={error}
            phoneInputRef={phoneInputRef}
          />
        ),
        onSubmit: submitPhoneNum,
      };
    },
    () => {
      return {
        title: "Enter verification code",
        inputComp: (
          <CodeInput
            code={code}
            setCode={setCode}
            error={error}
            // eslint-disable-next-line react/jsx-no-bind
            onSubmitEditing={onCodeSubmit}
          />
        ),
        note: "A verification code has been sent to your phone.",
        onSubmit: onCodeSubmit,
      };
    },
  ];

  if (pos === items.length) {
    return (
      <View style={{ paddingTop: top }}>
        <Text>Logging you in</Text>
      </View>
    );
  }

  const item = items[pos];
  return (
    <View style={{ flex: 1, paddingBottom: bottom, paddingTop: top }}>
      <SingleInputPage {...item()} />
    </View>
  );
};
export default LoginPage;
