import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Js/App';

// Criação da raiz do React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o aplicativo com StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
