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
  const rankingId = getId(selector)
  const confirmTitle = getTitle(selector)
  const confirmExplan = getExplan(selector)
  const confirmItem = getItem(selector)
  const confirmItemCount = confirmItem.length

  let defaultValues = {
    title: '',
    explan: '',
    items: [{ itemValue: '', itemVote: 0 }]
  }
  
  if (confirmTitle !== '' && confirmExplan !== '' && confirmItemCount !== 0) {
    defaultValues = {
      title: confirmTitle,
      explan: confirmExplan,
      items: [{ itemValue: confirmItem[0].itemValue, itemVote: confirmItem[0].itemVote }]
    }
  }

  const { register, handleSubmit, control, setFocus } = useForm({ defaultValues })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  const onSubmit = (data) => {
    const title = data.title
    const explan = data.explan

    const createItemList = []
    const duplicateItemValue = []
    data.items.forEach((createItem) => {
      if (createItem.itemValue !== '') {
        createItemList.push(createItem)
        duplicateItemValue.push(createItem.itemValue)
      }
    })
    dispatch(createRanking(title, explan, createItemList, rankingId, duplicateItemValue))
    setFixFlag(false)
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
        append({ itemValue: '', itemVote: 0 }, { shouldFocus: false })
        countUp()
      }
      setFocus('title')
    }
    else if (fixFlag === false) {
      for (let i = 1; confirmItemCount > i; i++) {
        append({ itemValue: confirmItem[i].itemValue, itemVote: confirmItem[i].itemVote },
          { shouldFocus: false }
        )
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
            multiline
            minRows={3}
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
            onClick={() => [append({ itemValue: '', itemVote: 0 }), countUp()]}
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