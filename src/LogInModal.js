import React, { Component } from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'
import setErrorMessageState from './SetErrorMessageState'


class LogInModal extends Component {
  constructor(props) {
    super()
    this.state = {
      errorMessage: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.setErrorMessageState = setErrorMessageState.bind(this)
  }

  onSubmit(e, setUserState) {
    e.preventDefault()
    // get values from form
    const user_name = document.getElementById('log_in_user_name').value
    const password = document.getElementById('log_in_password').value

  // Assuring that form is filled out!
    if ([user_name, password].some(cur => cur === "")) {
      return this.setErrorMessageState('No blank fields allowed.')
    }

    fetch(`https://climb-rater-api.herokuapp.com/sign-in`, {
      headers: new Headers({
      'Content-Type': 'application/json'
    }),
       method: 'POST',
       body: JSON.stringify({
         "credentials": {
           "email": user_name,
           "password":  password
         }
       })
    })
    .then(res => res.json())
    .then(myJson =>  {
      if (myJson.error)
      return this.setErrorMessageState('Unable to process your request.  Please try again!')
      document.querySelectorAll('.modal-close').forEach(m =>
        m.click()
      )
      document.querySelector('#log_in_form').reset()
      return myJson
    })
    .then(setUserState)
    .catch(error => error)
  }

  render() {

  return (
    <div>
        <Modal
        header='Log In'
        trigger={<a href="#portfolio">Log In</a>}>
        <div className="row">
       <form id="log_in_form" className="col s12" onSubmit={(e) => this.onSubmit(e, this.props.setUserState)}>

         <div className="row">
           <div className="input-field col m8 offset-m2">
             <input id="log_in_user_name" type="text" className="validate" required="true" />
             <label htmlFor="log_in_user_name">User Name</label>
           </div>
         </div>
         <div className="row">
           <div className="input-field col m8 offset-m2">
             <input id="log_in_password" type="password" className="validate" required="true" />
             <label htmlFor="log_in_password">Password</label>
           </div>
         </div>

          <div className="center">
            <h5 className="red-text">{this.state.errorMessage}</h5>
          </div>
          <Button waves='light'>
            Submit!
           </Button>
       </form>
     </div>

      </Modal>
  </div>
  )
  }
}

export default LogInModal;
