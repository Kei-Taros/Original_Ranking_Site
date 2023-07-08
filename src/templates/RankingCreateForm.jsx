import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { createRanking } from '../reducks/ranking/operations'
import { getExplan, getId, getItem, getTitle } from '../reducks/ranking/selectors'

import { useFieldArray, useForm } from 'react-hook-form'

const RankingCreateForm = () => {
  const dispatch = useDispatch()

  const selector = useSelector((state) => state)
  const id = getId(selector)
  const confirmTitle = getTitle(selector)
  const confirmExplan = getExplan(selector)
  const confirmItem = getItem(selector)
  const confirmItemCount = confirmItem.length

  let initialTitle = ''
  let initialExplan = ''
  let initialItemValue = []

  if (confirmTitle !== '' && confirmExplan !== '' && confirmItemCount !== 0) {
    initialTitle = confirmTitle
    initialExplan = confirmExplan
    initialItemValue = confirmItem
  }

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: initialTitle,
      explan: initialExplan,
      items: [{ itemValue: initialItemValue[0] }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const onSubmit = (data) => {
    const title = data.title
    const explan = data.explan

    const createItemList = [];
    data.items.forEach((createItem, index) => {
      if (createItem.itemValue !== '') {
        createItemList.push(createItem.itemValue)
      }
    })
    setFixFlag(false)
    dispatch(createRanking(title, explan, createItemList, id))
    //reset();
  }

  const [count, setCount] = useState(0)
  const countUp = () => {
    setCount(count + 1)
  }
  const reduce = () => {
    if (count > 1) {
      remove(count)
      setCount(count - 1)
    }
  }

  const [fixFlag, setFixFlag] = useState(false)
  const ItemCout = confirmItemCount - 1
  useEffect(() => {
    if (count === 0 && confirmItemCount === 0) {
      for (let i = 0; i < 1; i++) {
        append({ itemValue: '' })
        countUp()
      }
    }
    else if (fixFlag === false) {
      for (let i = 1; confirmItemCount > i; i++) {
        append({ itemValue: initialItemValue[i] })
      }
      setCount(ItemCout)
      setFixFlag(true)
    }
  }, [])

  return (
    <>
      <h1>
        Create Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            inputProps={{ ...register('title') }}
            placeholder='Title'
          />
        </div>
        <br />
        <div>
          <TextField
            inputProps={{ ...register('explan') }}
            placeholder='Explan'
          />
        </div>
        <br />
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField
                inputProps={{ ...register(`items.${index}.itemValue`) }}
                placeholder={'item:' + (index + 1)}
              />
            </div>
          ))}
        </div>
        <br />
        <div>
          <Button
            type='button'
            variant='outlined'
            onClick={() => [append({ taskValue: '' }), countUp()]}
          >
            ADD
          </Button>
          <br />
          <Button
            type='button' variant='outlined' onClick={reduce}
          >
            REDUCE
          </Button>
        </div>
        <br />
        <div>
          <Button type='submit' variant="contained">
            Confirm
          </Button>
        </div>
      </form>
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </>
  )
}
export default RankingCreateForm