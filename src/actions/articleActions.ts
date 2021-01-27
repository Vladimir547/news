import { type } from 'os';
import { isImportDeclaration } from 'typescript';
import { Article, News, LOAD_NEWS, LOAD_ARTICLES, ADD_NEWS, EDIT, REMOVE_NEWS, ARTICLE_WAS_RIDED, ADD_TO_FAVORITE, READ_LATER, RATE_ARTICLE, ADD_COMMENT, COMPLAIN } from './articleActionsTypes';


type NewsActionType = {
    id?: string,
    newses?: Article
};

interface INewsesActionType {
    type: string;
    payload: News[]
}

interface ArticleActionType  {
    type: string;
    payload: Article[]
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

// export const addNews = (article: Article): NewsActionType  => {
//     return {
//         type: ADD_NEWS,
//         article
//     };
// };

// export const removeNews = (id: string): NewsActionType  => {
//     return {
//         type: REMOVE_NEWS,
//         id
//     };
// }
// export const editNews = (article: Article): NewsActionType  => {
//     return {
//         type: EDIT,
//         article
//     };
// }

// export const articleWasReaded = (id: string): ArticleActionType => {
//     return {
//         type: ARTICLE_WAS_RIDED,
//         id
//     };
// };
// export const addToFavorite = (id: string): ArticleActionType => {
//     return {
//         type: ADD_TO_FAVORITE,
//         id
//     };
// }
// export const readLater = (id: string): ArticleActionType => {
//     return {
//         type: READ_LATER,
//         id
//     }
// }

// export const rateArticle = (id: string, rate: number): ArticleActionType => {
//     return {
//         type: RATE_ARTICLE,
//         id,
//         rate
//     }
// }

// export const addComment = (id: string, comment: string): ArticleActionType => {
//     return {
//         type: ADD_COMMENT,
//         id,
//         comment
//     }
// }

// export const addComplain = (id: string, complain: string): ArticleActionType => {
//     return {
//         type: COMPLAIN,
//         id,
//         complain
//     }
// }