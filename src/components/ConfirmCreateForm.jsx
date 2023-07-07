import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { saveRanking } from '../reducks/ranking/operations'
import { getExplan, getItem, getTitle } from '../reducks/ranking/selectors'

const ConfirmCreateForm = (props) => {
  const dispatch = useDispatch()

  const selector = useSelector((state) => state)
  const confirmTitle = getTitle(selector)
  const confirmExplan = getExplan(selector)
  const confirmItem = getItem(selector)

  useEffect(() => {
    if (confirmTitle === '' || confirmExplan === '') {
      dispatch(push('/ranking/createform'))
    }
  }, [])

  return (
    <div>
      <h1>
        Confirm Form
      </h1>
      <div>
        Title:{confirmTitle }
      </div>
      <div>

      </div>
      <br />
      <div>
        Explan:{confirmExplan}
      </div>
      <br />
      <div>
        Item:{confirmItem}
      </div>
      <br />
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(saveRanking())
          }}>
          SAVE
        </Button>
      </div>
      <br />
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(push('/ranking/createform'))
          }}>
          Ranking Fix
        </Button>
      </div>
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </div>
  )
}

export default ConfirmCreateForm