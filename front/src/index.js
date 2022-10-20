import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'; // que puedo intereactutal con un provedor o proveedores
import store from './store';
import {positions, transitions, Provider as AlertProvider} from 'react-alert';//generar alertas
import AlertTemplate from 'react-alert-template-basic';


//alertas
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

