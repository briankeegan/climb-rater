import React, { Component } from 'react';
import './App.css'
import {Modal, Button} from 'react-materialize'
import setErrorMessageState from './SetErrorMessageState'

class RateClimbModal extends Component {
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
    const carabiners = document.getElementsByName('carabiners')
    let rating = 0;
    for (let i = 0; i < carabiners.length; i++) {
      if (carabiners[i].checked) {
        rating += +carabiners[i].value
        break
      }
    }
    console.log(rating)
  //   const password_old = document.getElementById('rate_climb_password_old').value
  //   const password = document.getElementById('rate_climb_password').value
  //   const password_retype = document.getElementById('rate_climb_password_retype').value
  //   const user = this.props.store.user
  // // Assuring that form is filled out!
  // if ([password_old, password, password_retype].some(cur => cur === "")) {
  //   return this.setErrorMessageState('No blank fields allowed.')
  // }
  //   // checking for matching passwords
  //   if (password !== password_retype) {
  //     return this.setErrorMessageState('Passwords don\'t match.')
  //   }
  //
  //   // send http reqeust
  //   fetch(`http://localhost:4741/change-password/${user.id}`, {
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token token=${user.token}`
  //   }),
  //      method: 'PATCH',
  //      body: JSON.stringify({
  //        "passwords": {
  //          "old": password_old,
  //          "new": password
  //        }
  //      })
  //   })
  //     .then(res => {
  //       if (res.status === 204) {
  //         this.setState({
  //           successMessage: "Successfully Changed Password!"
  //         })
  //         setTimeout(() => {
  //           this.setState({
  //             successMessage: ""
  //           })
  //           document.querySelectorAll('.modal-close').forEach(m =>
  //             m.click()
  //           )
  //           document.querySelector('#rate_climb_form').reset()
  //         }
  //         , 1000)
  //         return true
  //       } else {
  //         this.setErrorMessageState('Unable to process your request.  Maybe you mistyped your password?')
  //       }
  //     })
  //     .catch(error =>   this.setErrorMessageState('Unable to process your request.'))

  }

  render() {
  return (
    <Modal
    header='RED: #2010'
    trigger={<Button waves='light'>
      Rate Climb
     </Button>}>
    <div className="row">
   <form id="rate_climb_form" className="col s12" onSubmit={this.onSubmit}>
   <h5 className="center">How was the Route?</h5>
   <div className="row">
      <div>
        <input name="carabiners" value="1" type="radio" id="rate1" />
        <label htmlFor="rate1">1</label>

        <input name="carabiners" value="2" type="radio" id="rate2" />
        <label htmlFor="rate2">2</label>

        <input name="carabiners" value="3" type="radio" id="rate3" />
        <label htmlFor="rate3">3</label>

        <input name="carabiners" value="4" type="radio" id="rate4" />
        <label htmlFor="rate4">4</label>

        <input name="carabiners" value="5" type="radio" id="rate5" />
        <label htmlFor="rate5">5</label>
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

export default RateClimbModal;
