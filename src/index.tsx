import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
import rootReducer from './services/reducers/rootReducer';
import { socketMiddleware } from "./services/middlewares/wsMiddleware";
import { wsOrderLineActions } from "./services/actions/orderLineActions";
import { wsUserOrdersActions } from "./services/actions/userOrdersActions";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsOrderLineActions), socketMiddleware(wsUserOrdersActions))
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
