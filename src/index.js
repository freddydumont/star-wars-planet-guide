import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import './index.css';
import App from './App';
import unregister from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
unregister();
