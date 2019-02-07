var register = document.getElementById('registerbtn');
var sign = document.getElementById('loginbtn');
const dashurl = "https://matthenge.github.io/Questioner/UI/userdashboard.html"

function signup(event) {
  event.preventDefault();
  let signdata = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      othername: document.getElementById('othername').value,
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phone').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      confirm_password: document.getElementById('confirm_password').value
};
  fetch("https://questioner-v2.herokuapp.com/api/v2/auth/signup", {
    mode:'cors',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(signdata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 201){
      window.setTimeout(function () {
        location.href = dashurl;
      }, 1000);
      localStorage.setItem('token', data.token);
      console.log(resp.status)
      console.log(resp.data)
    }else{
      snackBar(data.error);
    }
  })
  .catch((error) => console.error(error))
}

function login(event) {
  event.preventDefault();
  let logindata = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
};
  fetch("https://questioner-v2.herokuapp.com/api/v2/auth/login", {
    mode:'cors',
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(logindata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 200){
      window.setTimeout(function () {
        location.href = dashurl;
      }, 1000);
      localStorage.setItem('token', data.token);
      console.log(resp.status)
      console.log(resp.data)
    }else{
      snackBar(data.error);
    }
  })
  .catch((error) => console.error(error))
}

//Snackbar for errors
var snack = document.getElementById("snackbar");

function snackBar(content) {
  snack.innerText = content;
  snack.className = "show";
  setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);
}

documentTitle = document.querySelector('title').innerHTML;
if (documentTitle == "Sign Up"){
  register.addEventListener('click', signup);
} else if (documentTitle == "Sign In"){
  sign.addEventListener('click', login);
}
