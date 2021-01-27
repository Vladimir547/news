import { Article, LOAD_NEWS, LOAD_ARTICLES } from '../actions/articleActionsTypes';

interface IArticlesState{
    newses: any;
    articles: Article[];
};
interface IActionBase{
    type: string;
    payload: any;
};
const initialState: IArticlesState = {
    newses: [],
    articles: [],
}


const articlesReducer = (state = initialState, action: IActionBase) => {
    switch(action.type){
        case LOAD_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            }
        case LOAD_NEWS:
            return {
                ...state,
                newses: action.payload
            }
        default:
            return state;
    }
}

export default articlesReducer;