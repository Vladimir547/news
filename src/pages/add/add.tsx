import React, { FC, useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

import { RootState } from '../../reducers/index';
import Input from '../../components/input/Input';
import Submit from '../../components/submit/submit';
import Textarea from '../../components/textarea/textarea';
import Message from '../../components/message/Message';
import { loadNews, loadArticles } from '../../actions/articleActions';

const Add: FC = () => {
    const [ title, setTitle ] = useState<string>('');
    const [ shortDescription, setShortDexcription ] = useState<string>('');
    const [ content, setContent ] = useState<string>('');
    const { articles, newses } = useSelector((state: RootState) => state.articles);
    const [ isAdd, setIsAdd ] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (articles.length == 0) {
            fetch("http://localhost:4000/articles")
            .then(res => res.json())
            .then((result) => {
                dispatch(loadArticles(result));
            })
        }
        if (newses.length == 0) {
            fetch("http://localhost:4000/fullArticles")
            .then(res => res.json())
            .then((result) => {
                dispatch(loadNews(result));
            })
        }
    },[]);

    const addNews = async (e: FormEvent) => {
        e.preventDefault();
        const newArticle = {
            id: !articles[articles.length - 1] ? 1 : Number(articles[articles.length - 1]?.id) + 1,
            title: title,
            shortDescription: shortDescription,
            rating: 0,
            ratingCount: 0
        };
        const newNews = {
            id: !articles[articles.length - 1] ? 1 : Number(articles[articles.length - 1]?.id) + 1,
            title: title,
            content: content,
        };

        
        await Promise.all([
            await fetch("http://localhost:4000/articles", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newArticle),
            })
                .then(res => res.json()),
            await fetch("http://localhost:4000/fullArticles", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newNews),
            })
            .then(() => setIsAdd(true))
        ]);
    }
    
    
    return (
        <div className="form_wrapper">
            <h2>Add News</h2>
            {/* <Message className={error ? 'show-err' : ''} text={error}/> */}
            <form onSubmit={(e) => addNews(e)}>
                <Input 
                    type="text"
                    name="title"
                    value={title}
                    change={(e: any) => setTitle(e.currentTarget.value)}
                    className="input"
                    placeholder="Title"
                />
                 <Input 
                    type="text"
                    name="shortDescription"
                    value={shortDescription}
                    change={(e: any) => setShortDexcription(e.currentTarget.value)}
                    className="input"
                    placeholder="Short Description"
                />
                <Textarea 
                    placeholder="content" 
                    className="input" 
                    change={(e: any) => setContent(e.currentTarget.value)} 
                    value={content}
                />
                {/* <p><Link to="/forgot-password">Forgot password ?</Link></p> */}
                <Submit className='submit'  text={ "add"} name='sub'/> 
                {isAdd && <Redirect to='/' />}
            </form>
        </div>
    );
};

export default Add;