import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routers from './Router';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routers />, document.getElementById('root'));
registerServiceWorker();
