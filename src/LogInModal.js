import React from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'

const onSubmit = (e, logIn) => {
  e.preventDefault()
  const user_name = document.getElementById('log_in_user_name').value
  const password = document.getElementById('log_in_password').value

// Assuring that form is filled out!
  if ([user_name, password].some(cur => cur === "")) return
  // checking for matching passwords
  logIn(user_name, password)
    .then(chain => {
      if(chain.error) return console.log(chain)
      document.querySelectorAll('.modal-close').forEach(m =>
        m.click()
      )
      document.querySelector('#log_in_form').reset()
      console.log(this)
    })
}

const  LogInModal = ( {logIn} ) => {
  return (
    <Modal
    header='Log In'
    trigger={<a href="#portfolio">Log In</a>}>
    <div className="row">
   <form id="log_in_form" className="col s12" onSubmit={(e) => onSubmit(e, logIn)}>

     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="log_in_user_name" type="text" className="validate" require="true" />
         <label htmlFor="log_in_user_name">User Name</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="log_in_password" type="password" className="validate" require="true" />
         <label htmlFor="log_in_password">Password</label>
       </div>
     </div>
     <Button waves='light'>
       Submit!
      </Button>
   </form>
 </div>

  </Modal>
  )
}

export default LogInModal;
