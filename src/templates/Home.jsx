import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOutSystem } from '../reducks/users/operations'
import Button from '@material-ui/core/Button'

const Home = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.users.username)
  const uid = useSelector((state) => state.users.uid)
  
  return (
    <div>
      <h1>
        Home
      </h1>
      <div>
        Counter to <Link to={`/counter`}>this.</Link>
      </div>
      <div>
        SignUp to <Link to={`/signup`}>this.</Link>
      </div>
      <div>
        SignIn to <Link to={`/signin`}>this.</Link>
      </div>
      <div>
        SignOut to <Link
          to={`/`}
          onClick={() => {
            dispatch(signOutSystem());
          }}
        >
          this.
        </Link>
      </div>
      <div>
        CreateForm to <Link to={`/ranking/createform`}>this.</Link>
      </div>
      <br />
      <div>
        <div><b>Login Info</b></div>
        <div>UserName:{username}</div>
        <div>UserID:{uid}</div>
      </div>
    </div>
  )
}

export default Home;