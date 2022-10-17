import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../images/logo-placeholder.png"
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }

    return (
        <nav className="navbar">
            <div className='navbar-left'>
                <NavLink
                    exact to="/">
                    <img src={logo} className='logo' />
                </NavLink>
            </div>

            <div className='navbar-right'>
                {sessionUser && <div className='become-a-host-div'>
                    <button className="become-a-host-button">
                        Become a Host
                    </button>
                </div>}
                <div className='menu-div'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
