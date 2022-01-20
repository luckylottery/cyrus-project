import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer () {

    return (
        <footer className="constrain">
            <ul className="constrain border-t border-gray-light">
                <li>
                    <ul>
                        <li>
                            <img placeholder="math banana logo" className="w-10 h-10 mb-1" src="/logo192_grayscale.png"/>
                            © Math Banana, 2021
                            <br/>
                            All rights reserved
                            <br/>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>
                            <span>Company</span>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        <li>
                            <Link to='/tutor'>Become a tutor</Link>
                        </li>
                        <li>
                            <Link to='/legal'>Legal</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>
                            <span>Quick links</span>
                        </li>
                        <li>
                            <Link to='/categories' >Categories</Link>
                        </li>
                        <li>
                            <Link to='/questions' >Latest questions</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </footer>
    )
}
