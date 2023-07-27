import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'
import initialState from '../store/initialState'
import { updateRankingAction, resetRankingAction } from './action'

const rankingRef = db.collection('ranking')

export const createRanking = (title, explan, item, id, duplicateItemValue) => {
  return async (dispatch) => {
    if (title === '' || explan === '') {
      alert('Enter the required items.')
      return false
    }
    if (item.length < 2) {
      alert('Two or more required.')
      return false
    }
    let duplicateCheckList = []
    duplicateCheckList = duplicateItemValue.filter((x, i, self) => {
      return self.indexOf(x) === i && i !== self.lastIndexOf(x)
    })
    if (duplicateCheckList.length !== 0) {
      alert('Duplicate ranking items.\n→' + duplicateCheckList)
      return false
    }

    const rankingData = {
      title: title,
      explan: explan,
      item: item,
      totalVote: 0
    }

    if (id === '') {
      const ref = rankingRef.doc()
      id = ref.id
      rankingData.id = id
    }

    dispatch(updateRankingAction(rankingData))
    dispatch(push('/ranking/confirmform'))
  }
}

export const saveRanking = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const rankigState = state.ranking

    const timestamp = FirebaseTimestamp.now()
    rankigState.created_at = timestamp

    const id = rankigState.id

    return rankingRef.doc(id).set(rankigState)
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

export const voteProcess = (id, index) => {
  return async (dispatch, getState) => {
    const snapshot = await rankingRef.doc(id).get()
    const updateItem = snapshot.data().item
    const keyItem = updateItem[index].itemValue
    for (const item of updateItem) {
      if (item.itemValue === keyItem) {
        item.itemVote = ++item.itemVote
        break
      }
    }

    let updateTotalVote = updateItem.reduce((sum, item) => {
      return sum + item.itemVote
    }, 0)

    await rankingRef.doc(id).update({
      item: updateItem,
      totalVote: updateTotalVote
    })
      .then(() => {
        const state = getState()
        const rankigData = state.ranking
        rankigData.item = updateItem
        rankigData.totalVote = updateTotalVote
        dispatch(updateRankingAction(rankigData))
      })
  }
}

export const resetRankigProcess = () => {
  return async (dispatch) => {
    const resetData = initialState.ranking
    dispatch(resetRankingAction(resetData))
  }
}