import React from 'react';
import './App.css'
import { Link } from 'react-router-dom'
import SignUpModal from './SignUpModal'
import LogInModal from './LogInModal'
import ChangePWModal from './ChangePWModal'
import LogOut from './LogOut'

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
                <li><ChangePWModal store={user}/></li>
                <li>
                  <LogOut
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
