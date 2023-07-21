import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incdecSystem } from '../reducks/calcsys/operations'
import { Link } from 'react-router-dom'
import { db } from '../firebase'


const RankingItemList = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)

  const [rankingItem, setRankingItem] = useState([])

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
        setRankingItem(dataList)
      })
  }, [])


  return (
    <>
      <h1>
        Item List
      </h1>
      {rankingItem.map((item) => (
        <li key={item.id}>
          <Link to={`/ranking/list/${item.id}`}>
            Title:[{item.title}]
            &nbsp;
            Total Votes:[{item.vote}]
          </Link>
        </li>
      ))}
    </>
  )
}

export default RankingItemList