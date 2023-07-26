import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import {useParams} from 'react-router-dom/cjs/react-router-dom'
import { voteProcess } from '../reducks/ranking/operations'
import { getItem, getTotalVote } from '../reducks/ranking/selectors'
import { updateRankingAction } from '../reducks/ranking/action'
import { updateVoteRankig } from '../reducks/users/operations'
import { getVoteRanking } from '../reducks/users/selectors'

const RankingItemDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const selector = useSelector((state) => state)

  const [title, setTitle] = useState(''),
        [explan, setExplan] = useState(''),
        [item, setItem] = useState([]),
        [totalVote, setTotalVote] = useState(0),
        [btnDisable, setBtnDisable] = useState(false)

  useEffect(() => {
    db.collection('ranking').doc(id).get()
      .then(getData => {
        const rankingData = getData.data()
        setTitle(rankingData.title)
        setExplan(rankingData.explan)
        setItem(rankingData.item)
        setTotalVote(rankingData.totalVote)
        dispatch(updateRankingAction(rankingData))
      })
  }, [])

  useEffect(() => {
    const voteRankingData = getVoteRanking(selector)
    for (const voteData of voteRankingData) {
      if (voteData.voteId === id) {
        setBtnDisable(true)
      }
    }
  }, [])

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
                  .then(() => {
                    setItem(getItem(selector))
                    setTotalVote(getTotalVote(selector))
                    dispatch(updateVoteRankig(id))
                      .then(() => {
                        setBtnDisable(true)
                      })
                  })
                }}
            >
              VOTE
            </button>
          </li>
        ))}
      </div>
      <br />
      <div>
        Total Votes:[{totalVote}]
      </div>
    </>
  )
}

export default RankingItemDetail