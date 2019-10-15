import React from 'react';
import ReactDOM from 'react-dom';
import AvatarRoom from './component/AvatarRoom/AvatarRoom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import avatarRoomReducer from './store/avatarRoom/reducer';

const store = createStore(avatarRoomReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}><AvatarRoom /></Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
