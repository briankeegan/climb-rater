import React, { Component } from 'react';
import carabiner from './carabiner.png';

class RateWithCarabiners extends Component {
  constructor(props) {
    super()
    this.state = {
      selectedOption: props.saveRating && props.saveRating.climberRating.toString()
    }
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  handleOptionChange(event) {
    this.setState({selectedOption: event.target.value})
  }

  render () {
  return (
    <div className="carabiners-container">
        <input name="carabiners" value="5" type="radio" id="rate5"  checked={this.state.selectedOption === '5'}
                      onChange={this.handleOptionChange}  />
      <label htmlFor="rate5"><img src={carabiner} alt="carabiner-icon"/></label>

      <input name="carabiners" value="4" type="radio" id="rate4"
      checked={this.state.selectedOption === '4'}
                      onChange={this.handleOptionChange} />
      <label htmlFor="rate4"><img src={carabiner} alt="carabiner-icon"/></label>

      <input name="carabiners" value="3" type="radio" id="rate3"
      checked={this.state.selectedOption === '3'}
                      onChange={this.handleOptionChange} />
      <label htmlFor="rate3"><img src={carabiner} alt="carabiner-icon"/></label>

      <input name="carabiners" value="2" type="radio" id="rate2"
      checked={this.state.selectedOption === '2'}
                      onChange={this.handleOptionChange} />
      <label htmlFor="rate2"><img src={carabiner} alt="carabiner-icon"/></label>

      <input name="carabiners" value="1" type="radio" id="rate1"
      checked={this.state.selectedOption === '1'}
                      onChange={this.handleOptionChange} />
      <label htmlFor="rate1"><img src={carabiner} alt="carabiner-icon"/></label>

    </div>
  )}
}

export default RateWithCarabiners;
