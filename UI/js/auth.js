var register = document.getElementById('registerbtn');
var sign = document.getElementById('loginbtn');
var resetreq = document.getElementById('resetbtn');
var respass = document.getElementById('updatebtn')
const dashurl = "https://matthenge.github.io/Questioner/UI/userdashboard.html"
const loginurl = "https://matthenge.github.io/Questioner/UI/login.html"
const signurl = "https://questioner-v2.herokuapp.com/api/v2/auth/signup"
const logurl = "https://questioner-v2.herokuapp.com/api/v2/auth/login"
const resurl = "https://questioner-v2.herokuapp.com/api/v2/auth/reset_password"

//User Signup

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
  fetch(signurl, {
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

//User Login

function login(event) {
  event.preventDefault();
  let logindata = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
};
  fetch(logurl, {
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

//Reset Password Request
function resetRequest(event) {
  event.preventDefault();
  let resetReqdata = {
      email: document.getElementById('email').value
};
  fetch(resurl, {
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    },
    body: JSON.stringify(resetReqdata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 200){
      snackBar(data.message);
      console.log(resp.status)
      console.log(resp.data)
    }else{
      snackBar(data.error);
    }
  })
  .catch((error) => console.error(error))
}

//Change Password
function resetPswrd(event) {
  event.preventDefault();
  var url = window.location.href;
  var urlstr = url.split("&");
  var token = urlstr[0].split('=')[1];
  localStorage.setItem('token', token);
  let resetdata = {
    password: document.getElementById('password').value,
    confirm_password: document.getElementById('confirm_password').value
};
  fetch(resurl, {
    method:'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'x-reset-token': localStorage.token
    },
    body: JSON.stringify(resetdata)
  })
  .then((resp) => resp.json())
  .then((data) => {
    if (data.status === 200){
      window.setTimeout(function () {
        location.href = loginurl;
      }, 1000);
      snackBar(data.message);
      console.log(resp.status)
      console.log(resp.data)
    }else{
      snackBar(data.error);
    }
  })
  .catch((error) => console.error(error))
}

//Snackbar for messages
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
} else if (documentTitle == "Forgot Password"){
  resetreq.addEventListener('click', resetRequest);
} else if (documentTitle == "Reset Password"){
  respass.addEventListener('click', resetPswrd);
}
