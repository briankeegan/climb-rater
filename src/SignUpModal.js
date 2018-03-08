import React from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'

const onSubmit = (e, signUp) => {
  e.preventDefault()
  const user_name = document.getElementById('sign_up_user_name').value
  const password = document.getElementById('sign_up_password').value
  const password_retype = document.getElementById('sign_up_password_retype').value

// Assuring that form is filled out!
  if ([user_name, password, password_retype].some(cur => cur === "")) return
  // checking for matching passwords
  if (password !== password_retype) return console.log('retype password!')
  signUp(user_name, password)
    .then(res => res.json())
    .then(myJson => {
      if (myJson.error) return console.log(myJson.error)
      document.querySelectorAll('.modal-close').forEach(m =>
        m.click()
      )
      document.querySelector('#sign_up_form').reset()
    })
    .catch(error => console.error('Error:', error))

}

const  SignUpModal = ( {signUp} ) => {
  return (
    <Modal
    header='Sign Up'
    trigger={<a href="#portfolio">Sign Up</a>}>
    <div className="row">
   <form id="sign_up_form" className="col s12" onSubmit={(e) => onSubmit(e, signUp)}>

     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="sign_up_user_name" type="text" className="validate" require="true" />
         <label htmlFor="sign_up_user_name">User Name</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="sign_up_password" type="password" className="validate" require="true" />
         <label htmlFor="sign_up_password">Password</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="sign_up_password_retype" type="password" className="validate" require="true"/>
         <label htmlFor="sign_up_password_retype">Retype Password</label>
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

export default SignUpModal;
