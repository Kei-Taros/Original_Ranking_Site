import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'
import initialState from '../store/initialState'
import { createRankingAction, resetRankingAction } from './action'

const rankingRef = db.collection('ranking')

export const createRanking = (title, explan, item, id) => {
  return async (dispatch) => {
    if (title === '' || explan === '' || item === '') {
      alert('Enter the required items.')
      return false
    }

    const rankingData = {
      title: title,
      explan: explan,
      item: item
    }

    if (id === '') {
      const ref = rankingRef.doc()
      id = ref.id
      rankingData.id = id
    }

    dispatch(createRankingAction(rankingData))
    dispatch(push('/ranking/confirmform'))
  }
}

export const saveRanking = (confirmData) => {
  return async (dispatch, getState) => {
    const timestamp = FirebaseTimestamp.now()
    confirmData.created_at = timestamp

    const id = confirmData.id

    return rankingRef.doc(id).set(confirmData)
      .then(() => {
        const resetData = initialState.ranking
        dispatch(resetRankingAction(resetData))
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}