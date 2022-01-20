import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, signIn } from './redux/user.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Page component imports
import IndexPage from './Pages/Index.js'
import HomePage from './Pages/Dashboard.js'
import PiClubPage from './Pages/Shop.js'
import QuestionPage from './Pages/Questions/Question.js'
import QuestionsPage from './Pages/Questions/Questions.js'
import AskQuestion from './Pages/Questions/Ask.js'
import UserPageIndex from './Pages/Users/User/Index.js'
import UsersPage from './Pages/Users.js'
import TagPage from './Pages/Tag.js'
import TagsPage from './Pages/Tags.js'
import SignInPage from './Pages/SignIn.js'
import SignUpPage from './Pages/SignUp.js'
import PageNotFound from './Pages/PageNotFound.js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_STojlHKZ08Jnrp92YcUWLT6e00kRQG8VGn');

function App () {

  const here = 'https://localhost:3000';
  const pay = 'http://localhost:5000/pay';
  const api = 'http://localhost:5000/api';
  const ads = 'http://localhost:5000/ads';

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');

  // Automatic JWT "login" to keep user data persistent across page refreshes 
  if (!Object.values(user).length &&
      (typeof window !== 'undefined') &&
      (typeof localStorage.getItem('token') !== 'undefined' &&
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token') !== 'undefined')
     ) {

    let token = localStorage.getItem('token');

    axios.get(`${api}/users/me`, {'headers': {'Authorization': `Bearer ${token}`}})
    .then(function (response) {

      if ([204, 200].includes(response.status)) {

        dispatch(signIn(response.data));
      }
    })
    .catch(function (error) {

        console.log(error);
    });
  }

  return (
    <div>
      <div className="page">
        <Router>
          <Switch>
            <Route path="/" exact>
              <IndexPage here={here} ads={ads} api={api} />
            </Route>

            <Route path="/dashboard" exact>
              <HomePage here={here} ads={ads} api={api} user={user} />
            </Route>

            <Route path="/pi-club" exact>
              <PiClubPage here={here} ads={ads} api={api} pay={pay} user={user} />
            </Route>

            <Route path="/sign-in">
              <SignInPage here={here} ads={ads} api={api} user={user} />
            </Route>

            <Route path="/sign-up">
              <SignUpPage here={here} ads={ads} api={api} />
            </Route>

            <Route exact path="/questions">
              <QuestionsPage here={here} ads={ads} api={api} />
            </Route>

            <Route exact path="/questions/ask">
              <AskQuestion here={here} ads={ads} api={api} />
            </Route>

            <Route exact path="/questions/:slug">
              <QuestionPage here={here} ads={ads} api={api} />
            </Route>

            <Route path="/users" exact component={UsersPage} here={here} ads={ads} api={api} />
            <Route path="/users/:username" component={UserPageIndex} here={here} ads={ads} api={api} />

            <Route exact path="/tags">
              <TagsPage here={here} ads={ads} api={api} />
            </Route>

            <Route path="/tags" component={TagPage} here={here} ads={ads} api={api} />
            <Route component={PageNotFound}/>
          </Switch>
        </Router>
      </div>
      <div className="pixels"></div>
    </div>
  );
}

export default App;