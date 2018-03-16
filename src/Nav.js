import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'
import Account from './Account'


const  Nav = ( { user, setUserState } ) => {
  console.log(user)
  return (
    <div className="navbar navbar-fixed scrollspy">
      <nav className="teal darken-2">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-name" >Climb Rater</Link>
            <ul className="left">
              <li>
              <Link to="/" className="brand-name" >
                <i className="material-icons">home</i>
              </Link>
              </li>

            </ul>
            <ul className="right">
            {user
            ?
            (
              <div>
                <li>
                <Account
                  user={user}
                  setUserState={setUserState}
                />
                </li>
              </div>
            )
            :
            (
              <div>
                <li><SignUpModal setUserState={setUserState}/></li>
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
