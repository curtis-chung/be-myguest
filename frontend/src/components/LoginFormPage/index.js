import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className='container'>
            <div className="container-header">
                <button className='close-button'>x</button>
                <div className="log-in-or-sign-up">Log in or sign up</div>
            </div>
            <div className="container-body">
                <form onSubmit={handleSubmit} className="form-box">
                    <div className="container-body-content">
                        <div className="welcome">Welcome to Be-myguest</div>
                        <div className='inputs'>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={credential}
                                        onChange={(e) => setCredential(e.target.value)}
                                        required
                                        placeholder="Username or email"
                                        className="input-fields-1"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder='Password'
                                        className="input-fields-2"
                                    />
                                </label>
                            </div>
                        </div>
                        <ul>
                            {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div>
                            <button type="submit" className="login-button">Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage;
