import React from 'react';
import { render } from 'react-dom';
import './app.scss';
import { Provider } from 'react-redux';
import configureStore from './store/config';
import App from './component/App';
import { sfdcGetInfoConnect } from './actions/sfdcActions';


const store = configureStore();
store.dispatch(sfdcGetInfoConnect());
render(
    <Provider store={store}>
        <App/>
    </Provider>
	, document.getElementById('app')
);
