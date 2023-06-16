import { connectRouter,routerMiddleware } from 'connected-react-router';
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunk from 'redux-thunk';
import { UsersReducer } from "../users/reducers";
import { ProductsReducer } from "../products/reducers";
import { createLogger } from 'redux-logger';

function createStore(history) {
  //Action�̔��΂����O�ɕ\��������
  const logger = createLogger({
    collapsed: true,
    diff:true
  });

  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products:ProductsReducer
    }),
    applyMiddleware(
      logger,
      routerMiddleware(history),
      //�񓯊���������邽�߂ɕK�v
      thunk
    )
  )
}
export default createStore;
