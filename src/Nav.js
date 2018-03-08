import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'

const  Nav = ( { user, setUserState } ) => {
  return (
    <div className="navbar navbar-fixed scrollspy">
      <nav className="teal darken-2">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-name" >Climb Rater</Link>
            <ul className="right">
            {user
            ?
            (
              <div>
                <li>{user.user.email}</li>
                <li></li>
              </div>
            )
            :
            (
              <div>
                <li><SignUpModal /></li>
                <li><LogInModal setUserState={setUserState}/></li>
              </div>
            )
            }
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav;
