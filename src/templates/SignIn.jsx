import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { signInSystem } from '../reducks/users/operations'

const SignIn = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])
  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setEmail])

  return (
    <div>
      <h1>
        SignIn
      </h1>
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
      </div>
      <br />
      <div>
        <Button
          variant="outlined"
          label={'Sign In'}
          onClick={() => {
            dispatch(signInSystem(email, password));
          }}
        >
          Sign In
        </Button>
      </div>
      
      <br />
      Home to <Link to={`/`}>this.</Link>
      
    </div>
  )
}

export default SignIn;