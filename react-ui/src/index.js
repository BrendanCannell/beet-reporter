import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let xhr = new XMLHttpRequest()
xhr.open("PUT", "/api/articles", true)
xhr.send()

ReactDOM.render(<App />, document.getElementById('root'))