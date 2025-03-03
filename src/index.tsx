import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import { UsersStore } from './stores/UsersStore';
import { ItemsStore } from './stores/ItemsStore';

// if (!new class { x: any }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const usersStore = new UsersStore()
const itemsStore = new ItemsStore()

const stores = {
  UsersStore: usersStore,
  ItemsStore: itemsStore
}
ReactDOM.render(<Provider {...stores}>
  <App />
</Provider>, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
