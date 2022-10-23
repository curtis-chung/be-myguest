import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../LoginFormPage/LoginForm.css';

function LoginForm({ clickedX }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(clickedX)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const loginDemoUser = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login({ credential: `demo@user.io`, password: "password" }))
            .then(clickedX)
    }

    return (
        <div className='container'>
            <div className="container-header">
                <button onClick={clickedX} className='close-button'>x</button>
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
                                        className="input-fields"
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
                                        className="input-fields"
                                    />
                                </label>
                            </div>
                        </div>
                        <ul>
                            {errors.map((error, idx) => <li key={idx} className="login-error">{error}</li>)}
                        </ul>
                        <div className='login-button-div'>
                            <button type="submit" className="login-button">Log In</button>
                        </div>
                        <div className="demo-button-div">
                            <button type="submit" className="login-button" onClick={loginDemoUser}>Demo Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
