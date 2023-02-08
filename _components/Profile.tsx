import { useState } from 'react'


const ProfileSelection = () => {
  // Profile language
  const [language, setLanguage] = useState('')
  const [nickname, setNickname] = useState('')
  const [headline, setHeadline] = useState('')

  // Error message
  const [error, setError] = useState('')

  // TODO: Load user profiles from server
  // TODO: If there is more than one, the user pick the language to use
  // TODO: If there is one, pick it and direct to the home page
  // TODO: If there is none, prompt the user to create one (show creation sequence)
}
