import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, FirebaseTimestamp } from '../firebase'
import {useParams} from 'react-router-dom/cjs/react-router-dom'

const RankingItemDetail = () => {
  const id = useParams().id
  console.log(id)

  const [title, setTitle] = useState(''),
        [explan, setExplan] = useState(''),
        [item,setItem]=useState([])
  
  useEffect(() => {
    db.collection('ranking').doc(id).get()
      .then(getData => {
        const rankingData = getData.data()
        setTitle(rankingData.title)
        setExplan(rankingData.explan)
        setItem(rankingData.item)
      })
  },[])

  return (
    <>
      <h1>{title}</h1>
      <div>
        Explanation:{explan}
      </div>
      <div>
        {item.map((itemData) => (
          <li key={itemData.length}>
            {itemData.itemValue}
          </li>
        ))}
      </div>
    </>
  )
}

export default RankingItemDetail