import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from "./store/configureStore";
import {saveState} from "./store/localStorage";
import {throttle} from 'lodash'

const store = configureStore();
store.subscribe(throttle(() => {
  saveState({
    questionIndex: store.getState().questionIndex,
    score: store.getState().score,
    quizzes: store.getState().quizzes
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
