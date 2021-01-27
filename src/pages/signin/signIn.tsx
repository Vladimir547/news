import React, { FC, useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../reducers/index';
import {  signin, setError, setLoading } from '../../actions/authActions';
import Input from '../../components/input/Input';
import Submit from '../../components/submit/submit';
import Message from '../../components/message/Message';

const SignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const {  error, loading } = useSelector((state: RootState) => state.auth);

    const signInHandler = (e: FormEvent) => {
        e.preventDefault();
        if(error) {
          dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signin({ email, password }, () => setLoading(false)));
      }
      
    return (
        <div className="form_wrapper">
            <h2>Sign In</h2>
            <Message className={error ? 'show-err' : ''} text={error}/>
            <form onSubmit={signInHandler}>
                <Input 
                    type="email"
                    name="email"
                    value={email}
                    change={(e: any) => setEmail(e.currentTarget.value)}
                    className="input"
                    placeholder="Email address"
                />
                <Input 
                    type="password"
                    name="password"
                    value={password}
                    change={(e: any) => setPassword(e.currentTarget.value)}
                    className="input"
                    placeholder="Password"
                />
                {/* <p><Link to="/forgot-password">Forgot password ?</Link></p> */}
                <Submit className='submit' disabled={loading} text={loading ? "Loading..." : "Sign In"} name='sub'/>
            </form>
        </div>
    );
};

export default SignIn;