import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PoleApp from './Component/Router';
import Routers from './Router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PoleApp />, document.getElementById('root'));
registerServiceWorker();
