import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { ConfirmCreateForm } from '../components/index'
import { createRanking } from '../reducks/ranking/operations'

const RankingCreateForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState(''),
        [explan, setExplan] = useState(''),
        [item, setItem] = useState([])

  const id = useSelector((state) => state.ranking.id)
  const confirmTitle = useSelector((state) => state.ranking.title)
  const confirmExplan = useSelector((state) => state.ranking.explan)
  const confirmItem = useSelector((state) => state.ranking.item)

  const inputTitle = useCallback((event) => {
    setTitle(event.target.value)
  }, [setTitle])
  const inputExplan = useCallback((event) => {
    setExplan(event.target.value)
  }, [setExplan])
  const inputItem = useCallback((event) => {
    setItem(event.target.value)
  }, [setItem])

  useEffect(() => {
    if (id !== '') {
      setTitle(confirmTitle)
      setExplan(confirmExplan)
      setItem(confirmItem)
    }
  },[id])


  return (
    <div>
      <h1>
        Create Form
      </h1>
      <div>
        <TextField
          label={'Title'}
          value={title}
          onChange={inputTitle}
          type={'text'}
        />
      </div>
      <br />
      <div>
        <TextField
          label={'Explan'}
          value={explan}
          onChange={inputExplan}
          type={'text'}
        />
      </div>
      <br />
      <div>
        <TextField
          label={'Item'}
          value={item}
          onChange={inputItem}
          type={'text'}
        />
      </div>
      <br />
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(createRanking(title, explan, item, id))
          }}>
          Confirm
        </Button>
      </div>
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </div>
  )
}

export default RankingCreateForm