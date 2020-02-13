import 'bootstrap/dist/css/bootstrap.min.css';
// import './custom.scss';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// import store from "./redux/store"; // Replaced by configureStore.js
import configureStore from "redux/configureStore.js";
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import * as serviceWorker from './serviceWorker';

const { store, persistor } = configureStore();
persistor.purge(); // Uncomment to stop saving the store in localStorage

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
