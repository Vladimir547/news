import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({auth: authReducer, articles: articlesReducer});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;