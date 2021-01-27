import React,{ FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import firebase from './firebase/firebase';

import {  signout, setError, getUserById, setLoading } from './actions/authActions';
import { RootState } from './reducers/index';
import SignUp from './pages/signUp'
import SignIn from './pages/signin/signIn'
import './App.css';
import Home from './pages/home/home';
import News from './pages/news/news';
import Edit from './pages/edit/edit';
import Add from './pages/add/add';
import Button from './components/button/Button';


const App: FC = () =>  {
  const dispatch = useDispatch();
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const isAdmin: boolean = authenticated && user?.email === 'germes547@gmail.com';
  const logoutClickHandler = () => {
    dispatch(signout());
    dispatch(setLoading(false));
  }

  useEffect(() => {

    const unsubscribe =  firebase.auth().onAuthStateChanged( async (user) => {
        if(user) {
            dispatch(setLoading(true));
            const uid = await user.uid;
            await dispatch(getUserById(uid));     
        }
        dispatch(setLoading(false));
    })
    return () => {
        unsubscribe();
      };
  }, [dispatch]);
  useEffect(() => {
    dispatch(setError(''));
  }, [])
  
  return (
    <div className="App">
      <Router>
      <header className="App-header">
      <div className='container'>
        <nav>
          <div className='nav__links'>
            <Link to="/">home</Link>
            {isAdmin && <Link to="/add">add</Link>}
          </div>
          <div className='auth__setings'>
            {
              !authenticated ? 
              <>
                <Link to="/signin" className='btn-auth'>Sign In</Link>
                <Link to="/signup" className='btn-auth'>Sign Up</Link>
              </>
              : 
              <>
                <p>{user?.firstName}</p>
                <Button title={'Sign Out'} click={logoutClickHandler}/>
              </>
            }

          </div>
        </nav>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
            <Home /> 
        </Route>

        <Route  path="/signin">
          {!authenticated 
          ?
            <SignIn />
          :
          <Redirect to="/helloPage"/>
          }
        </Route>
        <Route  path="/helloPage">
        {authenticated 
        ?
          <p>hello {user?.firstName}</p>
        :
          <Redirect to="/signin"/>
        }
        </Route>
        <Route  path="/signup">
         {!authenticated 
          ?
            <SignUp />
          :
          <Redirect to="/helloPage"/>
         }
        </Route>
        <Route path="/news/:id">
            <News />
        </Route>
        <Route path="/edit/:id">
            <Edit />
        </Route>
        <Route path="/add">
            <Add />
        </Route>
      </Switch>
      
      </Router>
    </div>
  );
}

export default App;
