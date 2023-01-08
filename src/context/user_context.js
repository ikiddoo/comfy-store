import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  // get auth data from auth0
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0()
  // create user state
  const [myUser, setMyUser] = useState(null)

  // if user is authenticated effect
  useEffect(() => {
    // console.log(`user: ${user}`)
    // console.log(`isAuthenticated: ${isAuthenticated}`)
    // console.log(`isLoading: ${isLoading}`)
    // set user state if user is authenticated
    // if (isAuthenticated) {
    //   setMyUser(user)
    // } else {
    //   setMyUser(false)
    // }

    // instead, set user directly
    setMyUser(user)
  }, [isAuthenticated])

  // bind loginWithRedirect, logout, myuser state to context provider value
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
