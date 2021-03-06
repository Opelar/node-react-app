import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import AppLayout from './views/AppLayout';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppLayout />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV === 'production') {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}
