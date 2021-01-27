import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, Redirect, Link } from "react-router-dom";
import { loadNews } from '../../actions/articleActions';
import { RootState } from '../../reducers/index';
import Button from '../../components/button/Button';

interface Inews {
    id: string;
    title: string
    content: string;
};

interface IParams {
    id: string;
}
  
const News: FC = () => {
    const [ isDeleted, setIsDeleted ] = useState<boolean>(false);
    const { newses } = useSelector((state: RootState) => state.articles);
    const { user, authenticated } = useSelector((state: RootState) => state.auth);
    const isAdmin: boolean = authenticated && user?.email === 'germes547@gmail.com';
    const { id } = useParams<IParams>();
    const dispatch = useDispatch();
    useEffect(() => {
        (async function (){
          await fetch("http://localhost:4000/fullArticles")
          .then(res => res.json())
          .then((result) => {
              dispatch(loadNews(result));
          })
     })();
    });
    const deliteNews = async() => {
        await Promise.all([
            fetch(`http://localhost:4000/articles/${id}`, {
                method: 'DELETE',
            }),
            fetch(`http://localhost:4000/fullArticles/${id}`, {
                method: 'DELETE',
            })
        ]).then(() => {setIsDeleted(true)});
    }
  
    return (
        <section className='articles'>
            <div className='container'>
                <div className='articles__wrapper'>
                    {
                        newses != null && newses.filter((item: Inews) => item.id == id).map((item: Inews) => (
                            <div key={item.id}>
                                <h3>{item.title}</h3>
                                <p><span>Description: </span>{item.content}</p>
                                {isAdmin && 
                                <div>
                                    <Link to={`/edit/${item.id}`}>edit</Link>
                                    <Button title={'Delete'} click={deliteNews}/>
                                </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            {isDeleted && <Redirect to='/' />}
        </section>
    );
};

export default News;