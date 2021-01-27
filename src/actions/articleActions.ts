import { Article, News, LOAD_NEWS, LOAD_ARTICLES,} from './articleActionsTypes';



interface INewsesActionType {
    type: string;
    payload: News[]
}



export const loadArticles = (articles: Article[]): ArticleActionType => {
    return {
        type: LOAD_ARTICLES,
        payload: articles
    };
};
export const loadNews = (newses: News[]): INewsesActionType => {
    return {
        type: LOAD_NEWS,
        payload: newses,
    };
};
