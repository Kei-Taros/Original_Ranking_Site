import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { db } from '../firebase'
import {useParams} from 'react-router-dom/cjs/react-router-dom'
import { voteProcess } from '../reducks/ranking/operations'

const RankingItemDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  const [title, setTitle] = useState(''),
        [explan, setExplan] = useState(''),
        [item, setItem] = useState([]),
        [btnDisable, setBtnDisable] = useState(false)

  useEffect(() => {
    db.collection('ranking').doc(id).get()
      .then(getData => {
        const rankingData = getData.data()
        setTitle(rankingData.title)
        setExplan(rankingData.explan)
        setItem(rankingData.item)
      })
  }, [item])

  return (
    <>
      <h1>{title}</h1>
      <div>
        Explanation:{explan}
      </div>
      <div>
        {item.map((itemData,index) => (
          <li key={itemData.itemValue}>
            {itemData.itemValue}:[{itemData.itemVote}]
            &nbsp;
            <button
              disabled={btnDisable}
              onClick={() => {
                dispatch(voteProcess(id, index))
              }}
            >
              VOTE
            </button>
          </li>
        ))}
      </div>
    </>
  )
}

export default RankingItemDetail