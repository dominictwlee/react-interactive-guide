import React from 'react';
import ReactDOM from 'react-dom';
import TourguideProvider from '../src/TourguideProvider';
import App from './App';
import './index.css';

ReactDOM.render(
  <TourguideProvider>
    <App />
  </TourguideProvider>,
  document.getElementById('root')
);
