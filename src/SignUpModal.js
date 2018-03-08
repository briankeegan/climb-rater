import React, { Component } from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'

class SignUpModal extends Component {
  constructor(props) {
    super()
    this.state = {
      errorMessage: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (e, signUp) {
    e.preventDefault()
    const user_name = document.getElementById('sign_up_user_name').value
    const password = document.getElementById('sign_up_password').value
    const password_retype = document.getElementById('sign_up_password_retype').value

  // Assuring that form is filled out!
    if ([user_name, password, password_retype].some(cur => cur === "")) {
      this.setState({
        errorMessage: "No blank fields allowed."
      })
      setTimeout(() => {
        this.setState({
          errorMessage: ""
        })
      }
      , 1500)
      return
    }
    // checking for matching passwords
    if (password !== password_retype) {
      this.setState({
        errorMessage: "Passwords Don't match!"
      })
      setTimeout(() => {
        this.setState({
          errorMessage: ""
        })
      }
      , 1500)
      return
    }
    signUp(user_name, password)
      .then(res => res.json())
      .then(myJson => {
        if (myJson.error) {
          this.setState({
            errorMessage: "Unable to fullfill you request.  User name possibly taken."
          })
          setTimeout(() => {
            this.setState({
              errorMessage: ""
            })
          }
          , 1500)
          return
        }
        document.querySelectorAll('.modal-close').forEach(m =>
          m.click()
        )
        document.querySelector('#sign_up_form').reset()
      })
      .catch(error => console.error('Error:', error))

  }

  render() {
  return (
    <Modal
    header='Sign Up'
    trigger={<a href="#portfolio">Sign Up</a>}>
    <div className="row">
   <form id="sign_up_form" className="col s12" onSubmit={(e) => this.onSubmit(e, this.props.signUp)}>

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
      <div className="center">
        <h5 className="red-text">{this.state.errorMessage}</h5>
      </div>
   </form>
 </div>

  </Modal>
)}
}

export default SignUpModal;
