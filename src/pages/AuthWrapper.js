import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const AuthWrapper = ({ children }) => {
  // get isLoading and error
  const { isLoading, error } = useAuth0();

  // hande loading
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    )
  }
  // handle error
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }
  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
