// After importing, bind to the Class Component you want to use it on
const setErrorMessageState = function(message) {
  this.setState({
    errorMessage: message
  })
  setTimeout(() => {
    this.setState({
      errorMessage: ''
    })
  }
    , 1500)
}

export default setErrorMessageState
