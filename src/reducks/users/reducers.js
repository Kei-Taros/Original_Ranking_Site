import initialState from '../store/initialState';
import * as Act from './action';

export const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Act.SIGN_IN:
      return {
        ...state,
        ...action.payload
      }
    case Act.SIGN_OUT:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default usersReducer