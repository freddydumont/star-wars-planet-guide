// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import './index.css';
// redux
import reducer from './reducers';
import { requestPlanets, requestPeople } from './actions';
import rootSaga from './sagas';
// others
import App from './App';
import unregister from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

// dispatch requests to API asap
store.dispatch(requestPlanets());
store.dispatch(requestPeople());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
unregister();
