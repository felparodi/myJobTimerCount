import React from 'react';
import { render } from 'react-dom';
import './app.scss';
import { Provider } from 'react-redux';
import configureStore from './store/config';
import App from './component/App';

const store = configureStore();

render(
    <Provider store={store}>
        <App/>
    </Provider>
	, document.getElementById('app')
);
