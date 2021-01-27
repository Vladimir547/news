import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link } from "react-router-dom";

import { loadArticles } from '../../actions/articleActions';
import { RootState } from '../../reducers/index';
import './home.css';

interface IArticle {
    id: string;
    rating: number;
    ratingCount: number;
    shortDescription: string;
    title: string;
};

const Home: FC = () => {
    const { articles } = useSelector((state: RootState) => state.articles);
    const dispatch = useDispatch();
    useEffect (() => {
        fetch("http://localhost:4000/articles")
        .then(res => res.json())
        .then((result) => {
            dispatch(loadArticles(result));
        })
    },[]); 
    return (
        <section className='articles'>
            <div className='container'>
                <div className='articles__wrapper'>
                    {
                        articles && articles.map((item: IArticle ) => (
                            <div className='articles__item' key={item.id}>
                                <h3>{item.title}</h3>
                                <p><span>Description: </span>{item.shortDescription}</p>
                                <div className='article__setting'>
                                    <p><span>Rating: </span>{item.rating}</p>
                                    <Link to={`/news/${item.id}`}>learn more</Link> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Home;