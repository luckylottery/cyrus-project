import React from 'react'
import UserActions from '../Widgets/UserActions.js'
import SearchBox from '../Widgets/SearchBox.js'
import { Link}  from 'react-router-dom'
import { selectUser } from '../../redux/user.js'
import { useSelector } from 'react-redux'

export default function NavBar (props) {

    const pathName = window.location.pathname
    const user = useSelector(selectUser);

    return (
        <>
            <nav>
                <div className="constrain">
                    <Link to="/" className="logo">
                        <h2 className="rounded text-royal-blue-dark">
                            <img placeholder="math banana logo" src="/logo192.png"/>
                            <span>
                                math&nbsp;
                                <b className="text-golden-yellow-dark">
                                    banana
                                </b>
                            </span>
                        </h2>
                    </Link>
                    {
                        (pathName === '/') ?
                            <Link to="/questions" className="btn btn-blue">
                                Questions
                            </Link>
                        :
                            null
                    }
                    {
                        (pathName !== '/pi-club') ?
                            <SearchBox />
                        :
                            null
                    }
                    { 
                        //(Object.keys(user).length && pathName !== '/gold') ?
                        (false) ?
                            <Link to="/pi-club" className="btn btn-gold whitespace-nowrap">
                                Get gold
                            </Link>
                        :
                            null
                    }
                    <UserActions here={props.here} user={props.user} />
                </div>
            </nav>
            <div className="banner" style={(pathName === '/') ? {'backgroundColor': '#fff'} : null}>
            </div>
        </>
    )
}
