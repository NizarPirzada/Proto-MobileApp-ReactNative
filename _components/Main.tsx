import React from 'react'
import { useSelector } from 'react-redux'
import { Text, View } from 'react-native'
import { RootState } from 'meecha/store/store'
import UserSignup from 'meecha/_components/User'
import Auth from 'meecha/_components/Auth'

const Main = () => {
  const { package: authPkg, firstLogin } = useSelector(
    (state: RootState) => state.auth)
  // const dispatch = useDispatch()
  console.log('auth state', authPkg?.tokens.accessToken)

  if (!authPkg) {
    return <Auth />
  } else if (authPkg.disabled) {
    return (
      <View>
        <Text>You've been banned!</Text>
      </View>
    )
  } else if (!authPkg.user || firstLogin) {
    return <UserSignup />
  } else {
    return null // TODO
  }
}

export default Main
