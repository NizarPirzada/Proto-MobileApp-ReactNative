import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useAuthLoginMutation } from 'meecha/generated/api.generated'
import { login, logout } from 'meecha/store/auth'
import { useDispatch } from 'react-redux'

// https://rnfirebase.io/auth/usage
// https://rnfirebase.io/auth/phone-auth

// TODO: https://rnfirebase.io/auth/usage/installation/android
// Don't forget to run `cd ios/ && pod install`
const Auth = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<any>({})
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null)
  const [code, setCode] = useState('000000')
  // https://redux-toolkit.js.org/rtk-query/usage/mutations
  const [authLogin] = useAuthLoginMutation()
  const dispatch = useDispatch()

  function resetAuthState() {
    setConfirm(null)
    setCode('')
    setUser(null)
  }

  function firebaseSignOut() {
    auth().signOut().then(resetAuthState)
    dispatch(logout())
  }

  // Handle user state changes
  async function onAuthStateChanged(userIn: FirebaseAuthTypes.User | null) {
    setUser(userIn)
    if (initializing) setInitializing(false)

    if (!userIn) return

    console.log('logged in', userIn)

    try {
      const idToken = await userIn.getIdToken()
      console.log('id token', idToken)
      const authPkg = await authLogin({ body: { firebaseToken: idToken } }).unwrap()
      console.log('auth package', authPkg)
      // Login(authPkg)
      dispatch(login(authPkg))
    } catch (e) {
      console.log('error encountered', e)
      firebaseSignOut()
    }
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber)
    setConfirm(confirmation)
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code)
    } catch (error) {
      console.log('Invalid code.')
    }
  }

  useEffect(() => {
    // unsubscribe on unmount
    return auth().onAuthStateChanged(onAuthStateChanged)
  }, [])


  if (initializing) return null

  if (!user) {
    if (!confirm) {
      return (
        <Button
          title='Phone Number Sign In'
          onPress={() => signInWithPhoneNumber(
            '+1 608-393-1271')}
        />
      )
    }
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title='Confirm Code' onPress={() => confirmCode()} />
      </>
    )
  }

  return (
    <View>
      <Text>Logging you in ...</Text>
      <Button title='Log out' onPress={firebaseSignOut} />
    </View>
  )
}

export default Auth
