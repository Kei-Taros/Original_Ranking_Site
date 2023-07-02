import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incdecSystem } from '../reducks/calcsys/operations'
import { Link } from 'react-router-dom'

export const INC_A = "INC_A"
export const DEC_A = "DEC_A"
export const INC_B = "INC_B"
export const DEC_B = "DEC_B"
export const ADD = "ADD"

export const Counter = () => {
  const count_A = useSelector((state) => state.count.count_A)//ステートの状態を取得する
  const count_B = useSelector((state) => state.count.count_B)
  const add_count = useSelector((state) => state.count.add_count)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>
        Addition Count: {add_count}
        <button
          onClick={() => {
            dispatch(incdecSystem(ADD))
          }}>
          ADD
        </button>
      </h1>
      <div>
        <button
          onClick={() => {
            dispatch(incdecSystem(INC_A))
          }}>
          +1
        </button>
        <button
          onClick={() => {
            dispatch(incdecSystem(DEC_A))
          }}>
          -1
        </button>
        Count: {count_A}
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(incdecSystem(INC_B))
          }}>
          +1
        </button>
        <button
          onClick={() => {
            dispatch(incdecSystem(DEC_B))
          }}>
          -1
        </button>
        Count: {count_B}
      </div>
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </div>
  )
}

