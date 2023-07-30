import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { deleteRanking, voteProcess } from '../reducks/ranking/operations'
import { getItem, getTotalVote } from '../reducks/ranking/selectors'
import { updateRankingAction } from '../reducks/ranking/action'
import { updateVoteRankig } from '../reducks/users/operations'
import { getUid, getVoteRanking } from '../reducks/users/selectors'
import { push } from 'connected-react-router'
import { Link } from 'react-router-dom'

const RankingItemDetail = () => {
  const dispatch = useDispatch()
  const rankingId = useParams().id
  const selector = useSelector((state) => state)
  console.log(selector)

  const [title, setTitle] = useState(''),
        [explan, setExplan] = useState(''),
        [item, setItem] = useState([]),
        [totalVote, setTotalVote] = useState(0),
        [btnDisable, setBtnDisable] = useState(false),
        [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    db.collection('ranking').doc(rankingId).get()
      .then(getData => {
        const rankingData = getData.data()
        setTitle(rankingData.title)
        setExplan(rankingData.explan)
        setItem(rankingData.item)
        setTotalVote(rankingData.totalVote)
        createrUserMode(rankingData.createrUid)
        votingLimit(rankingData.totalVote)
        dispatch(updateRankingAction(rankingData))
      })
      .catch((error) => {
        dispatch(push('/ranking/list'))
      })
  }, [])

  const createrUserMode = (createrUid) => {
    const uid = getUid(selector)
    if (createrUid === uid) {
      setIsVisible(true)
    }
  }

  const votingLimit = (totalVoteCount) => {
    const voteRankingUserData = getVoteRanking(selector)
    for (const voteData of voteRankingUserData) {
      if (voteData.voteId === rankingId) {
        setBtnDisable(true)
      }
    }
    if (totalVoteCount === 0) {
      setBtnDisable(false)
    }
  }

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
                dispatch(voteProcess(rankingId, index))
                  .then(() => {
                    setItem(getItem(selector))
                    setTotalVote(getTotalVote(selector))
                    dispatch(updateVoteRankig(rankingId))
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
      <br />
      <div>
        {isVisible ? (
          <button
            onClick={() => {
              dispatch(push('/ranking/createform'))
            }}
          >
            Edit
          </button>
        ) : ('')}
        &nbsp;
        {isVisible ? (
          <button
            onClick={() => {
              dispatch(deleteRanking(rankingId))
            }}
          >
            Delete
          </button>
        ) : ('')}
      </div>
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </>
  )
}

export default RankingItemDetail