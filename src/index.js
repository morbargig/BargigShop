import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import { UsersStore as usersStore } from './stores/UsersStore'
import { ItemsStore as itemsStore } from './stores/ItemsStore'

const UsersStore = new usersStore()
const ItemsStore = new itemsStore()

const stores = {
    UsersStore,
    ItemsStore
}
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();

