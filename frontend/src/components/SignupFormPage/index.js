import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css"

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className='sign-up-container'>
            <div className="sign-up-container-header">
                <button className='close-button'>x</button>
                <div className="sign-up-for-bemyguest">Log in or sign up</div>
            </div>
            <div className="sign-up-container-body">
                <form onSubmit={handleSubmit} className="sign-up-form-box">
                    <div className="sign-up-container-body-content">
                        <div className="welcome">Welcome to Be-myguest</div>
                        <div className='sign-up-inputs'>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email"
                                        className="sign-up-input-fields-1"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        placeholder="Username"
                                        className="sign-up-input-fields-2"
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
                                        placeholder="Password"
                                        className="sign-up-input-fields-3"
                                    />
                                </label>
                            </div>
                            <div className='line'></div>
                            <div>
                                <label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Confirm Password"
                                        className="sign-up-input-fields-4"
                                    />
                                </label>
                            </div>
                        </div>
                        <ul>
                            {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div>
                            <button type="submit" className="sign-up-signup-button">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
