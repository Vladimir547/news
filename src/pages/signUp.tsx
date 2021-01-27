import React, { FC, useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers/index';
import { signup, signin, setError } from '../actions/authActions';
import Input from '../components/input/Input';
import Submit from '../components/submit/submit';
import Message from '../components/message/Message';

const SignUp: FC = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(setError(''));
      }, [])
  
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if(error) {
          dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signup({ email, password, firstName }, () => setLoading(false)));
    }
    return (
        <div className="form_wrapper">
            <h2>Sign Up</h2>
            <Message className={error ? 'show-err' : ''} text={error}/>
            <form onSubmit={submitHandler}>
                <Input 
                    type="text"
                    name="firstName"
                    value={firstName}
                    change={(e: any) => setFirstName(e.currentTarget.value)}
                    className="input"
                    placeholder="First name"
                />
                <Input 
                    type="email"
                    name="email"
                    value={email}
                    change={(e: any) => setEmail(e.currentTarget.value)}
                    className="input"
                    placeholder="email"
                />
                <Input 
                    type="password"
                    name="password"
                    value={password}
                    change={(e: any) => setPassword(e.currentTarget.value)}
                    className="input"
                    placeholder="Password"
                />
                <Submit className='submit' disabled={loading} text={loading ? "Loading..." : "Sign In"} name='sub'/>
            </form>
        </div>
    );
};

export default SignUp;