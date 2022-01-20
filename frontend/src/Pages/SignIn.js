import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user.js'
import NavBar from '../Components/Navigation/NavBar.js'
import Button from '../Components/Widgets/Button.js'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function SignIn (props) {

    const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''});
    let handleChange = (e) => {
        
        const isCheckbox = e.target.type === 'checkbox';
        
        setLoginCredentials(curVal => { return {...curVal,
            [e.target.name]: isCheckbox ? e.target.checked : e.target.value
        }});
    };
    
    const dispatch = useDispatch();
    const history = useHistory();
    const verifyCredentials = (e) => {

        axios.post(props.api + '/signin', loginCredentials).then((response) => {

            if ([204, 200].includes(response.status)) {

                dispatch(signIn(response.data));
                history.push('/dashboard');
            }
        }).catch(function (error) {

            console.log(error);
        });
    }

    return (
        <div>
            <NavBar user={props.user} />
            <div className="auth-column">
                <div className="card card-auth rounded">
                    <div className="wrapper">
                        <h3 className="font-bold text-gray-darkest">Sign in</h3>
                        <p>To continue.</p>
                        <div style={{'paddingBottom': '14px'}}>
                            <input type="text" id="email" name="email" placeholder="E-mail" value={loginCredentials.email} onChange={handleChange}/>
                            <input type="password" password id="password" name="password" placeholder="Password" value={loginCredentials.password} onChange={handleChange}/>
                            <br/>
                            <input type="submit" value="Submit" onClick={verifyCredentials} />
                        </div>
                        <Link to="/account-recovery" style={{'fontSize': '.9em'}}>
                            Forgot password?
                        </Link>
                        <p style={{'textAlign': 'center', 'color': '#8A9199CC', 'margin': '14px auto', 'marginTop': '2px'}}>or</p>
                        <Button label="Sign up" color="#4CBF99" link="/sign-up" maxwidth={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}