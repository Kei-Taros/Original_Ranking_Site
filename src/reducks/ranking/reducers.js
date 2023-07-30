import initialState from '../store/initialState';
import * as Act from './action';

export const rankingReducer = (state = initialState.ranking, action) => {
  switch (action.type) {
    case Act.RANKING_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case Act.RANKING_RESET:
      return {
        ...action.payload
      }

    default:
      return state
  }
}

export const tmpRankingReducer = (state = initialState.tmpRanking, action) => {
  switch (action.type) {
    case Act.RANKING_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case Act.TMP_RANKING_RESET:
      return {
        ...action.payload
      }

    default:
      return state
  }
}
