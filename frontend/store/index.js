import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from '../middlewares/thunk';
import logger from '../middlewares/logger';
import crazy from '../middlewares/crazy';

const appliedMiddlewares = applyMiddleware(logger, crazy, thunk);
export default createStore(rootReducer, appliedMiddlewares);