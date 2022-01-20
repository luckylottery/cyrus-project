import React from 'react'
import { NavLink } from 'react-router-dom'
import Advert from '../Widgets/Advert.js'

export default function Content (props) {

    const pathName = window.location.pathname;

    return (
        <div className="content constrain">
            <div className="subnavigation">
                <ul>
                    <li>
                        <NavLink to="/dashboard" activeClassName='is-active'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"/></svg>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/pi-club" className="pi-club-hover-special" activeClassName='is-active'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
                                <text className="font-bold" x="50%" y="50%" fontSize="1.75em" dominantBaseline="middle" textAnchor="middle">
                                    𝜋
                                </text>
                            </svg>
                            Pi Club
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/questions" activeClassName='is-active'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z"/></svg>
                            Questions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tags" activeClassName='is-active'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#399EE6"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
                            Tags
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/articles" activeClassName='is-active'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66l-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z"/></svg>
                            Lessons
                        </NavLink>
                    </li>
                </ul>
                {
                    (pathName !== '/pi-club') ?
                        <>
                            <Advert ads={props.ads} />
                        </>
                    :
                        null
                }
            </div>
            <div className="content-text">
                {
                    (props.title) ?
                        <h1 className="text-royal-blue-dark">
                            { props.title }
                        </h1>
                    :
                        null
                }
                <div className="wrapper">
                    <div>
                        <div>{props.content}</div>
                    </div>
                    <div>
                        { props.sidebar }
                    </div>
                </div>
            </div>
        </div>
    )
}
