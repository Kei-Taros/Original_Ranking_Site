import * as Act from './action';

const initialState = {
  count: {
    count_A: 0,
    count_B: 0,
    add_count: 0
  }
}

const counterReducer = (state = initialState.count, action) => {
  switch (action.type) {
    case Act.COUNTER_CHENGE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default counterReducer