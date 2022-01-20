import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Components/Navigation/NavBar.js';
import Footer from '../Components/Navigation/Footer.js';
import Content from '../Components/Layouts/Content.js';
import SiteActivity from '../Components/Widgets/Panels/SiteActivity.js';
import Balance from '../Components/Widgets/Panels/Balance.js';
import IncomeGraph from '../Components/Widgets/Panels/IncomeGraph.js';
import 'katex/dist/katex.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user.js';
import Button from '../Components/Widgets/Button.js';

export default function Home (props) {

    const user = useSelector(selectUser);

    useEffect(() => {

    }, []);

    const pageSidebar = (
        <>
            <svg data-tip="Enable instant email alerts" className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 18.69L7.84 6.14 5.27 3.49 4 4.76l2.8 2.8v.01c-.52.99-.8 2.16-.8 3.42v5l-2 2v1h13.73l2 2L21 19.72l-1-1.03zM12 22c1.11 0 2-.89 2-2h-4c0 1.11.89 2 2 2zm6-7.32V11c0-3.08-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68c-.15.03-.29.08-.42.12-.1.03-.2.07-.3.11h-.01c-.01 0-.01 0-.02.01-.23.09-.46.2-.68.31 0 0-.01 0-.01.01L18 14.68z"/></svg>
            <svg data-tip="Disable email alerts" className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42zM18 11c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2v-5zm-6 11c.14 0 .27-.01.4-.04.65-.14 1.18-.58 1.44-1.18.1-.24.15-.5.15-.78h-4c.01 1.1.9 2 2.01 2z"/></svg>
        </>
    )
    
    const pageContent = (
        <>
            <div className="w-full dashboard-main">
                <Balance api={props.api} />
                <IncomeGraph api={props.api} />
                <SiteActivity className="col-span-2" api={props.api} />
            </div>
            <div className="w-full">
                <p className="section-title mt-4">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74z"/></svg>
                        Recent activity
                    </span>
                </p>
            </div>
        </>
    )

    const pageTitle = (
        <p>
            <span className="highlight-yellow">
                Dashboard
            </span>
            <Button link={'/questions/ask'} label={"Ask a question"} solid={true} background="#EDF2FD"/>
        </p>
    )

    return (
        <div>
            <NavBar here={props.here} user={props.user} />
            <Content ads={props.ads} title={pageTitle} content={pageContent} sidebar={pageSidebar} />
            <Footer />
        </div>
    )
}
