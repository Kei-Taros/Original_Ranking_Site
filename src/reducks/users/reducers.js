import initialState from '../store/initialState';
import * as Act from './action';

export const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Act.SIGNIN_UPDATE:
      return {
        ...state,
        ...action.payload
      }
    case Act.SIGNOUT:
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default usersReducer