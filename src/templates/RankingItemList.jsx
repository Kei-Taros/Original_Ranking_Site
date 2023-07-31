import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { db } from '../firebase'


const RankingItemList = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)

  const [rankingItem, setRankingItem] = useState([]),
        [mostRecentItem, setMostRecentItem] = useState([]),
        [voteOrderItem, setVoteOrderItem] = useState([])

  const mostRecentBtn = () => {
      setRankingItem(mostRecentItem)
  }

  const voteOrderBtn = () => {
    setRankingItem(voteOrderItem)
  }

  useEffect(() => {
    db.collection('ranking').get()
      .then(snapshots => {
        const dataList = []
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          dataList.push({
            id: data.id,
            title: data.title,
            vote: data.totalVote
          })
        })

        if (voteOrderItem.length === 0) {
          setRankingItem(dataList)
          setMostRecentItem(dataList.slice())
          const adjustItem = dataList.slice()
          adjustItem.sort((current, next) =>
            next.vote - current.vote
          )
          setVoteOrderItem(adjustItem)
        }
      })
  }, [])

  return (
    <>
      <h1>
        Item List
      </h1>
      <div>
        <button onClick={mostRecentBtn}>
          Most Recent
        </button>
        &nbsp;
        <button onClick={voteOrderBtn}>
          Vote Order
        </button>
      </div>
      {rankingItem.map((item) => (
        <li key={item.id}>
          <Link to={`/ranking/list/${item.id}`}>
            Title:[{item.title}]
            &nbsp;
            Total Votes:[{item.vote}]
          </Link>
        </li>
      ))}
      <br />
      <div>
        Home to <Link to={`/`}>this.</Link>
      </div>
    </>
  )
}

export default RankingItemList