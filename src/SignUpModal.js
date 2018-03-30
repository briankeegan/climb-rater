import React, { Component } from 'react'
import './App.css'
import {Modal, Button} from 'react-materialize'
import setErrorMessageState from './SetErrorMessageState'

class SignUpModal extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: '',
      successMessage: '',
      user_name: '',
      password: '',
      password_retype: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.setErrorMessageState = setErrorMessageState.bind(this)
  }


  onSubmit (e) {
    e.preventDefault()
    const { user_name, password, password_retype } = this.state

    // Assuring that form is filled out!
    if ([user_name, password, password_retype].some(cur => cur === '')) {
      return this.setErrorMessageState('No blank fields allowed.')
    }
    // checking for matching passwords
    if (password !== password_retype) {
      return this.setErrorMessageState('Passwords don\'t match.')
    }
    // send http reqeust, regardless of success or failure reset data (incase offline)
    fetch('https://climb-rater-api-development.herokuapp.com/sign-up', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({
        'credentials': {
          'email': user_name,
          'password': password
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
        this.setState({
          user_name: '',
          password: '',
          password_retype: ''
        })
        return myJson
      })
      .then(this.props.setUserState)
      .catch(error => error)
  }

  render() {
    const { user_name, password, password_retype } = this.state
    return (
      <Modal
        header='Sign Up'
        trigger={<a href="#portfolio">Sign Up</a>}>
        <div className="row">
          <form id="sign_up_form" className="col s12" onSubmit={this.onSubmit}>

            <div className="row">
              <div className="input-field col m8 offset-m2">
                <input id="sign_up_user_name" type="text" className="validate" required="true" value={user_name} onChange={(e) => this.setState({ user_name: e.target.value })} />
                <label htmlFor="sign_up_user_name">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col m8 offset-m2">
                <input id="sign_up_password" type="password" className="validate" required="true" value={password} onChange={(e) => this.setState({ password: e.target.value })}/>
                <label htmlFor="sign_up_password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col m8 offset-m2">
                <input id="sign_up_password_retype" type="password" className="validate" required="true" value={password_retype} onChange={(e) => this.setState({ password_retype: e.target.value })}/>
                <label htmlFor="sign_up_password_retype">Retype Password</label>
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
        </div>

      </Modal>
    )}
}

export default SignUpModal
