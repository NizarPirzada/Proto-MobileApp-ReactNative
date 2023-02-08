import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuthRefreshMutation, useCreateUserMutation } from 'meecha/generated/api.generated'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'meecha/store/store'
import { firstLogin } from 'meecha/store/auth'
import DatePicker from 'react-native-date-picker'

interface UserAttr {
  question: string,
  setCallback: (val: any) => void,
}

enum Gender {
  MALE = 'M',
  FEMALE = 'F',
}

const styles = StyleSheet.create({
  input: {
    height: 40,
  },
  error: {
    color: 'red',
  },
})

const UserSignup = () => {
  const [handle, setHandle] = useState('')

  const minBirthday = new Date()
  minBirthday.setFullYear(minBirthday.getFullYear() - 17)
  const [birthday, setBirthday] = useState<Date | null>(minBirthday)

  const [gender, setGender] = useState<Gender | null>()
  // User's country
  const [country, setCountry] = useState('')
  // Profile language
  const [language, setLanguage] = useState('')
  const [nickname, setNickname] = useState('')
  const [headline, setHeadline] = useState('')

  const refreshToken = useSelector((state: RootState) =>
    state.auth.package?.tokens.refreshToken)
  const userId = useSelector((state: RootState) => state.auth.package?.user?.id)

  const [createUser] = useCreateUserMutation()
  const [switchUser] = useAuthRefreshMutation()

  const dispatch = useDispatch()

  // Error message
  const [error, setError] = useState('')

  if (userId) {
    console.log('user has created an account', userId)
    // TODO: Show gender, birthday, country input
  }

  if (!refreshToken) {
    console.log('unexpected - user must have logged in')
    return null
  }

  async function createUserHandle() {
    try {
      if (handle.length < 3 || handle.length > 20) {
        console.log('too short', handle)
        setError('handle length must be between 3 and 20')
        return
      }
      const { id: userId } = await createUser({ body: { handle: handle } }).unwrap()
      // Switch user
      const authPkg = await switchUser({
        body: { refreshToken: refreshToken!, userId },
      }).unwrap()
      // Refresh auth state
      dispatch(firstLogin(authPkg))
    } catch (e) {
      console.log('error encountered (create user)', e)
      if (e.status === 409) {
        setError('this handle has been registered')
      } else if (e.status === 400) {
        setError('this handle contains unsupported characters')
      } else {
        setError('unable to create user, please try again later')
      }
    }
  }

  // On first login
  async function initializeUser() {
    return null
  }

  if (!userId) {
    return (
      <View>
        <Text>Let's create a user handle</Text>
        <TextInput style={styles.input} onChangeText={setHandle} />
        {(error) ? <Text style={styles.error}>{error}</Text> : null}
        <Button title='submit' onPress={createUserHandle} />
      </View>
    )
  } else {
    // TODO: In a sequence, ask birthday, then gender, then country
    return (
      <>
        <View>
          <Text>When is your birthday?</Text>
          <DatePicker date={birthday!} onDateChange={setBirthday} mode='date'
                      maximumDate={minBirthday} fadeToColor='white' />
        </View>
        <View>
          <Text>What is your gender?</Text>
        </View>
        <View>
          <Text>What country are your from?</Text>

        </View>
      </>
    )
  }
}

export default UserSignup
