import { connectRouter, routerMiddleware } from 'connected-react-router'
import {
  applyMiddleware,
  combineReducers,
  createStore as reduxCreateStore
} from 'redux'
import thunk from 'redux-thunk'//”ñ“¯Šúˆ—‚Ì‚½‚ß‚É’Ç‰Á
import counterReducer from '../calcsys/reducers'
import rankingReducer from '../ranking/reducers'
import usersReducer from '../users/reducers'

const createStore = (history) => {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      count: counterReducer,
      users: usersReducer,
      ranking: rankingReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}

export default createStore