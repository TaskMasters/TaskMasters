var username = document.getElementById('username');
var password = document.getElementById('password');
var creatUser = document.getElementById('button');

function createUser(e) {
  e.preventDefault();
  fetch('/API/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(token) {
      logIn(e);
      console.log(token);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function logIn(e) {
  e.preventDefault();
  fetch('/API/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
    .then(function(response) {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then(function(token) {
      if (token) {
        localStorage.setItem('myApp@token', token.token);
        window.location.replace('/boards');
        console.log(token);
      } else {
        console.log('Feil brukernavn eller passord');
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}
