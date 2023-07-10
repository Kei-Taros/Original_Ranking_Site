import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { saveRanking } from '../reducks/ranking/operations'
import { getExplan, getItem, getTitle } from '../reducks/ranking/selectors'
import { useFieldArray, useForm } from 'react-hook-form'

const ConfirmCreateForm = (props) => {
  const dispatch = useDispatch()

  const selector = useSelector((state) => state)
  const confirmTitle = getTitle(selector)
  const confirmExplan = getExplan(selector)
  const confirmItem = getItem(selector)
  const confirmItemCount = confirmItem.length
  let confirmInitialItem = []
  if (confirmItemCount !== 0) {
    confirmInitialItem = confirmItem[0].itemValue
  }

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: confirmTitle,
      explan: confirmExplan,
      items: [{ itemValue: confirmInitialItem }]
    }
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'items'
  })

  const onSubmit = () => {
    dispatch(saveRanking())
    setFixFlag(false)
  }

  const [fixFlag, setFixFlag] = useState(false)
  useEffect(() => {
    if (fixFlag === false) {
      for (let i = 1; confirmItemCount > i; i++) {
        append({ itemValue: confirmItem[i].itemValue })
      }
      setFixFlag(true)
    }
  }, [])

  useEffect(() => {
    if (confirmTitle === '' || confirmExplan === '' || confirmItemCount === 0) {
      dispatch(push('/ranking/createform'))
    }
  }, [])

  return (
    <>
      <h1>
        Confirm Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            inputProps={{ ...register('title') }}
            placeholder='Title'
            disabled
          />
        </div>
        <br />
        <div>
          <TextField
            inputProps={{ ...register('explan') }}
            placeholder='Explan'
            disabled
          />
        </div>
        <br />
        <div>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField
                inputProps={{ ...register(`items.${index}.itemValue`) }}
                placeholder={'item:' + (index + 1)}
                disabled
              />
            </div>
          ))}
        </div>
        <br />
        <div>
          <Button type='submit' variant="contained">
            SAVE
          </Button>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            onClick={() => dispatch(push('/ranking/createform'))}
          >
            FIX
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

export default ConfirmCreateForm