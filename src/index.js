import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './store';

import App from './components/app';


const bandReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_BAND':
      return [...state, action.payload];
    default:
      return state;
  }
}

const store = createStore(bandReducer);

const render = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('container'))
}

store.subscribe(render);
store.dispatch({})

require('../test/index-test.js'); // Leave this in!
