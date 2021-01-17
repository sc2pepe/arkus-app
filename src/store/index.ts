import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import ListContactsReducer from './contactReducer';

const AppStore: Store<AppState> = createStore(ListContactsReducer, applyMiddleware(thunk));

export default AppStore;