import React, { FC, useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from "react-router-dom";

import { Article } from '../../actions/articleActionsTypes';
import { RootState } from '../../reducers/index';
import Input from '../../components/input/Input';
import Submit from '../../components/submit/submit';
import Message from '../../components/message/Message';
import { loadNews, loadArticles } from '../../actions/articleActions';


interface IParams {
    id: string;
}

interface Inews {
    id: string;
    title: string
    content: string;
};

const Edit: FC = () => {
    const { articles, newses } = useSelector((state: RootState) => state.articles);
    const { id } = useParams<IParams>();
    const dispatch = useDispatch();
    const editArticle: Array<Article>= articles.filter((item: Article) => Number(item.id) == Number(id));
    const editNews: Array<Inews> = newses.filter((item: Inews) => Number(item.id) == Number(id));
    const [ title, setTitle ] = useState<string>('');
    const [ shortDescription, setShortDexcription ] = useState<string>('');
    const [ content, setContent ] = useState<string>('');
    const [ isEdited, setIsEdited ] = useState<boolean>(false);

    if (title === '' && editArticle[0] && editNews[0]) {
        setTitle(editArticle[0].title);
        setShortDexcription(editArticle[0].shortDescription);
        setContent(editNews[0].content);
    }
    if (title === '' && !editArticle[0] && editNews[0]) {
        fetch("http://localhost:4000/articles")
        .then(res => res.json())
        .then((result) => {
            dispatch(loadArticles(result));
        })
    }
    
    const editNewsHandler = async (e: FormEvent) => {
        e.preventDefault();
        const editedArticle = {
            id: id,
            title: title,
            shortDescription: shortDescription,
            rating: articles[0].rating,
            ratingCount: articles[0].rating
        };
        const editedNews = {
            id: id,
            title: title,
            content: content,
        };
        
        await Promise.all([
            await fetch(`http://localhost:4000/articles/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editedArticle),
            })
                .then(res => res.json())
                .then(result => console.log(result)),
            await fetch(`http://localhost:4000/fullArticles/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(editedNews),
            })
            .then(() => {
                setIsEdited(true)
            })
            .then( async() => {
                await fetch("http://localhost:4000/articles")
                .then(res => res.json())
                .then((result) => {
                    dispatch(loadArticles(result));
                })
            })
        ]);
    }
    useEffect(() => {
        return () => {
            setIsEdited(false);
            setTitle('');
            setShortDexcription('');
            setContent('');
        }
      }, []);
    
    return (
        <div className="form_wrapper">
            <h2>Edit News</h2>
            {/* <Message className={error ? 'show-err' : ''} text={error}/> */}
            <form onSubmit={(e) => editNewsHandler(e)}>
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
                <Input 
                    type="text"
                    name="content"
                    value={content}
                    change={(e: any) => setContent(e.currentTarget.value)}
                    className="input"
                    placeholder="content"
                />
                {/* <p><Link to="/forgot-password">Forgot password ?</Link></p> */}
                <Submit className='submit'  text={ "edit"} name='sub'/> 
                {isEdited && <Redirect to={`/news/${id}`} />}
                {newses.length === 0 && <Redirect to='/' />}
            </form>
        </div>
    );
};

export default Edit;