import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'  
import { createStore } from 'redux';
import {  BrowserRouter as Router } from 'react-router-dom'
import cartReducer from './reducers/cartReducer'

const store = createStore(cartReducer)

ReactDOM.render(
  <Router>
    <Provider store={store}>  
    <App />  
  </Provider>
  </Router>,
document.getElementById('root'));

serviceWorker.unregister();