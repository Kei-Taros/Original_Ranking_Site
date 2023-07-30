import { push } from 'connected-react-router'
import { db, FirebaseTimestamp } from '../../firebase/index'
import initialState from '../store/initialState'
import { updateRankingAction, resetRankingAction, resetTmpRankingAction } from './action'

const rankingRef = db.collection('ranking')

export const createRanking = (title, explan, item, id, duplicateItemValue) => {
  return async (dispatch, getState) => {
    const state = getState()

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

    let votedConfirmFlag = false
    for (const itemData of item) {
      if (itemData.itemVote !== 0) {
        votedConfirmFlag = true
        break
      }
    }
    if (votedConfirmFlag) {
      const rankingState = state.ranking
      const tmpRankingState = state.tmpRanking
      let votedItem = rankingState.item
      if (tmpRankingState.votedItemTmpSave.length !== 0) {
        votedItem = tmpRankingState.votedItemTmpSave
      }
      const votedItemCount = votedItem.length
      const editingItem = structuredClone(item)
      const editingItemCount = editingItem.length
      let adjustCount = 0
      let changedItem = []

      if (votedItemCount > editingItemCount) {
        adjustCount = editingItemCount
        votedItem.length = adjustCount
      }
      else if (votedItemCount < editingItemCount) {
        adjustCount = votedItemCount
        editingItem.length = adjustCount
      }
      else {
        adjustCount = editingItemCount
      }

      for (let i = 0; i < adjustCount; i++) {
        if (votedItem[i].itemValue !== editingItem[i].itemValue) {
          if (editingItem[i].itemVote !== 0) {
            editingItem[i].itemVote = 0
            changedItem.push(editingItem[i].itemValue)
          }
        }
      }

      if (changedItem.length !== 0) {
        const confirmFlag = window
          .confirm('If you edit a voted item, the vote is lost.\n→' + changedItem)

        if (confirmFlag) {
          tmpRankingState.updateVotedItem = structuredClone(editingItem)
          tmpRankingState.votedItemTmpSave = structuredClone(votedItem)
        }
        else {
          return false
        }
      }
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
    const tmpRankingState = state.tmpRanking

    const uid = state.users.uid
    rankigState.createrUid = uid
    const timestamp = FirebaseTimestamp.now()
    rankigState.created_at = timestamp
    const updateVotedItem = tmpRankingState.updateVotedItem
    if (updateVotedItem.length !== 0) {
      rankigState.item = updateVotedItem
      let updateTotalVote = updateVotedItem.reduce((sum, item) => {
        return sum + item.itemVote
      }, 0)
      rankigState.totalVote = updateTotalVote
    }

    const id = rankigState.id

    return rankingRef.doc(id).set(rankigState)
      .then(() => {
        const resetRankingData = initialState.ranking
        dispatch(resetRankingAction(resetRankingData))
        const resetTmpRankingData = initialState.tmpRanking
        dispatch(resetTmpRankingAction(resetTmpRankingData))
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

export const deleteRanking = (id) => {
  return async (dispatch, getState) => {
    const deleteConfirmFlag = window.confirm('Can I remove this ranking?')
    if (deleteConfirmFlag) {
      rankingRef.doc(id).delete()
        .then(() => {
          dispatch(push('/ranking/list'))
        })
    }
  }
}

export const resetRankigProcess = () => {
  return async (dispatch) => {
    const resetData = initialState.ranking
    dispatch(resetRankingAction(resetData))
  }
}