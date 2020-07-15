import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...[thunk]),
      window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export default store;