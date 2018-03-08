const logOut = function(data, setUserState) {
  const user = data.user
   fetch(`http://localhost:4741/sign-out/${user.id}`, {
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
