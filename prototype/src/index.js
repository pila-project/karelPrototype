import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "redux/configureStore.js";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './i18n';

const { store, persistor } = configureStore();

// Comment out to implement saving the store in localStorage
// so state will not be reset when the browser is refreshed.
//persistor.purge();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
