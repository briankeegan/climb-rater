import React, { Component } from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'


class LogInModal extends Component {
  constructor(props) {
    super()
    this.state = {
      errorMessage: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e, logIn) {
    e.preventDefault()
    const user_name = document.getElementById('log_in_user_name').value
    const password = document.getElementById('log_in_password').value

  // Assuring that form is filled out!
    if ([user_name, password].some(cur => cur === "")) {
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
    logIn(user_name, password)
      .then(chain => {
        if(chain && chain.error) {
          this.setState({
            errorMessage: "Unable to fullfill you request.  Please try again!"
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
        document.querySelector('#log_in_form').reset()

      })
  }

  render() {

  return (
    <div>
        <Modal
        header='Log In'
        trigger={<a href="#portfolio">Log In</a>}>
        <div className="row">
       <form id="log_in_form" className="col s12" onSubmit={(e) => this.onSubmit(e, this.props.logIn)}>

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
          <div className="center">
            <h5 className="red-text">{this.state.errorMessage}</h5>
          </div>
       </form>
     </div>

      </Modal>
  </div>
  )
  }
}

export default LogInModal;
