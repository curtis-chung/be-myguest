import React from 'react';
import './BottomNav.css';
import burst from "./burst_red.png";
import linkedInLogo from './linkedinLogo.png';
import gitHubLogo from './gitLogo.png';
import angelListLogo from "./angellist.png"
import pf from "./pflogo.png"

function BottomNav() {

    return (
        // <div className='bottom-nav'>
        //     <div className='bottom-nav-inner'>
        //         <div className='bottom-inner-links'>
        //             <div className='bottom-text-box'>
        //                 <span className='bottom-link-titles' style={{ color: 'black', marginBottom: '6px' }}>About</span>
        //                 <div className='bottom-link-list'>
        //                     <span className='hover-underline'>About Yep</span>
        //                     <span className='hover-underline'>Careers</span>
        //                     <span className='hover-underline'>Press</span>
        //                     <span className='hover-underline'>Investor Relations</span>
        //                     <span className='hover-underline'>Trust & Safety</span>
        //                     <span className='hover-underline'>Content Guidelines</span>
        //                     <span className='hover-underline'>Accessibility Statement</span>
        //                     <span className='hover-underline'>Terms of Service</span>
        //                     <span className='hover-underline'>Privacy Policy</span>
        //                     <span className='hover-underline'>Ad Choices</span>
        //                     <span className='hover-underline'>Manage Cookies</span>
        //                 </div>
        //             </div>
        //             <div className='bottom-text-box'>
        //                 <span className='bottom-link-titles' style={{ color: 'black', marginBottom: '6px' }}>Discover</span>
        //                 <div className='bottom-link-list'>
        //                     <span className='hover-underline'>Yep Project Cost Guides</span>
        //                     <span className='hover-underline'>Collections</span>
        //                     <span className='hover-underline'>Talk</span>
        //                     <span className='hover-underline'>Events</span>
        //                     <span className='hover-underline'>Yep Blog</span>
        //                     <span className='hover-underline'>Support</span>
        //                     <span className='hover-underline'>Yep Mobile</span>
        //                     <span className='hover-underline'>Developers</span>
        //                     <span className='hover-underline'>RSS</span>
        //                 </div>
        //             </div>
        //             <div className='bottom-text-box'>
        //                 <span className='bottom-link-titles' style={{ color: 'black', marginBottom: '6px' }}>Yep for Business</span>
        //                 <div className='bottom-link-list'>
        //                     <span className='hover-underline'>Claim your Business Page</span>
        //                     <span className='hover-underline'>Advertise on Yep</span>
        //                     <span className='hover-underline'>Yep for Restaurant Owners</span>
        //                     <span className='hover-underline'>Table Management</span>
        //                     <span className='hover-underline'>Business Success Stories</span>
        //                     <span className='hover-underline'>Business Support</span>
        //                     <span className='hover-underline'>Yep Blog for Business</span>
        //                 </div>
        //             </div>
        //             <div className='last-bottom-text-box'>
        //                 <span className='bottom-link-titles' style={{ color: 'black', marginBottom: '6px' }}>Language</span>
        //                 <div className='last-bottom-link-list'>
        //                     <span>English</span>
        //                 </div>
        //                 <span className='bottom-link-titles' style={{ color: 'black', marginBottom: '6px' }}>Country</span>
        //                 <div className='last-bottom-link-list'>
        //                     <span>United States</span>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className='bottom-div'>
        //             <div className='bottom-copyright'>
        //                 <span className='bottom-copyright-list'>Copyright © 2022 Yep Inc. &nbsp; <img className="bottom-nav-img" src={burst} alt="yep logo" /> &nbsp; and related marks are registered trademarks of Yep.</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='bottom-nav'>
            <div className='bottom-nav-inner'>
                <div className='bottom-inner-links'>
                    <div className='bottom-text-box'>
                        <div className="bottom-text-box-header">
                            <span className='bottom-link-titles'>Company</span>
                            <div className='bottom-link-list'>
                                <a target='_blank' href='https://www.appacademy.io' className='hover-underline'>App Academy</a>
                            </div>
                            <span className='bottom-link-titles' style={{ marginTop: "16px" }}>Developer</span>
                            <div className='bottom-link-list'>
                                <a target='_blank' href='https://www.linkedin.com/in/chungcurtis/' className='hover-underline'>Curtis Chung</a>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-text-box'>
                        <div className="bottom-text-box-header">
                            <span className='bottom-link-titles'>Let's Connect</span>
                            <div className='bottom-link-list'>
                                <span className="bottom-nav-contacts">
                                    <a className="footer-logo" target='_blank' href='https://www.linkedin.com/in/chungcurtis/'>
                                        <img
                                            className='linked'
                                            src={linkedInLogo}
                                            alt='linkedInLogo'
                                        />
                                    </a>
                                    <a className="footer-logo" target='_blank' href='https://angel.co/u/curtis-chung'>
                                        <img
                                            className='linked'
                                            src={angelListLogo}
                                            alt='angelListLogo'
                                        />
                                    </a>
                                </span>
                            </div>
                            <div className='bottom-link-list'>
                                <span className="bottom-nav-contacts">
                                    <a className="footer-logo" target='_blank' href='https://curtis-chung.github.io'>
                                        <img
                                            className='linked'
                                            src={pf}
                                            alt='personalPageLogo'
                                        />
                                    </a>
                                    <a className="footer-logo" target='_blank' href='https://github.com/curtis-chung'>
                                        <img
                                            className='linked'
                                            src={gitHubLogo}
                                            alt='linkedInLogo'
                                        />
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-text-box'>
                        <div className="bottom-text-box-header">
                            <span className='bottom-link-titles'>Tech Stack</span>
                            <div className='bottom-link-list business-reviews-bottom-div'>
                                <span>Javascript</span>
                                <span>React</span>
                                <span>Redux</span>
                                <span>Express.js</span>
                                <span>Sequelize</span>
                                <span>PostgreSQL</span>
                                <span>HTML5</span>
                                <span>CSS3</span>
                            </div>
                        </div>
                    </div>
                    <div className='bottom-text-box'>
                        <div className="bottom-text-box-header">
                            <span className='bottom-link-titles'>Language</span>
                            <div className='bottom-link-list business-reviews-bottom-div'>
                                <span>English</span>
                            </div>
                            <span className='bottom-link-titles' style={{ marginTop: "16px" }}>Location</span>
                            <div className='bottom-link-list business-reviews-bottom-div'>
                                <span>New York City</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='bottom-copyright'>
                    <span className='bottom-link-list'
                        style={{ flexDirection: 'row', alignSelf: 'flex-end' }}
                    >© 2022 Ravenhood. All rights reserved.</span>
                </div> */}
            </div>
            <div style={{ width: "95%", maxWidth: "1144px" }}>
                <div className='bottom-copyright'>
                    <span className='bottom-copyright-list'>Copyright © 2022 Be-myguest Inc., an <a style={{ fontWeight: "600", textDecoration: "None", margin: "0 2px", color: "black" }} target='_blank' href='https://www.airbnb.com/'>Airbnb</a> inspired clone by Curtis Chung - All Rights Reserved.</span>
                </div>
            </div>
        </div>
    )
}

export default BottomNav;
