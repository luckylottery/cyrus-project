import React from 'react'

import NavBar from '../Components/Navigation/NavBar.js'
import Message from '../Components/Widgets/Message.js'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

export default class SignUp extends React.Component {

    state = {
        username: '',
        email: '',
        email2: '',
        password: '',
        password2: ''
    };

    errors = [];

    handleChange = (e) => {

        const isCheckbox = e.target.type === 'checkbox';
        this.setState({
          [e.target.name]: isCheckbox
            ? e.target.checked
            : e.target.value
        });
    };

    // Yoinked from StackOverflow
    validateEmail = (email) => {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validate = () => {

        if (!this.state.username) {
            
            this.errors.push({
                'type': 'username',
                'text': 'Username cannot be blank'
            });
        }

        if (this.state.username.length < 3) {

            this.errors.push({
                'type': 'username',
                'text': 'Username must be between 3 and 16 characters long'
            });
        }

        if (!this.validateEmail(this.state.email)) {

            this.errors.push({
                'type': 'email',
                'text': 'Invalid email'
            });
        }

        if (this.state.email !== this.state.email2) {

            this.errors.push({
                'type': 'email',
                'text': 'Emails do not match'
            });  
        }

        if (this.state.password.length < 8 || !/\d/.test(this.state.password)) {

            this.errors.push({
                'type': 'password',
                'text': 'Password must be between 8 and 36 characters long and include at least one number'
            });
        }

        if (this.state.password !== this.state.password2) {

            this.errors.push({
                'type': 'password',
                'text': 'Passwords do not match'
            });  
        }

        if (this.errors.length) {

            this.setState();
            return false;
        }

        return true;
    };

    signUp = (e) => {

        e.preventDefault();
        
        // Clear old errors before validating again
        this.errors = [];

        const isValid = this.validate();
        this.setState(this.errors);

        if (isValid) {

            axios.post(this.props.api + '/signup', this.state).then(function (response) {

                if (response.status in [204, 200]) {

                    <Redirect to='/sign-in' />
                }
            }).catch(function (error) {

                console.log(error);
            });

            this.errors = [];

            // Clear the form
            let cleared = {};
            for (const property in this.state) {

                cleared[property] = '';
            }
            
            this.setState(cleared);
        }
    }

    render () {

        return (
            <div>
                <NavBar/>
                <div className="auth-column">
                    <div className="card card-auth rounded">
                        <div className="wrapper">
                            <h3>Sign up</h3>
                            <p>It’s quick and simple.</p>
                            <div style={{color: "red" }}>
                                {this.errors.map(error => {

                                    return (
                                        <Message text={error.text} key={error.text} color="#F07171" />
                                    )
                                })}
                            </div>
                            <div id="registration-form" style={{'paddingBottom': '12px'}}>
                                <input type="text" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                                <input type="text" id="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleChange} />
                                <input type="text" id="email-2" name="email2" placeholder="Confirm e-mail" value={this.state.email2} onChange={this.handleChange} />
                                <input type="password" password id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                <input type="password" password id="password-2" name="password2" placeholder="Confirm password" value={this.state.password2} onChange={this.handleChange} />
                                <br/>
                                <input type="submit" value="Submit" onClick={this.signUp}/>
                            </div>
                            <Link to="/sign-in" style={{'fontSize': '.9em'}}>
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
