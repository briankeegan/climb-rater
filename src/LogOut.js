const logOut = function(data, setUserState) {
  const user = data.user
   fetch(`https://climb-rater-api.herokuapp.com/sign-out/${user.id}`, {
    headers: new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Token token=${user.token}`
  }),
     method: 'DELETE'
  })
    .then(() =>  {
      setUserState(null)
    })
    .catch(error =>
      setUserState(null)
    )
}

export default logOut;
