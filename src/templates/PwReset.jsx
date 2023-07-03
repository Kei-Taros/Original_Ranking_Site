import React from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { pwResetSystem } from '../reducks/users/operations'

const PwReset = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <div>
      <h1>
        Password Reset
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
        <Button
          variant="outlined"
          label={'Password Reset'}
          onClick={() => {
            dispatch(pwResetSystem(email));
          }}
        >
          Password Reset
        </Button>
      </div>
      <br />
      SignIn to <Link to={`/signin`}>this.</Link>
      <br />
      SignUp to <Link to={`/signup`}>this.</Link>
    </div>
  )
}

export default PwReset;