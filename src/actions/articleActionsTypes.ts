export const ARTICLE_WAS_RIDED = 'ARTICLE_WAS_RIDED';
export const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
export const READ_LATER = 'READ_LATER';
export const RATE_ARTICLE = 'RATE_ARTICLE';
export const ADD_COMMENT = 'READ_LATER';
export const COMPLAIN = 'COMPLAIN';
export const LOAD_NEWS = 'LOAD_NEWS';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const ADD_NEWS = 'RATE_ARTICLE';
export const REMOVE_NEWS = 'READ_LATER';
export const EDIT = 'COMPLAIN';

export type Article = {
    id: string,
    title: string,
    shortDescription: string,
    rating: number,
    ratingCount: number
};
export type News = {
    id: string,
    title: string,
    content: string,
};
