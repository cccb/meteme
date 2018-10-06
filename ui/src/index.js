
// Stylesheets
import 'font-awesome/css/font-awesome.css';
import './assets/vendor/bootstra.386/dist/css/bootstrap.css';
import './assets/vendor/bootstra.386/dist/css/bootstrap-theme.css';
import './assets/scss/main.css';


// App
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();

