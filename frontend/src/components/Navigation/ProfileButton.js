import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Profile.css';

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
            {showMenu && (
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
        </>
    );
}

export default ProfileButton;
