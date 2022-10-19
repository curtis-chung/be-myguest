import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Profile.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Modal } from '../../context/Modal';
import LoginForm from "../LoginFormModal/LoginForm";
import SignupForm from "../SignupFormModal/SignupForm";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    const [signinModal, setSigninModal] = useState(false);
    const [signupModal, setSignUpModal] = useState(false);

    const signinX = () => {
        setSigninModal(false)
    }

    const signupX = () => {
        setSignUpModal(false)
    }

    return (
        <>
            <button onClick={openMenu} className="profile-button">
                <div className="bars">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div className="circle-user">
                    <i class="fa-solid fa-circle-user"></i>
                </div>

            </button>
            {showMenu && user && (
                <div className="profile-dropdown-container">
                    <div className="profile-dropdown-contents">
                        <div className="profile-dropdown-personal-info">
                            <div>{user.username}</div>
                            <div>{user.email}</div>
                        </div>

                        <div className='line'></div>

                        <div className="profile-dropdown-content">
                            Manage Trips
                        </div>

                        <div className='line'></div>

                        <div className="profile-dropdown-content">
                            Manage Reviews
                        </div>

                        <div className='line'></div>

                        <div onClick={logout} className="profile-dropdown-content">Log Out</div>
                    </div>
                </div>
            )}
            {showMenu && !user && (
                <div className="profile-dropdown-container">
                    <div className="profile-dropdown-contents">
                        <div onClick={() => setSigninModal(true)} className="profile-dropdown-content-login">Log In</div>
                        <div onClick={() => setSignUpModal(true)} className="profile-dropdown-content">Sign Up</div>
                    </div>
                </div>
            )}
            {signinModal && (
                <Modal onClose={() => setSigninModal(false)}>
                    <LoginForm clickedX={signinX} />
                </Modal>
            )}
            {signupModal && (
                <Modal onClose={() => setSignUpModal(false)}>
                    <SignupForm clickedX={signupX} />
                </Modal>
            )}
        </>
    );
}

export default ProfileButton;
