import React from 'react';
import {Dropdown} from 'react-materialize'
import ChangePWModal from './ChangePWModal'
import LogOut from './LogOut'

const Account = ( { user, setUserState } ) => (
  <Dropdown trigger={
      <a>Account<i className="material-icons right">arrow_drop_down</i></a>
    }>
    <ChangePWModal store={user}/>
      <li className="divider"></li>
    <li>
      <LogOut
        user={user}
        setUserState={setUserState}
      />
    </li>
  </Dropdown>
)

export default Account;
