import React, { Component } from 'react';
import './App.css'
import {Modal, Button, Input} from 'react-materialize'
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
    this.onDelete = this.onDelete.bind(this)
  }

  onDelete () {
    const user = this.props.store.user
    const saveRating = this.props.saveRating
    fetch(`http://localhost:4741/ratings/${saveRating._id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token token=${user.token}`
    }),
       method: 'DELETE'
    })
    .then(res => {
      if (res.status === 204) {
        this.setState({
          successMessage: "Rating deleted"
        })
        setTimeout(() => {
          this.setState({
            successMessage: ""
          })
          document.querySelectorAll('.modal-close').forEach(m =>
            m.click()
          )
          document.querySelector('#rate_climb_form').reset()
        }
        , 800)
      } else {
        this.setErrorMessageState('Unable to process your request.  You shouldn\'t be seeing this... sorry')
      }
    })
    .catch(error =>   this.setErrorMessageState('Unable to process your request.'))
    .then(() => this.props.getSection())

  }

  // store routeId getSection saveRating number color

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
    const grade = document.querySelector('.select-dropdown').value
    const user = this.props.store.user
    const routeId = this.props.routeId

    const saveRating = this.props.saveRating
    // if saveRatings is zero, or grade is default
    const urlExt = saveRating ? `/${saveRating._id}` : ''
    const restful = saveRating ? 'PATCH' : 'POST'
    const success = saveRating ? "Rating updated" : "Thanks for your input!"

    if(!rating || (grade ==="Grade")) {
      return this.setErrorMessageState('All fields required')
    }

    // send http reqeust
    fetch(`http://localhost:4741/ratings${urlExt}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token token=${user.token}`
    }),
       method: restful,
       body: JSON.stringify({
         "rating": {
           "climberGrade": grade,
           "climberRating": rating,
           "_climbingRoute": routeId
         }
       })
    })
      .then(res => {
        if ((res.status === 201) || (res.status === 204)) {
          this.setState({
            successMessage: success
          })
          setTimeout(() => {
            this.setState({
              successMessage: ""
            })
            document.querySelectorAll('.modal-close').forEach(m =>
              m.click()
            )
            document.querySelector('#rate_climb_form').reset()
          }
          , 1300)
        } else {
          this.setErrorMessageState('Unable to process your request.  You shouldn\'t be seeing this... sorry')
        }
      })
      .catch(error =>   this.setErrorMessageState('Unable to process your request.'))
      .then(() => this.props.getSection())

  }

  render() {
    const { saveRating, number, color} = this.props

  return (
    <Modal
    header={`${color.toUpperCase()}: #${number}`}
    trigger={<Button waves='light'>
      {saveRating ? 'Update Rating' : 'Rate Climb'}
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
        <div className="row">
          <Input s={5} type='select' label="What did the route feel like?" defaultValue='0'>
            <option value='0' disabled>Grade</option>
            <option value='5.6'>5.6</option>
            <option value='5.7'>5.7</option>
            <option value='5.8'>5.8</option>
            <option value='5.9'>5.9</option>
            <option value='5.10a'>5.10a</option>
            <option value='5.10b'>5.10b</option>
            <option value='5.10c'>5.10c</option>
            <option value='5.10d'>5.10d</option>
            <option value='5.11a'>5.11a</option>
            <option value='5.11b'>5.11b</option>
            <option value='5.11c'>5.11c</option>
            <option value='5.11d'>5.11d</option>
            <option value='5.12a'>5.12a</option>
            <option value='5.12b'>5.12b</option>
            <option value='5.12c'>5.12c</option>
            <option value='5.12d'>5.12d</option>
            <option value='5.13a'>5.13a</option>
            <option value='5.13b'>5.13b</option>
            <option value='5.13c'>5.13c</option>
            <option value='5.13d'>5.13d</option>
            <option value='5.14a'>5.14a</option>
            <option value='5.14b'>5.14b</option>
            <option value='5.14c'>5.14c</option>
            <option value='5.14d'>5.14d</option>
            <option value='5.15'>5.15</option>

          </Input>
        </div>

        <div className="center">
          <h5 className="red-text">{this.state.errorMessage}</h5>
        </div>
        <div className="center">
          <h5 className="green-text">{this.state.successMessage}</h5>
        </div>
        <Button waves='light'>
          {saveRating ? 'Update!' : 'Submit!'}
         </Button>

         {saveRating &&
           (
             <Button type="button" className="red right" waves='light' onClick={this.onDelete}>
               Delete Rating
              </Button>
           )
         }
      </form>
 </div>

  </Modal>
)}
}

export default RateClimbModal;
