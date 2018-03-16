import React, { Component } from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'
import setErrorMessageState from './SetErrorMessageState'

class ChangePWModal extends Component {
  constructor(props) {
    super()
    this.state = {
      errorMessage: '',
      successMessage: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.setErrorMessageState = setErrorMessageState.bind(this)
  }


  onSubmit (e) {
    e.preventDefault()
    const password_old = document.getElementById('change_pw_password_old').value
    const password = document.getElementById('change_pw_password').value
    const password_retype = document.getElementById('change_pw_password_retype').value
    const user = this.props.store.user
  // Assuring that form is filled out!
  if ([password_old, password, password_retype].some(cur => cur === "")) {
    return this.setErrorMessageState('No blank fields allowed.')
  }
    // checking for matching passwords
    if (password !== password_retype) {
      return this.setErrorMessageState('Passwords don\'t match.')
    }

    // send http reqeust
    fetch(`http://localhost:4741/change-password/${user.id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token token=${user.token}`
    }),
       method: 'PATCH',
       body: JSON.stringify({
         "passwords": {
           "old": password_old,
           "new": password
         }
       })
    })
      .then(res => {
        if (res.status === 204) {
          this.setState({
            successMessage: "Successfully Changed Password!"
          })
          setTimeout(() => {
            this.setState({
              successMessage: ""
            })
            document.querySelectorAll('.modal-close').forEach(m =>
              m.click()
            )
            document.querySelector('#change_pw_form').reset()
          }
          , 1000)
          return true
        } else {
          this.setErrorMessageState('Unable to process your request.  Maybe you mistyped your password?')
        }
      })
      .catch(error =>   this.setErrorMessageState('Unable to process your request.'))

  }

  render() {
  return (
    <Modal
    header='Change Password'
    trigger={<li><a href="#portfolio">Change PW</a></li>}>

   <form id="change_pw_form" className="col s12" onSubmit={this.onSubmit}>

   <div className="row">
     <div className="input-field col m8 offset-m2">
       <input id="change_pw_password_old" type="password" className="validate" required="true" />
       <label htmlFor="change_pw_password_old">Old Password</label>
     </div>
   </div>
     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="change_pw_password" type="password" className="validate" required="true" />
         <label htmlFor="change_pw_password">New Password</label>
       </div>
     </div>
     <div className="row">
       <div className="input-field col m8 offset-m2">
         <input id="change_pw_password_retype" type="password" className="validate" required="true"/>
         <label htmlFor="change_pw_password_retype">Retype New Password</label>
       </div>
     </div>
      <div className="center">
        <h5 className="red-text">{this.state.errorMessage}</h5>
      </div>
      <div className="center">
        <h5 className="green-text">{this.state.successMessage}</h5>
      </div>
      <Button waves='light'>
        Submit!
       </Button>
   </form>

  </Modal>
)}
}

export default ChangePWModal;
