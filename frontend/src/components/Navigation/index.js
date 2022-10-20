import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "../../images/logo-placeholder.png"
import CreateSpotForm from "../CreateSpot";
import LoginForm from "../LoginFormModal/LoginForm";
import { Modal } from '../../context/Modal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <ProfileButton user={sessionUser} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //             <LoginFormModal />
    //             <SignupFormModal />
    //         </>
    //     );
    // }
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    )

    const [createSpotModal, setCreateSpotModal] = useState(false);
    const [loginFormModal, setLoginFormModal] = useState(false);

    const createSpotX = () => {
        setCreateSpotModal(false)
    }

    const loginFormX = () => {
        setLoginFormModal(false)
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
                {/* {sessionUser && <div className='become-a-host-div'>
                    <button className="become-a-host-button">
                        Become a Host
                    </button>
                </div>} */}
                {sessionUser && <div className='become-a-host-div'>
                    <button onClick={() => setCreateSpotModal(true)} className="become-a-host-button">
                        Become a Host
                    </button>
                </div>}
                {!sessionUser && <div className='become-a-host-div'>
                    <button onClick={() => setLoginFormModal(true)} className="become-a-host-button">
                        Become a Host
                    </button>
                </div>}
                {createSpotModal &&
                    <Modal Modal onClose={() => setCreateSpotModal(false)}>
                        <CreateSpotForm clickedX={createSpotX} />
                    </Modal>
                }
                {loginFormModal &&
                    <Modal Modal onClose={() => setLoginFormModal(false)}>
                        <LoginForm clickedX={loginFormX} />
                    </Modal>
                }
                <div className='menu-div'>
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
