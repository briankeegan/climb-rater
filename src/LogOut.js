import React from 'react'

const logOut = function(data, setUserState) {
  const user = data.user
   fetch(`https://climb-rater-api-development.herokuapp.com/sign-out/${user.id}`, {
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

const LogOut = ({ user, setUserState }) => (
  <a onClick={() => logOut(user, setUserState)}>Log Out</a>
)

export default LogOut;
