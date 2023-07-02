import initialState from '../store/initialState';
import * as Act from './action';

const rankingReducer = (state = initialState.ranking, action) => {
  switch (action.type) {
    case Act.RANKING_CREATE:
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

export default rankingReducer