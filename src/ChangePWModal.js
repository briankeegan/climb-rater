import React, { Component } from 'react'
import './App.css'
import {Modal, Button} from 'react-materialize'
import setErrorMessageState from './SetErrorMessageState'

class ChangePWModal extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: '',
      successMessage: '',
      password_old: '',
      password: '',
      password_retype: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.setErrorMessageState = setErrorMessageState.bind(this)
  }


  onSubmit (e) {
    e.preventDefault()
    const { password_old, password, password_retype } = this.state
    const user = this.props.store.user
    // Assuring that form is filled out!
    if ([password_old, password, password_retype].some(cur => cur === '')) {
      return this.setErrorMessageState('No blank fields allowed.')
    }
    // checking for matching passwords
    if (password !== password_retype) {
      return this.setErrorMessageState('Passwords don\'t match.')
    }

    // send http reqeust
    fetch(`https://climb-rater-api-development.herokuapp.com/change-password/${user.id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token token=${user.token}`
      }),
      method: 'PATCH',
      body: JSON.stringify({
        'passwords': {
          'old': password_old,
          'new': password
        }
      })
    })
      .then(res => {
        if (res.status === 204) {
          this.setState({
            successMessage: 'Successfully Changed Password!'
          })
          setTimeout(() => {
            this.setState({
              successMessage: ''
            })
            document.querySelectorAll('.modal-close').forEach(m =>
              m.click()
            )
            document.querySelector('#change_pw_form').reset()
            this.setState({
              password_old: '',
              password: '',
              password_retype: ''
            })
          }
            , 350)
          return true
        } else {
          this.setErrorMessageState('Unable to process your request.  Maybe you mistyped your password?')
          document.querySelector('#change_pw_form').reset()
          this.setState({
            password_old: '',
            password: '',
            password_retype: ''
          })
        }
      })
      .catch(() => this.setErrorMessageState('Unable to process your request.'))

  }

  render() {
    const { password_old, password, password_retype } = this.state
    return (
      <Modal
        header='Change Password'
        trigger={<li><a href="#portfolio">Change PW</a></li>}>
        <form id="change_pw_form" className="col s12" onSubmit={this.onSubmit}>

          <div className="row">
            <div className="input-field col m8 offset-m2">
              <input id="change_pw_password_old" type="password" className="validate" required="true" value={password_old} onChange={(e) => this.setState({ password_old: e.target.value })}/>
              <label htmlFor="change_pw_password_old">Old Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m8 offset-m2">
              <input id="change_pw_password" type="password" className="validate" required="true" value={password} onChange={(e) => this.setState({ password: e.target.value })}/>
              <label htmlFor="change_pw_password">New Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m8 offset-m2">
              <input id="change_pw_password_retype" type="password" className="validate" required="true" value={password_retype} onChange={(e) => this.setState({ password_retype: e.target.value })}/>
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

export default ChangePWModal
