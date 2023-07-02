import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { signUpSystem } from '../reducks/users/operations'

const SignUp = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState(""),
        [invitationCode, setInvitationCode] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setEmail])
  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [confirmPassword])
  const inputInvitationCode = useCallback((event) => {
    setInvitationCode(event.target.value)
  }, [invitationCode])

  return (
    <div>
      <h1>
        SignUp
      </h1>
      <div>
        <TextField
          label={'Name'}
          value={username}
          onChange={inputUsername}
          type={"text"}
        />
      </div>
      <div>
        <TextField
          label={'E-mail'}
          value={email}
          onChange={inputEmail}
          type={"email"}
        />
      </div>
      <br />
      <div>
        <TextField
          label={'Password'}
          value={password}
          onChange={inputPassword}
          type={"password"}
        />
        <br />
        <TextField
          label={'Confirm Password'}
          value={confirmPassword}
          onChange={inputConfirmPassword}
          type={"password"}
        />
      </div>
      <br />
      <div>
        <TextField
          label={'Invitation Code'}
          value={invitationCode}
          onChange={inputInvitationCode}
          type={"text"}
        />
      </div>
      <br />
      <div>
        <Button
          variant="outlined"
          label={'Sign Up'}
          onClick={() => {
            dispatch(signUpSystem(username, email, password, confirmPassword, invitationCode));
          }}
        >
          Sign Up
        </Button>
      </div>
      
      <br />
      Home to <Link to={`/`}>this.</Link>
      
    </div>
  )
}

export default SignUp;