import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'

const  Nav = ( { signUp, logIn } ) => {

  return (
    <div className="navbar navbar-fixed scrollspy">
      <nav className="teal darken-2">
        <div className="container">
          <div className="nav-wrapper">
              <Link to="/" className="brand-name" >Climb Rater</Link>
            <ul className="right">
              <li><SignUpModal signUp={signUp}/></li>
              <li><LogInModal logIn={logIn}/></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
