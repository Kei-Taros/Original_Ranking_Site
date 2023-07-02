import React from 'react'
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history'
import App from './App'
import createStore from './reducks/store/store';

const history = History.createBrowserHistory();
export const store = createStore(history)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);
