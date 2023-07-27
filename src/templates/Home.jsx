import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetRankigProcess } from '../reducks/ranking/operations'
import { signOutSystem } from '../reducks/users/operations'

const Home = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.users.username)
  const uid = useSelector((state) => state.users.uid)

  useEffect(() => {
    dispatch(resetRankigProcess())
  })
  
  return (
    <div>
      <h1>
        Home
      </h1>
      <div>
        Counter to <Link to={`/counter`}>this.</Link>
      </div>
      <div>
        SignOut to <Link
          to={`/signin`}
          onClick={() => {
            dispatch(resetRankigProcess())
            dispatch(signOutSystem())
          }}
        >
          this.
        </Link>
      </div>
      <div>
        CreateForm to <Link to={`/ranking/createform`}>this.</Link>
      </div>
      <div>
        RankingList to <Link to={`/ranking/list`}>this.</Link>
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