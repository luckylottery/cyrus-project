import React, { useState } from 'react';
import Button from './Button.js';
import { selectUser } from '../../redux/user';
import ProfileImageGenerator from './ProfileImageGenerator.js';
import { Link } from 'react-router-dom';
import { signOut } from '../../redux/user.js';
import { useSelector, useDispatch } from 'react-redux';

export default function UserActions (props) {

    const user = useSelector(selectUser);
    const [menuState, setMenuState] = useState(false);
    const dispatch = useDispatch();
    const pathName = window.location.pathname;

    function truncateString (str, num) {

        if (str.length > num) {

            return str.slice(0, num) + "...";
        } else {

            return str;
        }
    }

    if (Object.keys(user).length > 1) {

        return (
            <div className={`user-actions ${(pathName === '/pi-club') ? 'w-full' : null}`}>
                <ProfileImageGenerator onClick={() => setMenuState(prevState => !prevState)} username={user.username} uuid={user.uuid} size={38} />
                {menuState && 
                
                    <div className="user-menu rounded text-center">
                        <ProfileImageGenerator className="align-top" username={user.username} uuid={user.uuid} size={44} />
                        <div className="inline-block mt-3.5" style={{'verticalAlign': 'top'}}>
                            <Link to={`users/@${user.username}#${user.tag}`} className="selectable font-semibold text-sm w-auto text-left text-blue-light">
                                @{truncateString(user.username, 16)}
                            </Link>
                            <br/>
                            <p className="selectable w-auto text-sm text-gray-dark">{truncateString(user.email, 28)}</p>
                        </div>
                        <div className="w-11/12 h-px mx-3 mb-0 pb-0 bg-gray-light mt-3"></div>
                        <ul className="quick-actions grid grid-cols-4 w-full mx-auto mt-0.25">
                            <Link className="text-center text-gray-dark" to="/settings" style={{'fontSize': '.9em'}}>
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M19.5,12c0-0.23-0.01-0.45-0.03-0.68l1.86-1.41c0.4-0.3,0.51-0.86,0.26-1.3l-1.87-3.23c-0.25-0.44-0.79-0.62-1.25-0.42 l-2.15,0.91c-0.37-0.26-0.76-0.49-1.17-0.68l-0.29-2.31C14.8,2.38,14.37,2,13.87,2h-3.73C9.63,2,9.2,2.38,9.14,2.88L8.85,5.19 c-0.41,0.19-0.8,0.42-1.17,0.68L5.53,4.96c-0.46-0.2-1-0.02-1.25,0.42L2.41,8.62c-0.25,0.44-0.14,0.99,0.26,1.3l1.86,1.41 C4.51,11.55,4.5,11.77,4.5,12s0.01,0.45,0.03,0.68l-1.86,1.41c-0.4,0.3-0.51,0.86-0.26,1.3l1.87,3.23c0.25,0.44,0.79,0.62,1.25,0.42 l2.15-0.91c0.37,0.26,0.76,0.49,1.17,0.68l0.29,2.31C9.2,21.62,9.63,22,10.13,22h3.73c0.5,0,0.93-0.38,0.99-0.88l0.29-2.31 c0.41-0.19,0.8-0.42,1.17-0.68l2.15,0.91c0.46,0.2,1,0.02,1.25-0.42l1.87-3.23c0.25-0.44,0.14-0.99-0.26-1.3l-1.86-1.41 C19.49,12.45,19.5,12.23,19.5,12z M12.04,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.97,15.5,12.04,15.5z"/></svg>
                            </Link>
                            <Link to={'users/@' + user.username} className="text-center text-gray-dark" style={{'fontSize': '.9em'}}>
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                            </Link>
                            <Link to="/help" className="text-center text-gray-dark" style={{'fontSize': '.9em'}}>
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88c.43-1.47 1.68-2.59 3.23-2.83 1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z"/></svg>
                            </Link>
                            <a onClick={() => dispatch(signOut)} className="text-center text-red-300" style={{'fontSize': '.9em'}}>
                                <svg className="fill-current" zxmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M5,5h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h6c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H5V5z"/><path d="M20.65,11.65l-2.79-2.79C17.54,8.54,17,8.76,17,9.21V11h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7v1.79 c0,0.45,0.54,0.67,0.85,0.35l2.79-2.79C20.84,12.16,20.84,11.84,20.65,11.65z"/></g></g></svg>
                            </a>
                        </ul>
                    </div>
                }
            </div>
        )
    }

    return (
        <ul className="user-actions">
            <li>
                <Button link={'/sign-in'} label={"Sign in"} solid={true} background="#035BD612"/>
            </li>
        </ul>
    )
}
